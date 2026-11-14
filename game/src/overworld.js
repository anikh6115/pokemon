// Overworld Engine for Pokémon Emerald Journeys
// Smooth Camera, Tile Rendering, Player Grid Movement, NPCs, Grass Encounters & Warps

import { TILE_TYPES, ZONES } from './mapData.js';
import { Sound } from './audio.js';
import { Sprites } from './sprites.js';

export class Overworld {
  constructor({ canvas, game, onEncounter, onInteractNpc, onWarpSpecial }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;
    this.onEncounter = onEncounter;
    this.onInteractNpc = onInteractNpc;
    this.onWarpSpecial = onWarpSpecial;

    this.tileSize = 32; // Screen pixels per tile
    this.currentZoneId = 'VERTEX_HAVEN';
    this.currentZone = ZONES[this.currentZoneId];

    // Player position (in tile coordinates)
    this.playerTile = { x: 10, y: 12 };
    this.playerPixel = { x: 10 * this.tileSize, y: 12 * this.tileSize };
    this.targetPixel = { x: 10 * this.tileSize, y: 12 * this.tileSize };
    this.facing = 'down'; // 'down', 'up', 'left', 'right'
    this.isMoving = false;
    this.moveSpeed = 4; // pixels per frame (8 if running)
    this.walkFrame = 0;
    this.walkTimer = 0;

    // Grass step encounter tracker
    this.stepsInGrass = 0;

    // Camera offset
    this.camera = { x: 0, y: 0 };
    this.partnerSpriteCache = new Map();
  }

  setZone(zoneId, targetX, targetY) {
    if (!ZONES[zoneId]) return;
    this.currentZoneId = zoneId;
    this.currentZone = ZONES[zoneId];
    this.playerTile = { x: targetX ?? this.currentZone.playerStart.x, y: targetY ?? this.currentZone.playerStart.y };
    this.playerPixel = { x: this.playerTile.x * this.tileSize, y: this.playerTile.y * this.tileSize };
    this.targetPixel = { ...this.playerPixel };
    this.isMoving = false;
    this.updateCamera();

    // Play appropriate background music
    if (this.currentZone.theme === 'city') Sound.playMusic('city');
    else if (this.currentZone.theme === 'stadium') Sound.playMusic('champion');
    else Sound.playMusic('route');

    // Auto-save on zone transition
    if (this.game && typeof this.game.saveGame === 'function') {
      this.game.saveGame('autosave', true);
    }
  }

  isPassable(x, y) {
    if (x < 0 || x >= this.currentZone.width || y < 0 || y >= this.currentZone.height) {
      return false;
    }
    const tile = this.currentZone.tiles[y][x];
    if (tile === TILE_TYPES.OBSTACLE_TREE ||
        tile === TILE_TYPES.OBSTACLE_WATER ||
        tile === TILE_TYPES.OBSTACLE_BUILDING ||
        tile === TILE_TYPES.COUNTER) {
      return false;
    }
    // Check if an NPC is occupying the tile
    const hasNpc = this.currentZone.npcs.some(npc => npc.x === x && npc.y === y);
    if (hasNpc) return false;

    return true;
  }

  movePlayer(direction, isRunning = false) {
    if (this.isMoving) return;

    this.facing = direction;
    let dx = 0;
    let dy = 0;

    if (direction === 'up') dy = -1;
    if (direction === 'down') dy = 1;
    if (direction === 'left') dx = -1;
    if (direction === 'right') dx = 1;

    const targetX = this.playerTile.x + dx;
    const targetY = this.playerTile.y + dy;

    // Check warps first
    const warp = this.currentZone.warps.find(w => w.x === targetX && w.y === targetY);
    if (warp) {
      if (warp.toZone) {
        Sound.playTone(330, 'triangle', 0.1, 0.2);
        this.setZone(warp.toZone, warp.toX, warp.toY);
        return;
      } else if (warp.isSpecial && this.onWarpSpecial) {
        this.onWarpSpecial(warp.isSpecial);
        return;
      }
    }

    // Door tiles without an explicitly scripted warp lead to their building
    // interior instead of behaving like a wall.
    if (this.currentZone.tiles[targetY]?.[targetX] === TILE_TYPES.DOOR_WARP && this.onWarpSpecial) {
      this.onWarpSpecial('building');
      return;
    }

    // Check passability
    if (!this.isPassable(targetX, targetY)) {
      Sound.playBump();
      return;
    }

    this.playerTile.x = targetX;
    this.playerTile.y = targetY;
    this.targetPixel = { x: targetX * this.tileSize, y: targetY * this.tileSize };
    this.isMoving = true;
    this.moveSpeed = (isRunning || this.game.isRunning) ? 8 : 4;
  }

  interact() {
    // Check tile directly in front of player
    let fx = this.playerTile.x;
    let fy = this.playerTile.y;
    if (this.facing === 'up') fy--;
    if (this.facing === 'down') fy++;
    if (this.facing === 'left') fx--;
    if (this.facing === 'right') fx++;

    // Check NPC interaction
    const npc = this.currentZone.npcs.find(n => n.x === fx && n.y === fy);
    if (npc) {
      Sound.playSelect();
      if (this.onInteractNpc) {
        this.onInteractNpc(npc);
      }
      return true;
    }

    // Check special warps / shrines directly on or in front
    const shrineWarp = this.currentZone.warps.find(w => (w.x === fx && w.y === fy) || (w.x === this.playerTile.x && w.y === this.playerTile.y));
    if (shrineWarp && shrineWarp.isSpecial && this.onWarpSpecial) {
      Sound.playSelect();
      this.onWarpSpecial(shrineWarp.isSpecial);
      return true;
    }

    return false;
  }

  update(delta = 1) {
    if (this.isMoving) {
      const dx = this.targetPixel.x - this.playerPixel.x;
      const dy = this.targetPixel.y - this.playerPixel.y;
      const speed = this.moveSpeed * delta;

      if (Math.abs(dx) <= speed && Math.abs(dy) <= speed) {
        this.playerPixel.x = this.targetPixel.x;
        this.playerPixel.y = this.targetPixel.y;
        this.isMoving = false;
        this.onStepComplete();
      } else {
        if (dx > 0) this.playerPixel.x += speed;
        if (dx < 0) this.playerPixel.x -= speed;
        if (dy > 0) this.playerPixel.y += speed;
        if (dy < 0) this.playerPixel.y -= speed;

        this.walkTimer += delta;
        if (this.walkTimer > 6) {
          this.walkFrame = (this.walkFrame + 1) % 4;
          this.walkTimer = 0;
        }
      }
    } else {
      this.walkFrame = 0;
    }

    this.updateCamera();
  }

  onStepComplete() {
    const tileType = this.currentZone.tiles[this.playerTile.y][this.playerTile.x];
    if (tileType === TILE_TYPES.TALL_GRASS) {
      this.stepsInGrass++;
      // Check wild encounter (18% chance after first step)
      if (this.stepsInGrass > 1 && Math.random() < 0.20) {
        this.stepsInGrass = 0;
        if (this.onEncounter) {
          this.onEncounter(this.currentZone.wildEncounters);
        }
      }
    } else {
      this.stepsInGrass = 0;
    }
  }

  updateCamera() {
    const halfWidth = this.canvas.width / 2;
    const halfHeight = this.canvas.height / 2;
    this.camera.x = Math.max(0, Math.min(this.currentZone.width * this.tileSize - this.canvas.width, this.playerPixel.x + this.tileSize / 2 - halfWidth));
    this.camera.y = Math.max(0, Math.min(this.currentZone.height * this.tileSize - this.canvas.height, this.playerPixel.y + this.tileSize / 2 - halfHeight));
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));

    // A single world-sized surface prevents the route from reading as a grid
    // of separate square tiles. Individual tiles now add texture and objects.
    this.renderLandscapeBase(ctx);

    // Render tiles
    for (let y = 0; y < this.currentZone.height; y++) {
      for (let x = 0; x < this.currentZone.width; x++) {
        const tile = this.currentZone.tiles[y][x];
        this.renderTile(ctx, tile, x, y);
      }
    }
    this.renderBuildings(ctx);

    // Render NPCs
    for (const npc of this.currentZone.npcs) {
      this.renderNpc(ctx, npc);
    }

    // A small partner makes the overworld feel alive, like the reference's
    // following Tepig. It follows half a step behind the trainer.
    this.renderPartner(ctx);

    // Render Player
    this.renderPlayer(ctx);

    ctx.restore();
  }

  renderLandscapeBase(ctx) {
    const width = this.currentZone.width * this.tileSize;
    const height = this.currentZone.height * this.tileSize;
    let skyward = '#f1db9f'; let earthward = '#b9864f';
    if (this.currentZone.theme === 'fire') { skyward = '#e6ae7b'; earthward = '#a45a3b'; }
    else if (this.currentZone.theme === 'ghost') { skyward = '#655777'; earthward = '#342b49'; }
    else if (this.currentZone.theme === 'ice') { skyward = '#f2fbff'; earthward = '#b9ddea'; }
    else if (this.currentZone.theme === 'dragon') { skyward = '#7a6e91'; earthward = '#443c5b'; }
    else if (this.currentZone.theme === 'stadium') { skyward = '#6d8290'; earthward = '#324554'; }
    const landscape = ctx.createLinearGradient(0, 0, 0, height);
    landscape.addColorStop(0, skyward); landscape.addColorStop(1, earthward);
    ctx.fillStyle = landscape;
    ctx.fillRect(0, 0, width, height);
    // Soft mottling removes the flat tiled-map appearance without affecting collision.
    ctx.fillStyle = 'rgba(255,255,230,.10)';
    for (let y = 14; y < height; y += 47) {
      for (let x = (y % 3) * 11; x < width; x += 71) {
        ctx.beginPath(); ctx.ellipse(x, y, 20, 7, -.35, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  renderTile(ctx, tile, x, y) {
    const px = x * this.tileSize;
    const py = y * this.tileSize;
    const size = this.tileSize;

    switch (tile) {
      case TILE_TYPES.WALKABLE: // Path / Ground
        let groundTop = '#f0d79b'; let groundBottom = '#c59459';
        if (this.currentZone.theme === 'fire') { groundTop = '#dfa476'; groundBottom = '#a35b3e'; }
        else if (this.currentZone.theme === 'ghost') { groundTop = '#635471'; groundBottom = '#302941'; }
        else if (this.currentZone.theme === 'ice') { groundTop = '#f4fcff'; groundBottom = '#b8deec'; }
        else if (this.currentZone.theme === 'dragon') { groundTop = '#7a6f8c'; groundBottom = '#403a58'; }
        else if (this.currentZone.theme === 'stadium') { groundTop = '#637887'; groundBottom = '#2c3c4d'; }
        const ground = ctx.createLinearGradient(0, 0, 0, this.currentZone.height * size);
        ground.addColorStop(0, groundTop); ground.addColorStop(1, groundBottom);
        // Rounded clay road, with feathered edges rather than visible square cells.
        ctx.fillStyle = ground;
        ctx.fillRect(px - 2, py - 2, size + 4, size + 4);
        ctx.fillStyle = 'rgba(255,238,210,.20)'; ctx.fillRect(px + 2, py + 2, size - 4, 2);
        ctx.fillStyle = 'rgba(122,75,51,.15)';
        ctx.beginPath(); ctx.arc(px + 9, py + 13, 2, 0, Math.PI * 2); ctx.arc(px + 24, py + 23, 2, 0, Math.PI * 2); ctx.fill();
        break;

      case TILE_TYPES.TALL_GRASS: // Emerald Tall Grass
        const grass = ctx.createLinearGradient(0, 0, 0, this.currentZone.height * size);
        grass.addColorStop(0, '#8bd25a'); grass.addColorStop(1, '#317a35');
        ctx.fillStyle = grass;
        ctx.fillRect(px, py + 8, size, size - 8);
        // Layered blades and dark roots give tall grass its depth.
        ctx.fillStyle = '#245f31';
        for (let blade = 0; blade < 4; blade++) ctx.fillRect(px + 3 + blade * 8, py + 12 - (blade % 2) * 4, 4, 18);
        ctx.fillStyle = '#b4ef70';
        ctx.fillRect(px + 6, py + 4, 3, 14); ctx.fillRect(px + 17, py + 2, 3, 17); ctx.fillRect(px + 26, py + 7, 3, 12);
        ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(px, py + 28, size, 4);
        break;

      case TILE_TYPES.OBSTACLE_TREE: // GBA Pine Tree
        ctx.fillStyle = '#5b4227'; ctx.fillRect(px + 13, py + 17, 7, 15);
        ctx.fillStyle = '#352617'; ctx.fillRect(px + 18, py + 18, 3, 14);
        ctx.fillStyle = 'rgba(0,0,0,.27)'; ctx.beginPath(); ctx.ellipse(px + 17, py + 28, 15, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#174d2c'; ctx.beginPath(); ctx.arc(px + 17, py + 13, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#287844'; ctx.beginPath(); ctx.arc(px + 13, py + 11, 13, 0, Math.PI * 2); ctx.fill(); ctx.arc(px + 22, py + 15, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#69b755'; ctx.beginPath(); ctx.arc(px + 10, py + 7, 7, 0, Math.PI * 2); ctx.fill(); ctx.arc(px + 19, py + 10, 6, 0, Math.PI * 2); ctx.fill();
        break;

      case TILE_TYPES.OBSTACLE_WATER: // Shimmering Ocean / Water
        const water = ctx.createLinearGradient(px, py, px, py + size);
        water.addColorStop(0, '#72c7ed'); water.addColorStop(1, '#2364b5');
        ctx.fillStyle = water;
        ctx.fillRect(px, py, size, size);
        ctx.fillStyle = 'rgba(255,255,255,.62)';
        ctx.fillRect(px + 3, py + 7, 13, 2); ctx.fillRect(px + 17, py + 19, 11, 2); ctx.fillRect(px + 6, py + 28, 8, 1);
        break;

      case TILE_TYPES.OBSTACLE_BUILDING: // Building Wall
      case TILE_TYPES.DOOR_WARP: // Doorway
        // Drawn as a connected structure in renderBuildings().
        break;

      case TILE_TYPES.LEGENDARY_SHRINE: // Glowing Portal / Shrine
        ctx.fillStyle = '#7038F8';
        ctx.fillRect(px, py, size, size);
        ctx.fillStyle = '#F8D030';
        ctx.beginPath();
        ctx.arc(px + size / 2, py + size / 2, size / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(px + size / 2, py + size / 2, 4, 0, Math.PI * 2);
        ctx.fill();
        break;

      case TILE_TYPES.FLOWER: // Decorative Garden Flowers
        ctx.fillStyle = '#78C850';
        ctx.fillRect(px, py, size, size);
        ctx.fillStyle = '#FF5588';
        ctx.beginPath();
        ctx.arc(px + 10, py + 12, 4, 0, Math.PI * 2);
        ctx.arc(px + 22, py + 20, 4, 0, Math.PI * 2);
        ctx.fill();
        break;

      case TILE_TYPES.ICE_SNOW: // Frost Cavern Ice
        ctx.fillStyle = '#D8EEF8';
        ctx.fillRect(px, py, size, size);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(px + 6, py + 6, 8, 4);
        ctx.fillRect(px + 18, py + 18, 6, 4);
        break;

      default:
        ctx.fillStyle = '#808080';
        ctx.fillRect(px, py, size, size);
    }
  }

  isPokemonCenterTile(x, y) {
    return this.currentZone.npcs.some(npc => npc.isNurse && Math.abs(npc.x - x) <= 3 && Math.abs(npc.y - y) <= 3);
  }

  renderBuildings(ctx) {
    const seen = new Set();
    const belongsToBuilding = (x, y) => {
      const tile = this.currentZone.tiles[y]?.[x];
      return tile === TILE_TYPES.OBSTACLE_BUILDING || tile === TILE_TYPES.DOOR_WARP;
    };
    for (let startY = 0; startY < this.currentZone.height; startY++) {
      for (let startX = 0; startX < this.currentZone.width; startX++) {
        const start = `${startX},${startY}`;
        if (seen.has(start) || !belongsToBuilding(startX, startY)) continue;
        const queue = [[startX, startY]];
        const cells = [];
        seen.add(start);
        while (queue.length) {
          const [x, y] = queue.shift();
          cells.push([x, y]);
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = x + dx; const ny = y + dy; const id = `${nx},${ny}`;
            if (!seen.has(id) && belongsToBuilding(nx, ny)) { seen.add(id); queue.push([nx, ny]); }
          }
        }
        const xs = cells.map(([x]) => x); const ys = cells.map(([, y]) => y);
        this.renderCompleteBuilding(ctx, Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys), cells);
      }
    }
  }

  renderCompleteBuilding(ctx, minX, minY, maxX, maxY, cells) {
    const style = this.buildingStyle(minX, minY);
    const t = this.tileSize;
    const x = minX * t; const y = minY * t;
    const width = (maxX - minX + 1) * t; const height = (maxY - minY + 1) * t;
    const roofY = y + Math.max(16, height * .36);
    const door = cells.find(([cx, cy]) => this.currentZone.tiles[cy][cx] === TILE_TYPES.DOOR_WARP);
    const doorX = door ? door[0] * t + t / 2 : x + width / 2;
    ctx.fillStyle = 'rgba(23,27,38,.28)'; ctx.beginPath(); ctx.ellipse(x + width / 2 + 5, y + height, width * .54, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = style.roof; ctx.beginPath(); ctx.moveTo(x - 7, roofY); ctx.lineTo(x + width / 2, y - Math.min(24, height * .28)); ctx.lineTo(x + width + 7, roofY); ctx.lineTo(x + width - 2, roofY + 8); ctx.lineTo(x + 2, roofY + 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = style.roofLight; ctx.beginPath(); ctx.moveTo(x + 3, roofY - 2); ctx.lineTo(x + width / 2, y - Math.min(18, height * .22)); ctx.lineTo(x + width / 2, roofY + 3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = style.trim; ctx.fillRect(x + 3, roofY, width - 6, y + height - roofY);
    ctx.fillStyle = style.wall; ctx.fillRect(x + 7, roofY + 4, width - 14, y + height - roofY - 4);
    ctx.fillStyle = style.center ? 'rgba(19,122,186,.15)' : 'rgba(91,65,48,.14)';
    for (let line = roofY + 10; line < y + height - 4; line += 7) ctx.fillRect(x + 8, line, width - 16, 1);
    if (style.center) {
      ctx.fillStyle = '#c7f7ff'; ctx.fillRect(x + 10, roofY + 8, width - 20, 10);
      ctx.fillStyle = '#fff'; ctx.fillRect(x + width * .34, roofY + 11, width * .32, 2);
      ctx.fillStyle = '#f14d58'; ctx.beginPath(); ctx.arc(x + width / 2, roofY + 22, 5, 0, Math.PI * 2); ctx.fill();
    } else {
      const windowWidth = Math.max(7, Math.min(14, width * .17));
      ctx.fillStyle = '#493838'; ctx.fillRect(x + 12, roofY + 10, windowWidth, 11); ctx.fillRect(x + width - windowWidth - 12, roofY + 10, windowWidth, 11);
      ctx.fillStyle = style.window; ctx.fillRect(x + 14, roofY + 12, windowWidth - 4, 7); ctx.fillRect(x + width - windowWidth - 10, roofY + 12, windowWidth - 4, 7);
    }
    ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.fillRect(doorX - 11, y + height - 3, 22, 5);
    ctx.fillStyle = style.center ? '#155f94' : '#5b382d'; ctx.fillRect(doorX - 9, y + height - 25, 18, 23);
    ctx.fillStyle = style.center ? '#bdf6ff' : style.roofLight; ctx.fillRect(doorX - 7, y + height - 23, 14, 15);
    ctx.fillStyle = '#f5d55b'; ctx.fillRect(doorX + 4, y + height - 12, 2, 2);
  }

  buildingStyle(x, y) {
    const center = this.isPokemonCenterTile(x, y);
    if (center) return { center: true, roof: '#167ac4', roofLight: '#5bd6f7', wall: '#e9f8ff', trim: '#287bb5', window: '#65e9ff' };
    const styles = [
      { roof: '#2c68ba', roofLight: '#548fe0', wall: '#ead8bf', trim: '#81554a', window: '#f4a059' },
      { roof: '#b74a42', roofLight: '#e1725c', wall: '#f2e5cd', trim: '#754c3d', window: '#ffd46f' },
      { roof: '#578650', roofLight: '#87bb6d', wall: '#d9e1c2', trim: '#5f7043', window: '#ffda76' },
      { roof: '#765c9c', roofLight: '#a683c9', wall: '#e4d7df', trim: '#654e6b', window: '#f4a6d4' }
    ];
    return styles[Math.abs((x * 17 + y * 13) % styles.length)];
  }

  renderBuildingModule(ctx, px, py, x, y) {
    const size = this.tileSize;
    const style = this.buildingStyle(x, y);
    // Each building receives its own palette, while Centers have sleek glass/metal details.
        ctx.fillStyle = 'rgba(30,20,20,.28)'; ctx.fillRect(px + 2, py + 28, size, 6);
    ctx.fillStyle = style.roof; ctx.beginPath(); ctx.moveTo(px - 3, py + 16); ctx.lineTo(px + 16, py - 3); ctx.lineTo(px + 35, py + 16); ctx.closePath(); ctx.fill();
    ctx.fillStyle = style.roofLight; ctx.beginPath(); ctx.moveTo(px + 2, py + 15); ctx.lineTo(px + 16, py + 1); ctx.lineTo(px + 30, py + 15); ctx.closePath(); ctx.fill();
    ctx.fillStyle = style.trim; ctx.fillRect(px + 3, py + 16, 26, 14);
    ctx.fillStyle = style.wall; ctx.fillRect(px + 5, py + 18, 22, 10);
    if (style.center) {
      ctx.fillStyle = '#c7f7ff'; ctx.fillRect(px + 8, py + 19, 16, 7);
      ctx.fillStyle = '#fff'; ctx.fillRect(px + 11, py + 20, 10, 2);
      ctx.fillStyle = style.trim; ctx.fillRect(px + 6, py + 17, 20, 2);
    } else {
      ctx.fillStyle = style.trim; ctx.fillRect(px + 4, py + 17, 3, 13); ctx.fillRect(px + 25, py + 17, 3, 13);
      ctx.fillStyle = style.window; ctx.fillRect(px + 16, py + 20, 7, 6);
      ctx.fillStyle = 'rgba(255,247,185,.7)'; ctx.fillRect(px + 17, py + 20, 5, 2);
    }
  }

  renderDoorModule(ctx, px, py, x, y) {
    const style = this.buildingStyle(x, y);
    ctx.fillStyle = 'rgba(0,0,0,.30)'; ctx.fillRect(px + 5, py + 28, 22, 5);
    if (style.center) {
      ctx.fillStyle = '#12649d'; ctx.fillRect(px + 5, py + 4, 22, 25);
      ctx.fillStyle = '#bdf6ff'; ctx.fillRect(px + 7, py + 6, 18, 16);
      ctx.fillStyle = '#fff'; ctx.fillRect(px + 10, py + 9, 12, 3);
      ctx.fillStyle = '#f04c54'; ctx.beginPath(); ctx.arc(px + 16, py + 16, 4, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#5c352a'; ctx.fillRect(px + 7, py + 5, 18, 25);
      ctx.fillStyle = style.roofLight; ctx.fillRect(px + 9, py + 7, 14, 21);
      ctx.fillStyle = '#f4c54d'; ctx.fillRect(px + 20, py + 17, 2, 2);
    }
  }

  renderNpc(ctx, npc) {
    const px = npc.x * this.tileSize;
    const py = npc.y * this.tileSize;

    // A compact but layered DS-style human sprite: shadow, hair, face and outfit.
    ctx.fillStyle = 'rgba(30,25,35,.27)'; ctx.beginPath(); ctx.ellipse(px + 16, py + 29, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = npc.isNurse ? '#d56a91' : (npc.isWcsTrainer ? '#4c3b35' : '#855e45');
    ctx.beginPath(); ctx.arc(px + 16, py + 10, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f3bf91'; ctx.beginPath(); ctx.arc(px + 16, py + 12, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#24202b'; ctx.fillRect(px + 12, py + 12, 2, 2); ctx.fillRect(px + 18, py + 12, 2, 2);
    ctx.fillStyle = npc.isNurse ? '#f7f4ed' : (npc.isWcsTrainer ? '#e05d43' : '#4c86c8');
    ctx.fillRect(px + 9, py + 18, 14, 10);
    ctx.fillStyle = 'rgba(255,255,255,.30)'; ctx.fillRect(px + 11, py + 19, 4, 7);
    ctx.fillStyle = '#383946'; ctx.fillRect(px + 10, py + 28, 5, 3); ctx.fillRect(px + 18, py + 28, 5, 3);

    // Indicator ! for WCS Trainers
    if (npc.isWcsTrainer) {
      ctx.fillStyle = '#FFDD00';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('!', px + 12, py - 4);
    }
  }

  renderPartner(ctx) {
    const partner = this.game?.player?.party?.[0];
    if (!partner) return;
    const direction = this.facing;
    const offset = direction === 'up' ? { x: 0, y: 18 } : direction === 'down' ? { x: 0, y: -18 } : direction === 'left' ? { x: 18, y: 0 } : { x: -18, y: 0 };
    const px = Math.floor(this.playerPixel.x + offset.x + 6);
    const py = Math.floor(this.playerPixel.y + offset.y + 12);

    const sprite = this.getPartnerSprite(partner);
    if (sprite?.complete && sprite.naturalWidth) {
      ctx.fillStyle = 'rgba(25,25,25,.28)';
      ctx.beginPath(); ctx.ellipse(px + 12, py + 18, 11, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(sprite, px - 2, py - 5, 28, 28);
      return;
    }

    if (partner.speciesKey === 'charmander') {
      this.renderCharmander(ctx, px, py);
      return;
    }

    const type = partner.types?.[0] || 'Normal';
    const colors = { Fire: '#e76f42', Water: '#4e91d8', Grass: '#72b75d', Electric: '#f0c84e', Normal: '#a98670', Psychic: '#d9668b', Dark: '#5d5b73' };
    ctx.fillStyle = 'rgba(25,25,25,.28)'; ctx.beginPath(); ctx.ellipse(px + 10, py + 14, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = colors[type] || '#a98670'; ctx.beginPath(); ctx.ellipse(px + 10, py + 8, 9, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff3db'; ctx.beginPath(); ctx.ellipse(px + 10, py + 11, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#25202a'; ctx.fillRect(px + 6, py + 7, 2, 2); ctx.fillRect(px + 13, py + 7, 2, 2);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(px + 7, py + 4, 2, 0, Math.PI * 2); ctx.fill();
  }

  renderCharmander(ctx, px, py) {
    // A recognizable miniature Charmander while remote artwork is loading:
    // long tail with flame, distinct head/snout, cream belly and feet.
    ctx.fillStyle = 'rgba(25,25,25,.28)'; ctx.beginPath(); ctx.ellipse(px + 11, py + 18, 12, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#e66d35'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px + 7, py + 13); ctx.quadraticCurveTo(px - 2, py + 16, px - 1, py + 7); ctx.stroke();
    ctx.fillStyle = '#f5b832'; ctx.beginPath(); ctx.moveTo(px - 2, py + 8); ctx.quadraticCurveTo(px - 6, py + 2, px, py + 3); ctx.quadraticCurveTo(px + 3, py + 6, px - 2, py + 8); ctx.fill();
    ctx.fillStyle = '#fff0a5'; ctx.beginPath(); ctx.moveTo(px - 2, py + 7); ctx.quadraticCurveTo(px - 3, py + 4, px, py + 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ed7c3a'; ctx.beginPath(); ctx.ellipse(px + 12, py + 8, 7, 7, -.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 13, py + 14, 7, 6, .2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f7d9a1'; ctx.beginPath(); ctx.ellipse(px + 17, py + 10, 4, 3, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 15, py + 15, 4, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#20202a'; ctx.fillRect(px + 13, py + 6, 2, 2); ctx.fillRect(px + 19, py + 10, 1, 1);
    ctx.fillStyle = '#fff'; ctx.fillRect(px + 13, py + 6, 1, 1);
    ctx.fillStyle = '#ed7c3a'; ctx.fillRect(px + 8, py + 17, 4, 3); ctx.fillRect(px + 16, py + 18, 4, 3);
    ctx.fillStyle = '#f7d9a1'; ctx.fillRect(px + 8, py + 19, 4, 1); ctx.fillRect(px + 16, py + 20, 4, 1);
  }

  getPartnerSprite(pokemon) {
    const key = `${pokemon.speciesKey}-${pokemon.isMega ? 'mega' : 'base'}`;
    if (this.partnerSpriteCache.has(key)) return this.partnerSpriteCache.get(key);
    const image = new Image();
    // Do not request CORS mode here: this canvas is only displayed (never
    // exported), and CORS mode made Showdown's anime GIF reject the request.
    // A normal image request lets the genuine Pokémon art render in-game.
    image.src = Sprites.getPokemonSpriteUrl(pokemon, false);
    image.onerror = () => {
      image.onerror = null;
      image.src = Sprites.getStaticBackupSpriteUrl(pokemon, false);
    };
    this.partnerSpriteCache.set(key, image);
    return image;
  }

  renderPlayer(ctx) {
    const px = Math.floor(this.playerPixel.x);
    const py = Math.floor(this.playerPixel.y);
    const stride = this.isMoving ? (this.walkFrame % 2 === 0 ? -1 : 1) : 0;
    const isGirl = this.game?.player?.gender === 'female';

    // Defined, shaded Ash-inspired trainer sprite: cap, jacket, gloves and backpack.
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(px + 7, py + 30, 19, 3);
    ctx.fillStyle = '#d92e25'; ctx.fillRect(px + 8, py + 3, 16, 8);
    ctx.fillStyle = '#a91f20'; ctx.fillRect(px + 8, py + 9, 16, 3);
    ctx.fillStyle = '#f4f1e3'; ctx.fillRect(px + 5, py + 10, 22, 3);
    ctx.fillStyle = '#202b53'; ctx.fillRect(px + 13, py + 4, 6, 4); // cap emblem
    ctx.fillStyle = '#f3bf91'; ctx.fillRect(px + 9, py + 13, 14, 8);
    ctx.fillStyle = '#d99b76'; ctx.fillRect(px + 9, py + 19, 14, 2); // jaw shadow
    ctx.fillStyle = '#3b2922'; ctx.fillRect(px + 9, py + 13, 3, 2); ctx.fillRect(px + 20, py + 13, 3, 2); // hair under cap
    ctx.fillStyle = '#202020';
    if (this.facing === 'down') { ctx.fillRect(px + 11, py + 16, 2, 2); ctx.fillRect(px + 20, py + 16, 2, 2); }
    if (this.facing === 'left') ctx.fillRect(px + 9, py + 16, 2, 2);
    if (this.facing === 'right') ctx.fillRect(px + 21, py + 16, 2, 2);
    // backpack gives depth from the rear and side views
    if (this.facing !== 'down') { ctx.fillStyle = '#d87827'; ctx.fillRect(px + (this.facing === 'left' ? 20 : 6), py + 21, 5, 8); }
    ctx.fillStyle = isGirl ? '#d84e75' : '#2a5ca9'; ctx.fillRect(px + 8, py + 21, 16, 8);
    ctx.fillStyle = 'rgba(255,255,255,.32)'; ctx.fillRect(px + 10, py + 22, 4, 5); // jacket highlight
    ctx.fillStyle = isGirl ? '#a8325b' : '#1d3f7d'; ctx.fillRect(px + 8, py + 27, 16, 3);
    ctx.fillStyle = '#f5d54d'; ctx.fillRect(px + 15, py + 22, 2, 7); // zipper
    ctx.fillStyle = '#f3bf91'; ctx.fillRect(px + 5, py + 23 + stride, 3, 5); ctx.fillRect(px + 24, py + 23 - stride, 3, 5);
    ctx.fillStyle = '#34373d'; ctx.fillRect(px + 9, py + 29 + stride, 6, 3); ctx.fillRect(px + 18, py + 29 - stride, 6, 3);
    ctx.fillStyle = '#e8e8df'; ctx.fillRect(px + 8, py + 31 + stride, 7, 2); ctx.fillRect(px + 18, py + 31 - stride, 7, 2);
  }
}
