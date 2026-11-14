// Main Game Engine & Controller for Pokémon Emerald Journeys
// Coordinates State Transitions, Starter Selection, Overworld, Battle, WCS Storyline & Menus

import { Overworld } from './overworld.js';
import { Battle } from './battle.js';
import { STARTER_OPTIONS, createPokemon, POKEMON_SPECIES, calculateStats } from './pokemonData.js';
import { WCS_OPPONENTS, WCS_TIERS, getTierForRank } from './wcsData.js';
import { LEGENDARY_EVENTS, getAvailableEvents } from './events.js';
import { NEAREST_POKECENTER, ZONES } from './mapData.js';
import { Sprites } from './sprites.js';
import { Sound } from './audio.js';
import { AnimeVfx } from './animeVfx.js';

export const GAME_STATES = {
  STARTER_SELECT: 'STARTER_SELECT',
  OVERWORLD: 'OVERWORLD',
  BATTLE: 'BATTLE',
  DIALOGUE: 'DIALOGUE',
  MENU: 'MENU',
  WCS_BOARD: 'WCS_BOARD',
  LEGENDARY_PORTAL: 'LEGENDARY_PORTAL'
};

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.state = GAME_STATES.STARTER_SELECT;
    this.speedMultiplier = 1;
    this.isRunning = false;
    this.heldDirection = null;

    // Player Data
    this.player = {
      name: 'Ash',
      gender: 'male',
      rank: 10000,
      money: 3000,
      party: [],
      box: [],
      bag: {
        pokeball: 15,
        greatball: 8,
        ultraball: 5,
        masterball: 2,
        potion: 10,
        superpotion: 6,
        fullrestore: 3,
        revive: 5
      },
      keyItems: {
        megaBracelet: false,
        zRing: false,
        dynamaxBand: false
      },
      completedWcsBattles: [],
      completedEvents: []
    };

    // Sub-systems
    this.overworld = null;
    this.battle = null;
    this.dialogueQueue = [];
    this.currentDialogue = null;
    this.dialogueCallback = null;

    // Save & Playtime Tracking
    this.playTimeSeconds = 0;
    this.activeSaveSlot = 'slot1';
    this.playTimeInterval = setInterval(() => {
      this.playTimeSeconds++;
    }, 1000);

    // Initialize systems
    this.initOverworld();
    this.bindInputs();
    this.loadFromStorage();
    AnimeVfx.init('vfxCanvas');

    // Start game loop
    this.lastTime = performance.now();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  initOverworld() {
    this.overworld = new Overworld({
      canvas: this.canvas,
      game: this,
      onEncounter: (encounters) => this.triggerWildEncounter(encounters),
      onInteractNpc: (npc) => this.handleNpcInteraction(npc),
      onWarpSpecial: (specialId) => this.handleSpecialWarp(specialId)
    });
  }

  // === STARTER SELECTION (From All Gens 1 to 9) ===
  selectStarter(speciesId) {
    const starterPokemon = createPokemon(speciesId, 5);
    this.player.party = [starterPokemon];
    Sound.playCatchSuccess();
    this.showDialogue([
      `Prof. Sakuragi: Excellent choice! ${starterPokemon.name} is now your lifelong partner!`,
      `Here is your Rotom Phone and WCS Trainer Card. Your starting rank is #10,000 in the Normal Class.`,
      `Defeat challengers across the Astraea region to climb through Great Class, Ultra Class, and into the Masters Eight!`,
      `The world is watching. Go make history!`
    ], () => {
      this.state = GAME_STATES.OVERWORLD;
      this.saveToStorage();
    });
  }

  // === ENCOUNTERS & BATTLES ===
  triggerWildEncounter(encounterTable) {
    if (!encounterTable || encounterTable.length === 0) return;

    // Roll random encounter
    const roll = Math.random() * 100;
    let accum = 0;
    let chosen = encounterTable[0];
    for (const enc of encounterTable) {
      accum += enc.weight;
      if (roll <= accum) {
        chosen = enc;
        break;
      }
    }

    const level = Math.floor(Math.random() * (chosen.maxLvl - chosen.minLvl + 1)) + chosen.minLvl;
    const wildPokemon = createPokemon(chosen.species, level);

    Sound.playMusic('battle');
    this.startBattle({
      opponentTeam: [wildPokemon],
      isTrainer: false,
      trainerName: `Wild ${wildPokemon.name}`
    });
  }

  startWcsBattle(wcsOpponent) {
    Sound.playMusic('battle');
    const team = wcsOpponent.team.map(member => {
      const p = createPokemon(member.species, member.level);
      if (member.megaEvolve) p.megaEvolve = true;
      if (member.canGmax) p.canGmax = true;
      if (member.hasZMove) p.hasZMove = true;
      return p;
    });

    this.showDialogue([
      `${wcsOpponent.name}: "${wcsOpponent.dialogue}"`,
      `Rotom Drone: "World Coronation Series Official Match! Battle begin!"`
    ], () => {
      this.startBattle({
        opponentTeam: team,
        isTrainer: true,
        trainerName: wcsOpponent.name,
        isWcs: true,
        wcsData: wcsOpponent
      });
    });
  }

  startBattle({ opponentTeam, isTrainer, trainerName, isWcs = false, wcsData = null, isLegendaryEvent = false, eventData = null }) {
    // A successful capture leaves the target sprite hidden until this cleanup.
    // Remove transient animation classes before the next opponent is displayed.
    document.getElementById('opp-sprite')?.classList.remove('capture-into-ball', 'capture-breakout');
    this.state = GAME_STATES.BATTLE;
    this.battle = new Battle({
      playerTeam: this.player.party,
      playerBox: this.player.box || (this.player.box = []),
      opponentTeam: opponentTeam,
      isTrainer: isTrainer,
      trainerName: trainerName,
      isWcs: isWcs,
      wcsData: wcsData,
      isLegendaryEvent: isLegendaryEvent,
      eventData: eventData,
      onBattleEnd: (result) => this.handleBattleEnd(result),
      logCallback: (msg) => this.showBattleLog(msg),
      uiCallback: () => this.renderBattleState()
    });
    this.updateBattleUI();
    this.openBattleLeadSelector();
  }

  handleBattleEnd(result) {
    if (result.outcome === 'win') {
      const expLines = result.battle.getExpSummaryLines();
      if (result.battle.isWcs && result.battle.wcsData) {
        const opp = result.battle.wcsData;
        const oldRank = this.player.rank;
        this.player.rank = Math.max(1, this.player.rank - opp.rankReward);
        if (opp.isChampion) this.player.rank = 1;

        if (!this.player.completedWcsBattles.includes(opp.id)) {
          this.player.completedWcsBattles.push(opp.id);
        }

        // Unlocks
        if (opp.unlocksMega) {
          this.player.keyItems.megaBracelet = true;
          this.showDialogue([...expLines,
            `Rotom Drone: "Match registered! ${opp.victoryDialogue}"`,
            `Congratulations! Your rank skyrocketed from #${oldRank} to #${this.player.rank}!`,
            `You received the MEGA BRACELET! Mega Evolution is now unlocked in all battles!`
          ]);
        } else if (opp.unlocksDynamax) {
          this.player.keyItems.dynamaxBand = true;
          this.showDialogue([...expLines,
            `Rotom Drone: "Match registered! ${opp.victoryDialogue}"`,
            `Congratulations! Your rank climbed to #${this.player.rank}!`,
            `You received the DYNAMAX BAND! You can now Dynamax and Gigantamax your Pokémon!`
          ]);
        } else if (opp.unlocksZRing) {
          this.player.keyItems.zRing = true;
          this.showDialogue([...expLines,
            `Rotom Drone: "Match registered! ${opp.victoryDialogue}"`,
            `Congratulations! Your rank climbed to #${this.player.rank}!`,
            `You received the Z-RING and Z-CRYSTALS! Z-Moves are now unleashed!`
          ]);
        } else if (opp.isChampion) {
          this.showDialogue([...expLines,
            `Monarch Leon: "${opp.victoryDialogue}"`,
            `*** CONGRATULATIONS! YOU ARE THE WORLD MONARCH - RANK #1! ***`,
            `The multiverse portal has opened at the Apex Spire! Special legendary catch events for Arceus, Koraidon, Miraidon and more are now fully accessible!`
          ]);
        } else {
          this.showDialogue([...expLines,
            `Rotom Drone: "Match registered! ${opp.victoryDialogue}"`,
            `Your rank climbed from #${oldRank} to #${this.player.rank}!`
          ]);
        }
      } else if (result.battle.isLegendaryEvent && result.battle.eventData) {
        const ev = result.battle.eventData;
        if (!this.player.completedEvents.includes(ev.id)) {
          this.player.completedEvents.push(ev.id);
        }
        this.showDialogue([...expLines,
          `The legendary presence acknowledged your supremacy!`,
          `You earned the legendary blessing and ${ev.rewardItem}!`
        ]);
      } else {
        // Wild victories previously returned to the map immediately; keep the
        // result on screen so the awarded EXP is never missed.
        this.showDialogue(expLines.length ? expLines : ['You won the battle!']);
      }
    } else if (result.outcome === 'loss') {
      this.handleBlackoutAndRespawn();
      return;
    }

    this.finishBattleToOverworld();
  }

  finishBattleToOverworld() {
    // Do not overwrite a reward dialogue state. Its callback returns safely to the map.
    const returnToMap = () => {
      this.battle = null;
      this.state = GAME_STATES.OVERWORLD;
      this.updateBattleUI();
      this.saveToStorage();
      if (this.overworld.currentZone.theme === 'city') Sound.playMusic('city');
      else if (this.overworld.currentZone.theme === 'stadium') Sound.playMusic('champion');
      else Sound.playMusic('route');
    };
    if (this.state === GAME_STATES.DIALOGUE) {
      const existingCallback = this.dialogueCallback;
      this.dialogueCallback = () => {
        if (existingCallback) existingCallback();
        returnToMap();
      };
    } else {
      returnToMap();
    }
  }

  handleBlackoutAndRespawn() {
    const curZone = this.overworld ? this.overworld.currentZoneId : 'VERTEX_HAVEN';
    const nearest = NEAREST_POKECENTER[curZone] || NEAREST_POKECENTER.VERTEX_HAVEN;

    // Show blackout overlay
    const blackoutEl = document.getElementById('blackout-overlay');
    if (blackoutEl) {
      blackoutEl.classList.remove('hidden');
      blackoutEl.style.opacity = '1';
    }

    Sound.playFaint();

    setTimeout(() => {
      // Restore all Pokémon in party to full health
      this.player.party.forEach(p => {
        p.currentHp = p.stats.maxHp;
        p.isMega = false;
        p.isDynamaxed = false;
        p.hasZMoveUsed = false;
      });

      // Warp player to the nearest Pokémon Center right in front of Nurse Joy
      this.state = GAME_STATES.OVERWORLD;
      this.battle = null;
      this.overworld.setZone(nearest.zone, nearest.x, nearest.y);
      this.overworld.facing = 'up';

      // Hide battle screen
      const battleView = document.getElementById('battle-screen');
      if (battleView) battleView.classList.add('hidden');

      // Fade out blackout overlay
      if (blackoutEl) {
        blackoutEl.style.opacity = '0';
        setTimeout(() => blackoutEl.classList.add('hidden'), 500);
      }

      // Play heal jingle
      Sound.playHeal();
      this.saveToStorage();

      // Show Nurse Joy dialogue
      this.showDialogue([
        `Ash is out of usable Pokémon... Ash blacked out!`,
        `You were safely transported to ${nearest.name}!`,
        `Nurse Joy: "You're safe now! We treated your exhausted Pokémon and brought them back to full vitality!"`,
        `Nurse Joy: "Don't give up! Rest up and keep fighting for your World Coronation dream!"`
      ]);
    }, 1200);
  }

  // === NPC INTERACTION ===
  handleNpcInteraction(npc) {
    if (npc.isPc) {
      this.openPcStorage();
      return;
    }
    if (npc.isNurse) {
      Sound.playHeal();
      this.player.party.forEach(p => p.currentHp = p.stats.maxHp);
      this.showDialogue([
        'Nurse Joy: We have restored your Pokémon to full health!',
        'We hope to see you again! Good luck on your World Coronation climb!'
      ]);
      return;
    }

    if (npc.isWcsTrainer && npc.wcsId) {
      const opp = WCS_OPPONENTS.find(o => o.id === npc.wcsId);
      if (opp) {
        if (this.player.completedWcsBattles.includes(opp.id)) {
          this.showDialogue([
            `${opp.name}: You already defeated me! Keep climbing, future Monarch!`
          ]);
        } else {
          this.startWcsBattle(opp);
        }
      }
      return;
    }

    // Standard NPC dialogue
    this.showDialogue([`${npc.name}: ${npc.dialogue}`]);
  }

  handleSpecialWarp(specialId) {
    if (specialId === 'pokecenter') {
      this.pokecenterReturn = { zone: this.overworld.currentZoneId, x: this.overworld.playerTile.x, y: this.overworld.playerTile.y + 1 };
      this.overworld.setZone('POKECENTER_INTERIOR', 6, 7);
      this.showDialogue(['You entered the Pokémon Center. Nurse Joy and the Pokémon Storage PC are inside.']);
      return;
    }

    if (specialId === 'pokecenter_exit') {
      const exit = this.pokecenterReturn || { zone: 'VERTEX_HAVEN', x: 9, y: 8 };
      this.overworld.setZone(exit.zone, exit.x, exit.y);
      return;
    }

    if (specialId === 'building') {
      const source = { zone: this.overworld.currentZoneId, x: this.overworld.playerTile.x, y: this.overworld.playerTile.y + 1 };
      const hasCenter = this.overworld.currentZone.npcs.some(npc => npc.isNurse);
      this.buildingReturn = source;
      if (hasCenter) {
        this.pokecenterReturn = source;
        this.overworld.setZone('POKECENTER_INTERIOR', 6, 7);
      } else {
        this.overworld.setZone('BUILDING_INTERIOR', 5, 5);
      }
      return;
    }

    if (specialId === 'building_exit') {
      const exit = this.buildingReturn || { zone: 'VERTEX_HAVEN', x: 10, y: 12 };
      this.overworld.setZone(exit.zone, exit.x, exit.y);
      return;
    }

    // Legendary Event Triggers
    const ev = LEGENDARY_EVENTS.find(e => e.id === specialId);
    if (ev) {
      if (this.player.rank > ev.requiredRank) {
        this.showDialogue([
          `A mysterious dimensional seal blocks your path!`,
          `Requires World Coronation Rank #${ev.requiredRank} or higher to enter (Your Rank: #${this.player.rank}).`
        ]);
        return;
      }

      // Trigger Legendary Encounter
      const legPkmn = createPokemon(ev.legendary, ev.level);
      this.showDialogue([
        ev.introText,
        `Rotom Drone: "ALERT! High-energy mythical anomaly detected! Prepare for battle!"`
      ], () => {
        Sound.playMusic('champion');
        this.startBattle({
          opponentTeam: [legPkmn],
          isTrainer: false,
          trainerName: legPkmn.name,
          isLegendaryEvent: true,
          eventData: ev
        });
      });
    }
  }

  // === DIALOGUE QUEUE ===
  showDialogue(lines, callback = null) {
    this.dialogueQueue = [...lines];
    this.dialogueCallback = callback;
    this.state = GAME_STATES.DIALOGUE;
    this.advanceDialogue();
  }

  advanceDialogue() {
    if (this.dialogueQueue.length > 0) {
      this.currentDialogue = this.dialogueQueue.shift();
      Sound.playBlip();
      this.updateDialogueUI();
    } else {
      this.currentDialogue = null;
      if (this.dialogueCallback) {
        const cb = this.dialogueCallback;
        this.dialogueCallback = null;
        cb();
      } else {
        this.state = GAME_STATES.OVERWORLD;
      }
      this.updateDialogueUI();
    }
  }

  // === INPUT HANDLING (Laptop Keyboard + Mobile Touch) ===
  bindInputs() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      // Prevent scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Shift') this.isRunning = true;

      // Speed toggles: 1, 2, 3
      if (e.key === '1') this.setSpeed(1);
      if (e.key === '2') this.setSpeed(2);
      if (e.key === '3') this.setSpeed(3);

      if (this.state === GAME_STATES.OVERWORLD) {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.heldDirection = 'up';
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.heldDirection = 'down';
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.heldDirection = 'left';
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.heldDirection = 'right';
        if (this.heldDirection) this.overworld.movePlayer(this.heldDirection, this.isRunning);

        // A Button (Confirm / Interact)
        if (e.key === 'z' || e.key === 'Z' || e.key === ' ' || e.key === 'Enter') {
          this.overworld.interact();
        }

        // B Button (Cancel / Run)
        if (e.key === 'x' || e.key === 'X' || e.key === 'Escape') {
          // Toggle running or cancel
        }

        // Menu Button
        if (e.key === 'c' || e.key === 'C' || e.key === 'm' || e.key === 'M' || e.key === 'Tab') {
          this.toggleMenu();
        }

        // Quick Save shortcut
        if (e.key === 'p' || e.key === 'P') {
          this.openSaveModal();
        }
      } else if (this.state === GAME_STATES.DIALOGUE) {
        if (e.key === 'z' || e.key === 'Z' || e.key === ' ' || e.key === 'Enter') {
          this.advanceDialogue();
        }
      }

      if (e.key === 'Escape') {
        this.closeSaveModal();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') this.isRunning = false;
      const released = ({ ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' })[e.key];
      if (released === this.heldDirection) this.heldDirection = null;
    });

    // Touch controls on screen (Mobile D-Pad & Action Buttons)
    this.bindTouchControls();
  }

  bindTouchControls() {
    const bindBtn = (id, onAction) => {
      const el = document.getElementById(id);
      if (!el) return;
      const trigger = (e) => {
        e.preventDefault();
        onAction();
      };
      el.addEventListener('touchstart', trigger, { passive: false });
      el.addEventListener('mousedown', trigger);
    };

    bindBtn('dpad-up', () => this.overworld && this.overworld.movePlayer('up', this.isRunning));
    bindBtn('dpad-down', () => this.overworld && this.overworld.movePlayer('down', this.isRunning));
    bindBtn('dpad-left', () => this.overworld && this.overworld.movePlayer('left', this.isRunning));
    bindBtn('dpad-right', () => this.overworld && this.overworld.movePlayer('right', this.isRunning));

    bindBtn('btn-a', () => {
      if (this.state === GAME_STATES.DIALOGUE) this.advanceDialogue();
      else if (this.state === GAME_STATES.OVERWORLD) this.overworld.interact();
    });

    bindBtn('btn-b', () => {
      this.isRunning = !this.isRunning;
    });

    bindBtn('btn-menu', () => this.toggleMenu());
    bindBtn('btn-speed', () => {
      const nextSpeed = this.speedMultiplier === 1 ? 2 : (this.speedMultiplier === 2 ? 3 : 1);
      this.setSpeed(nextSpeed);
    });
  }

  setSpeed(mult) {
    this.speedMultiplier = mult;
    const speedEl = document.getElementById('speed-display');
    if (speedEl) speedEl.textContent = `${mult}x Speed`;
  }

  toggleMenu() {
    if (this.state === GAME_STATES.OVERWORLD) {
      this.state = GAME_STATES.MENU;
      this.openMenuModal();
    } else if (this.state === GAME_STATES.MENU) {
      this.state = GAME_STATES.OVERWORLD;
      this.closeMenuModal();
    }
  }

  // === STORAGE / MULTI-SLOT SAVE / LOAD ===
  formatPlayTime(secTotal = this.playTimeSeconds) {
    const hours = Math.floor(secTotal / 3600);
    const minutes = Math.floor((secTotal % 3600) / 60);
    const seconds = secTotal % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  saveGame(slot = this.activeSaveSlot, isAuto = false) {
    try {
      const tier = getTierForRank(this.player.rank);
      const partySummary = this.player.party.map(p => ({
        speciesKey: p.speciesKey,
        name: p.name,
        level: p.level,
        hpPct: Math.round((p.currentHp / p.stats.maxHp) * 100)
      }));

      const saveData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString(),
        playTimeSeconds: this.playTimeSeconds,
        formattedPlayTime: this.formatPlayTime(),
        zone: this.overworld ? this.overworld.currentZoneId : 'VERTEX_HAVEN',
        zoneName: this.overworld ? this.overworld.currentZone.name : 'Vertex Haven',
        x: this.overworld ? this.overworld.playerTile.x : 10,
        y: this.overworld ? this.overworld.playerTile.y : 12,
        tierName: tier.name,
        partySummary: partySummary,
        player: this.player
      };

      const storageKey = `pokemon_journeys_save_${slot}`;
      localStorage.setItem(storageKey, JSON.stringify(saveData));
      // Save to default key as well for fallback
      localStorage.setItem('pokemon_journeys_save', JSON.stringify(saveData));

      if (!isAuto) {
        Sound.playSaveFanfare();
        this.showSaveToast(`Game Saved in ${slot.toUpperCase()}!`);
      } else {
        this.showSaveToast('Auto-Saved ✓');
      }

      // Update UI if save modal is open
      this.renderSaveModal();
      return true;
    } catch (e) {
      console.error('Error saving game:', e);
      return false;
    }
  }

  loadGame(slot = this.activeSaveSlot) {
    try {
      const storageKey = `pokemon_journeys_save_${slot}`;
      let raw = localStorage.getItem(storageKey);
      if (!raw) {
        raw = localStorage.getItem('pokemon_journeys_save');
      }
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (data && data.player && data.player.party && data.player.party.length > 0) {
        this.player = this.normalizeLoadedPlayer(data.player);
        this.player.box ||= [];
        if (data.playTimeSeconds) this.playTimeSeconds = data.playTimeSeconds;
        this.activeSaveSlot = slot;

        if (this.overworld) {
          const zoneId = ZONES[data.zone] ? data.zone : 'VERTEX_HAVEN';
          const zone = ZONES[zoneId];
          const x = Number.isInteger(data.x) && data.x >= 0 && data.x < zone.width ? data.x : zone.playerStart.x;
          const y = Number.isInteger(data.y) && data.y >= 0 && data.y < zone.height ? data.y : zone.playerStart.y;
          this.overworld.setZone(zoneId, x, y);
        }
        this.state = GAME_STATES.OVERWORLD;
        Sound.playSelect();
        this.showSaveToast(`Loaded ${slot.toUpperCase()}!`);
        this.closeSaveModal();
        this.closeMenuModal();
        return true;
      }
    } catch (e) {
      console.error('Error loading game:', e);
      return false;
    }
    return false;
  }

  normalizeLoadedPlayer(savedPlayer) {
    const defaults = { name: 'Ash', gender: 'male', rank: 10000, money: 3000, party: [], box: [], bag: {}, keyItems: {}, completedWcsBattles: [], completedEvents: [] };
    const player = { ...defaults, ...savedPlayer, bag: { ...this.player.bag, ...(savedPlayer.bag || {}) }, keyItems: { ...this.player.keyItems, ...(savedPlayer.keyItems || {}) } };
    const repairPokemon = (pokemon) => {
      const species = POKEMON_SPECIES[pokemon?.speciesKey];
      if (!species) return null;
      const level = Math.max(1, Math.min(100, Number(pokemon.level) || 5));
      const stats = pokemon.stats?.maxHp ? pokemon.stats : calculateStats(species.baseStats, level);
      return { ...pokemon, name: pokemon.name || species.name, level, types: pokemon.types?.length ? pokemon.types : [...species.types], moves: pokemon.moves?.length ? pokemon.moves : [...species.moves], stats, currentHp: Math.max(0, Math.min(Number(pokemon.currentHp) || stats.maxHp, stats.maxHp)), exp: Number(pokemon.exp) || 0, nextExp: Number(pokemon.nextExp) || Math.pow(level + 1, 3) };
    };
    player.party = (player.party || []).map(repairPokemon).filter(Boolean).slice(0, 6);
    player.box = (player.box || []).map(repairPokemon).filter(Boolean);
    return player;
  }

  saveToStorage() {
    return this.saveGame(this.activeSaveSlot, true);
  }

  loadFromStorage() {
    return this.loadGame('slot1');
  }

  getSaveSlotData(slot) {
    try {
      const raw = localStorage.getItem(`pokemon_journeys_save_${slot}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  downloadSaveFile(slot = this.activeSaveSlot) {
    const data = this.getSaveSlotData(slot) || {
      version: '1.0',
      timestamp: new Date().toISOString(),
      playTimeSeconds: this.playTimeSeconds,
      formattedPlayTime: this.formatPlayTime(),
      zone: this.overworld.currentZoneId,
      player: this.player
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemon_emerald_journeys_${slot}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showSaveToast(`Downloaded ${slot} file!`);
  }

  uploadSaveFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data && data.player && data.player.party) {
          this.player = this.normalizeLoadedPlayer(data.player);
          if (data.playTimeSeconds) this.playTimeSeconds = data.playTimeSeconds;
          if (this.overworld) {
            const zoneId = ZONES[data.zone] ? data.zone : 'VERTEX_HAVEN';
            const zone = ZONES[zoneId];
            this.overworld.setZone(zoneId, Number.isInteger(data.x) ? data.x : zone.playerStart.x, Number.isInteger(data.y) ? data.y : zone.playerStart.y);
          }
          this.saveGame(this.activeSaveSlot, true);
          Sound.playCatchSuccess();
          this.showSaveToast('Save File Restored Successfully!');
          this.closeSaveModal();
          this.closeMenuModal();
        } else {
          alert('Invalid Pokémon save file format.');
        }
      } catch (err) {
        alert('Could not parse save file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  showSaveToast(msg) {
    let toast = document.getElementById('save-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'save-toast';
      document.getElementById('screen-viewport').appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = 'save-toast-visible';
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.className = 'save-toast-hidden';
    }, 2200);
  }

  openSaveModal() {
    const modal = document.getElementById('save-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    this.renderSaveModal();
  }

  closeSaveModal() {
    const modal = document.getElementById('save-modal');
    if (modal) modal.classList.add('hidden');
  }

  renderSaveModal() {
    const infoBox = document.getElementById('save-preview-card');
    if (!infoBox) return;

    const tier = getTierForRank(this.player.rank);
    const zoneName = this.overworld ? this.overworld.currentZone.name : 'Vertex Haven';

    infoBox.innerHTML = `
      <div class="save-detail-row">
        <span><strong>PLAYER:</strong> ${this.player.name.toUpperCase()}</span>
        <span><strong>RANK:</strong> #${this.player.rank}</span>
      </div>
      <div class="save-detail-row">
        <span><strong>TIER:</strong> ${tier.name}</span>
        <span><strong>TIME:</strong> ${this.formatPlayTime()}</span>
      </div>
      <div class="save-detail-row">
        <span><strong>LOCATION:</strong> ${zoneName}</span>
        <span><strong>POKÉMON:</strong> ${this.player.party.length}/6</span>
      </div>
      <div class="save-party-preview">
        ${this.player.party.map(p => `
          <div class="save-party-mini">
            <img src="${Sprites.getPokemonSpriteUrl(p, false)}" onerror="this.src='${Sprites.getFallbackSvgUrl(p, false)}'" />
            <span>${p.name.slice(0, 7)} Lv.${p.level}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Render Slots list
    const slots = ['slot1', 'slot2', 'slot3'];
    const slotsContainer = document.getElementById('save-slots-list');
    if (slotsContainer) {
      slotsContainer.innerHTML = '';
      slots.forEach((sId, idx) => {
        const slotData = this.getSaveSlotData(sId);
        const isActive = this.activeSaveSlot === sId;
        const div = document.createElement('div');
        div.className = `save-slot-card ${isActive ? 'active-slot' : ''}`;
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>SLOT ${idx + 1} ${isActive ? '★ (Current)' : ''}</strong>
            <span style="font-size:8px; color:#cbd5e0;">${slotData ? slotData.formattedDate : 'Empty'}</span>
          </div>
          ${slotData ? `
            <div style="font-size:9px; color:#f8c830; margin-top:4px;">
              Rank #${slotData.player.rank} • ${slotData.zoneName || 'Astraea'} • Time: ${slotData.formattedPlayTime || '00:00:00'}
            </div>
            <div style="font-size:8px; color:#a0aec0; margin-top:2px;">
              Team: ${slotData.partySummary ? slotData.partySummary.map(p => p.name).join(', ') : 'Active Team'}
            </div>
          ` : `
            <div style="font-size:9px; color:#718096; margin-top:4px;">No save data recorded.</div>
          `}
          <div style="display:flex; gap:6px; margin-top:8px;">
            <button class="save-action-btn btn-save-slot" data-slot="${sId}">SAVE HERE</button>
            ${slotData ? `<button class="save-action-btn btn-load-slot" data-slot="${sId}" style="background:#2b6cb0;">LOAD</button>` : ''}
            <button class="save-action-btn btn-download-slot" data-slot="${sId}" style="background:#4a5568;">EXPORT</button>
          </div>
        `;
        slotsContainer.appendChild(div);
      });

      // Bind buttons inside slotsContainer
      slotsContainer.querySelectorAll('.btn-save-slot').forEach(btn => {
        btn.onclick = () => {
          const s = btn.dataset.slot;
          this.activeSaveSlot = s;
          this.saveGame(s, false);
        };
      });
      slotsContainer.querySelectorAll('.btn-load-slot').forEach(btn => {
        btn.onclick = () => {
          const s = btn.dataset.slot;
          if (confirm(`Load game from Slot ${s.replace('slot', '')}? Current unsaved progress will be replaced.`)) {
            this.loadGame(s);
          }
        };
      });
      slotsContainer.querySelectorAll('.btn-download-slot').forEach(btn => {
        btn.onclick = () => {
          this.downloadSaveFile(btn.dataset.slot);
        };
      });
    }
  }

  // === UI UPDATERS ===
  updateDialogueUI() {
    const box = document.getElementById('dialogue-box');
    const textEl = document.getElementById('dialogue-text');
    if (!box || !textEl) return;

    if (this.state === GAME_STATES.DIALOGUE && this.currentDialogue) {
      box.classList.remove('hidden');
      textEl.textContent = this.currentDialogue;
    } else {
      box.classList.add('hidden');
    }
  }

  showBattleLog(message) {
    const logEl = document.getElementById('battle-message');
    if (logEl) {
      logEl.textContent = message;
    }
  }

  updateBattleUI() {
    const battleView = document.getElementById('battle-screen');
    if (!battleView) return;

    if (this.state === GAME_STATES.BATTLE && this.battle) {
      battleView.classList.remove('hidden');
      this.renderBattleState();
    } else {
      battleView.classList.add('hidden');
    }
  }

  renderBattleState() {
    if (!this.battle) return;
    const playerPkmn = this.battle.getPlayerPokemon();
    const oppPkmn = this.battle.getOpponentPokemon();

    // Opponent elements
    const oppName = document.getElementById('opp-name');
    const oppLvl = document.getElementById('opp-lvl');
    const oppHpBar = document.getElementById('opp-hp-bar');
    const oppSprite = document.getElementById('opp-sprite');

    if (oppName) oppName.textContent = oppPkmn.name;
    if (oppLvl) oppLvl.textContent = `Lv.${oppPkmn.level}`;
    if (oppHpBar) {
      const pct = Math.max(0, Math.min(100, (oppPkmn.currentHp / oppPkmn.stats.maxHp) * 100));
      oppHpBar.style.width = `${pct}%`;
      oppHpBar.style.background = pct > 50 ? '#48BB78' : (pct > 20 ? '#ECC94B' : '#E53E3E');
    }
    if (oppSprite) {
      oppSprite.src = Sprites.getPokemonSpriteUrl(oppPkmn, false);
      oppSprite.onerror = () => {
        oppSprite.onerror = () => { oppSprite.src = Sprites.getFallbackSvgUrl(oppPkmn, false); };
        oppSprite.src = Sprites.getStaticBackupSpriteUrl(oppPkmn, false);
      };
      if (oppPkmn.isDynamaxed) oppSprite.classList.add('dynamax-glow');
      else oppSprite.classList.remove('dynamax-glow');
    }

    // Player elements
    const playerName = document.getElementById('player-name');
    const playerLvl = document.getElementById('player-lvl');
    const playerHpBar = document.getElementById('player-hp-bar');
    const playerHpText = document.getElementById('player-hp-text');
    const playerSprite = document.getElementById('player-sprite');

    if (playerName) playerName.textContent = playerPkmn.name;
    if (playerLvl) playerLvl.textContent = `Lv.${playerPkmn.level}`;
    if (playerHpBar) {
      const pct = Math.max(0, Math.min(100, (playerPkmn.currentHp / playerPkmn.stats.maxHp) * 100));
      playerHpBar.style.width = `${pct}%`;
      playerHpBar.style.background = pct > 50 ? '#48BB78' : (pct > 20 ? '#ECC94B' : '#E53E3E');
    }
    if (playerHpText) playerHpText.textContent = `${playerPkmn.currentHp} / ${playerPkmn.stats.maxHp}`;
    if (playerSprite) {
      playerSprite.src = Sprites.getPokemonSpriteUrl(playerPkmn, true);
      playerSprite.onerror = () => {
        playerSprite.onerror = () => { playerSprite.src = Sprites.getFallbackSvgUrl(playerPkmn, true); };
        playerSprite.src = Sprites.getStaticBackupSpriteUrl(playerPkmn, true);
      };
      if (playerPkmn.isDynamaxed) playerSprite.classList.add('dynamax-glow');
      else playerSprite.classList.remove('dynamax-glow');
    }

    // Render Move Buttons
    const movesContainer = document.getElementById('battle-moves');
    if (movesContainer) {
      movesContainer.innerHTML = '';
      playerPkmn.moves.forEach(moveKey => {
        const btn = document.createElement('button');
        btn.className = 'move-btn';
        btn.textContent = moveKey;
        btn.disabled = this.battle.isBusy;
        btn.onclick = () => this.battle.handlePlayerTurn(moveKey);
        movesContainer.appendChild(btn);
      });
    }

    // Mega / Z-Move / Dynamax Gimmick Buttons
    const megaBtn = document.getElementById('btn-mega');
    const zBtn = document.getElementById('btn-zmove');
    const dmaxBtn = document.getElementById('btn-dynamax');

    if (megaBtn) {
      const canMega = this.player.keyItems.megaBracelet && !playerPkmn.isMega;
      megaBtn.style.display = canMega ? 'inline-block' : 'none';
      megaBtn.className = this.battle.selectedMega ? 'gimmick-btn active' : 'gimmick-btn';
      megaBtn.onclick = () => {
        this.battle.selectedMega = !this.battle.selectedMega;
        megaBtn.className = this.battle.selectedMega ? 'gimmick-btn active' : 'gimmick-btn';
      };
    }

    if (zBtn) {
      const canZ = this.player.keyItems.zRing && !playerPkmn.hasZMoveUsed;
      zBtn.style.display = canZ ? 'inline-block' : 'none';
      zBtn.className = this.battle.selectedZMove ? 'gimmick-btn active' : 'gimmick-btn';
      zBtn.onclick = () => {
        this.battle.selectedZMove = !this.battle.selectedZMove;
        zBtn.className = this.battle.selectedZMove ? 'gimmick-btn active' : 'gimmick-btn';
      };
    }

    if (dmaxBtn) {
      const canDmax = this.player.keyItems.dynamaxBand && !playerPkmn.isDynamaxed;
      dmaxBtn.style.display = canDmax ? 'inline-block' : 'none';
      dmaxBtn.className = this.battle.selectedDynamax ? 'gimmick-btn active' : 'gimmick-btn';
      dmaxBtn.onclick = () => {
        this.battle.selectedDynamax = !this.battle.selectedDynamax;
        dmaxBtn.className = this.battle.selectedDynamax ? 'gimmick-btn active' : 'gimmick-btn';
      };
    }
  }

  openBattlePartySelector() {
    if (!this.battle || this.battle.isBusy) return;
    const modal = document.getElementById('battle-party-modal');
    const list = document.getElementById('battle-party-list');
    if (!modal || !list) return;
    list.innerHTML = '';
    this.player.party.forEach((pokemon, index) => {
      const active = index === this.battle.playerActiveIndex;
      const usable = pokemon.currentHp > 0;
      const button = document.createElement('button');
      button.className = `party-switch-card ${active ? 'active' : ''}`;
      button.disabled = active || !usable;
      button.innerHTML = `<strong>${pokemon.name}</strong><span>Lv.${pokemon.level} &nbsp; HP ${pokemon.currentHp}/${pokemon.stats.maxHp}</span>`;
      button.onclick = async () => {
        modal.classList.add('hidden');
        await this.battle.switchPlayerPokemon(index);
      };
      list.appendChild(button);
    });
    modal.classList.remove('hidden');
  }

  openBattleLeadSelector() {
    if (!this.battle) return;
    const usable = this.player.party.map((pokemon, index) => ({ pokemon, index })).filter(item => item.pokemon.currentHp > 0);
    if (usable.length <= 1) return;
    const modal = document.getElementById('battle-lead-modal');
    const list = document.getElementById('battle-lead-list');
    if (!modal || !list) return;
    list.innerHTML = '';
    usable.forEach(({ pokemon, index }) => {
      const button = document.createElement('button');
      button.className = 'party-switch-card';
      button.innerHTML = `<strong>${pokemon.name}</strong><span>Lv.${pokemon.level} &nbsp; HP ${pokemon.currentHp}/${pokemon.stats.maxHp}</span>`;
      button.onclick = () => {
        this.battle.playerActiveIndex = index;
        this.renderBattleState();
        modal.classList.add('hidden');
        this.showBattleLog(`Go! ${pokemon.name}!`);
      };
      list.appendChild(button);
    });
    modal.classList.remove('hidden');
  }

  openMenuModal() {
    const modal = document.getElementById('menu-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    // Populate Rank & Stats
    const rankEl = document.getElementById('menu-rank');
    if (rankEl) {
      const tier = getTierForRank(this.player.rank);
      rankEl.textContent = `Rank #${this.player.rank} (${tier.name})`;
    }

    // Populate Team list
    const teamEl = document.getElementById('menu-team-list');
    if (teamEl) {
      teamEl.innerHTML = '';
      this.player.party.forEach(p => {
        const item = document.createElement('div');
        item.className = 'menu-pkmn-card';
        item.innerHTML = `
          <strong>${p.name}</strong> Lv.${p.level}
          <div class="hp-mini">HP: ${p.currentHp}/${p.stats.maxHp}</div>
          <button class="summary-btn">Summary</button>
        `;
        item.querySelector('.summary-btn').onclick = () => this.openPokemonSummary(p);
        teamEl.appendChild(item);
      });
    }

    // Populate Legendaries portal status
    const portalList = document.getElementById('menu-portal-list');
    if (portalList) {
      portalList.innerHTML = '';
      const events = getAvailableEvents(this.player.rank, this.player.completedEvents);
      events.forEach(ev => {
        const d = document.createElement('div');
        d.className = `portal-card ${ev.isDone ? 'done' : (ev.isUnlocked ? 'unlocked' : 'locked')}`;
        d.innerHTML = `
          <strong>${ev.title}</strong> (${ev.legendary.toUpperCase()})
          <br><small>${ev.location} - Req: Rank #${ev.requiredRank} [${ev.isDone ? 'CAUGHT' : (ev.isUnlocked ? 'READY' : 'LOCKED')}]</small>
        `;
        portalList.appendChild(d);
      });
    }
  }

  closeMenuModal() {
    const modal = document.getElementById('menu-modal');
    if (modal) modal.classList.add('hidden');
    // Several menu actions close this modal directly. Always resume map updates
    // when no other overlay (dialogue/battle) has taken control of the state.
    if (this.state === GAME_STATES.MENU) {
      this.state = GAME_STATES.OVERWORLD;
    }
  }

  openPokemonSummary(pokemon) {
    const modal = document.getElementById('pokemon-summary-modal');
    const content = document.getElementById('pokemon-summary-content');
    if (!modal || !content || !pokemon) return;
    const expToNext = Math.max(0, pokemon.nextExp - pokemon.exp);
    content.innerHTML = `
      <div class="summary-portrait"><img src="${Sprites.getPokemonSpriteUrl(pokemon, false)}" alt="${pokemon.name}" onerror="this.src='${Sprites.getFallbackSvgUrl(pokemon, false)}'"></div>
      <div class="summary-name">${pokemon.name} <span>Lv.${pokemon.level}</span></div>
      <div class="summary-types">${pokemon.types.map(type => `<span class="type-badge" style="background:${Sprites.getTypePrimaryColor(type)}">${type}</span>`).join(' ')}</div>
      <div class="summary-hp">HP ${pokemon.currentHp} / ${pokemon.stats.maxHp}</div>
      <div class="summary-grid"><span>Attack <b>${pokemon.stats.atk}</b></span><span>Defense <b>${pokemon.stats.def}</b></span><span>Sp. Atk <b>${pokemon.stats.spAtk}</b></span><span>Sp. Def <b>${pokemon.stats.spDef}</b></span><span>Speed <b>${pokemon.stats.spd}</b></span><span>EXP to next <b>${expToNext}</b></span></div>
      <div class="summary-moves"><strong>MOVES</strong>${pokemon.moves.map(move => `<span>${move}</span>`).join('')}</div>`;
    modal.classList.remove('hidden');
  }

  openPcStorage() {
    const modal = document.getElementById('pc-modal');
    if (!modal) return;
    this.player.box ||= [];
    const render = () => {
      const partyList = document.getElementById('pc-party-list');
      const boxList = document.getElementById('pc-box-list');
      const count = document.getElementById('pc-party-count');
      if (!partyList || !boxList) return;
      if (count) count.textContent = `${this.player.party.length}/6`;
      partyList.innerHTML = this.player.party.map((p, index) => `<button class="pc-pokemon" data-source="party" data-index="${index}"><strong>${p.name}</strong><span>Lv.${p.level} · HP ${p.currentHp}/${p.stats.maxHp}</span><em>Deposit</em></button>`).join('') || '<p class="pc-empty">No Pokémon in party.</p>';
      boxList.innerHTML = this.player.box.map((p, index) => `<button class="pc-pokemon" data-source="box" data-index="${index}" ${this.player.party.length >= 6 ? 'disabled' : ''}><strong>${p.name}</strong><span>Lv.${p.level} · HP ${p.currentHp}/${p.stats.maxHp}</span><em>Withdraw</em></button>`).join('') || '<p class="pc-empty">PC Box is empty.</p>';
      partyList.querySelectorAll('button').forEach(button => button.onclick = () => {
        if (this.player.party.length <= 1) { this.showSaveToast('Keep at least one Pokémon in your party.'); return; }
        this.player.box.push(this.player.party.splice(Number(button.dataset.index), 1)[0]);
        this.saveToStorage(); render();
      });
      boxList.querySelectorAll('button').forEach(button => button.onclick = () => {
        if (this.player.party.length >= 6) return;
        this.player.party.push(this.player.box.splice(Number(button.dataset.index), 1)[0]);
        this.saveToStorage(); render();
      });
    };
    render();
    modal.classList.remove('hidden');
  }

  startNewGame() {
    if (!confirm('Start a new game? Existing saved progress will be replaced when you save.')) return;
    this.player = { name: 'Ash', gender: 'male', rank: 10000, money: 3000, party: [], box: [], bag: { pokeball: 15, greatball: 8, ultraball: 5, masterball: 2, potion: 10, superpotion: 6, fullrestore: 3, revive: 5 }, keyItems: { megaBracelet: false, zRing: false, dynamaxBand: false }, completedWcsBattles: [], completedEvents: [] };
    this.playTimeSeconds = 0;
    this.battle = null;
    this.overworld.setZone('VERTEX_HAVEN', 10, 12);
    this.state = GAME_STATES.STARTER_SELECT;
    this.closeMenuModal();
    document.getElementById('trainer-name-input').value = 'Ash';
    document.querySelectorAll('.gender-btn').forEach(button => button.classList.toggle('selected', button.dataset.gender === 'male'));
    document.getElementById('starter-modal').classList.remove('hidden');
    window.dispatchEvent(new Event('newgame'));
  }

  // === MAIN GAME LOOP ===
  gameLoop(timestamp) {
    const delta = Math.min(2, (timestamp - this.lastTime) / (1000 / 60)) * this.speedMultiplier;
    this.lastTime = timestamp;

    if (this.state === GAME_STATES.OVERWORLD) {
      if (this.heldDirection && !this.overworld.isMoving) this.overworld.movePlayer(this.heldDirection, this.isRunning);
      this.overworld.update(delta);
      this.overworld.render();
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
