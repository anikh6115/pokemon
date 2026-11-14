// Anime Visual Effects Engine for Pokémon Emerald Journeys
// Renders Authentic TV-Anime Style Attack Animations, Energy Beams, Lightning,
// Particle Explosions, Mega Evolution, Z-Move Cutscenes & Screen Tremors

export class AnimeVfxEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.activeVfx = false;
  }

  init(canvasId = 'vfxCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth || 640;
      this.canvas.height = parent.clientHeight || 480;
    }
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // === ANIME ACTION BANNER (TV Broadcast Style) ===
  showAnimeBanner(text, subtext = '') {
    const banner = document.getElementById('anime-action-banner');
    if (!banner) return;
    const titleEl = document.getElementById('anime-banner-title');
    const subEl = document.getElementById('anime-banner-sub');
    if (titleEl) titleEl.textContent = text.toUpperCase();
    if (subEl) subEl.textContent = subtext;

    banner.classList.remove('hidden');
    banner.classList.add('banner-in');

    setTimeout(() => {
      banner.classList.remove('banner-in');
      banner.classList.add('banner-out');
      setTimeout(() => {
        banner.classList.add('hidden');
        banner.classList.remove('banner-out');
      }, 300);
    }, 1100);
  }

  // === SCREEN SHAKE CONTROLLER ===
  screenShake(intensity = 8, durationMs = 450) {
    const screen = document.getElementById('screen-viewport');
    if (!screen) return;

    const startTime = performance.now();
    const shake = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed < durationMs) {
        const factor = 1 - (elapsed / durationMs);
        const dx = (Math.random() - 0.5) * intensity * 2 * factor;
        const dy = (Math.random() - 0.5) * intensity * 2 * factor;
        screen.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(shake);
      } else {
        screen.style.transform = 'translate(0px, 0px)';
      }
    };
    requestAnimationFrame(shake);
  }

  // === ATTACKER CHARGE & DEFENDER FLINCH ===
  animateCombatants(attackerEl, defenderEl, isPlayer) {
    if (attackerEl) {
      attackerEl.style.transition = 'transform 0.15s ease-out';
      attackerEl.style.transform = isPlayer
        ? 'translate(45px, -35px) scale(1.15)'
        : 'translate(-45px, 35px) scale(1.15)';
      setTimeout(() => {
        attackerEl.style.transition = 'transform 0.25s ease-in';
        attackerEl.style.transform = 'translate(0px, 0px) scale(1)';
      }, 250);
    }

    setTimeout(() => {
      if (defenderEl) {
        defenderEl.style.transition = 'filter 0.08s, transform 0.12s';
        defenderEl.style.filter = 'brightness(2.5) drop-shadow(0 0 16px red)';
        defenderEl.style.transform = isPlayer
          ? 'translate(-25px, 20px)'
          : 'translate(25px, -20px)';
        setTimeout(() => {
          defenderEl.style.filter = '';
          defenderEl.style.transform = 'translate(0px, 0px)';
        }, 220);
      }
    }, 180);
  }

  // === MAIN MOVE VFX DISPATCHER ===
  async playMoveVfx(move, attackerEl, defenderEl, isPlayer) {
    this.resize();
    const moveName = move.name || 'Attack';
    const type = move.type || 'Normal';

    // Show action banner
    this.showAnimeBanner(`${moveName}`, `${type.toUpperCase()} ATTACK`);

    // Physical movement
    this.animateCombatants(attackerEl, defenderEl, isPlayer);

    const rectDef = defenderEl ? defenderEl.getBoundingClientRect() : null;
    const rectAtk = attackerEl ? attackerEl.getBoundingClientRect() : null;
    const canvasRect = this.canvas ? this.canvas.getBoundingClientRect() : { left: 0, top: 0 };

    const defX = rectDef ? (rectDef.left + rectDef.width / 2 - canvasRect.left) : (isPlayer ? 460 : 160);
    const defY = rectDef ? (rectDef.top + rectDef.height / 2 - canvasRect.top) : (isPlayer ? 140 : 340);
    const atkX = rectAtk ? (rectAtk.left + rectAtk.width / 2 - canvasRect.left) : (isPlayer ? 160 : 460);
    const atkY = rectAtk ? (rectAtk.top + rectAtk.height / 2 - canvasRect.top) : (isPlayer ? 340 : 140);

    // Dispatch to specific anime elemental rendering
    if (moveName.includes('10,000,000') || (type === 'Electric' && move.critRate >= 4)) {
      await this.playAshZMoveThunderbolt(atkX, atkY, defX, defY);
    } else if (type === 'Electric') {
      await this.playElectricVfx(atkX, atkY, defX, defY);
    } else if (type === 'Fire') {
      await this.playFireVfx(atkX, atkY, defX, defY, moveName.includes('Blast'));
    } else if (type === 'Water') {
      await this.playWaterVfx(atkX, atkY, defX, defY);
    } else if (type === 'Grass') {
      await this.playGrassVfx(atkX, atkY, defX, defY);
    } else if (type === 'Ice') {
      await this.playIceVfx(atkX, atkY, defX, defY);
    } else if (type === 'Dragon') {
      await this.playDragonVfx(atkX, atkY, defX, defY);
    } else if (type === 'Ghost' || type === 'Dark') {
      await this.playDarkGhostVfx(atkX, atkY, defX, defY);
    } else if (type === 'Psychic') {
      await this.playPsychicVfx(atkX, atkY, defX, defY);
    } else if (type === 'Rock' || type === 'Ground') {
      await this.playRockGroundVfx(defX, defY);
    } else if (type === 'Steel') {
      await this.playSteelVfx(atkX, atkY, defX, defY);
    } else if (type === 'Fairy') {
      await this.playFairyVfx(atkX, atkY, defX, defY);
    } else {
      await this.playPhysicalHitVfx(defX, defY);
    }
  }

  // === ⚡ ELECTRIC: THUNDERBOLT & LIGHTNING ===
  async playElectricVfx(startX, startY, targetX, targetY) {
    this.screenShake(6, 400);
    const ctx = this.ctx;
    const boltCount = 4;

    for (let frame = 0; frame < 18; frame++) {
      this.clear();
      // Draw lightning bolts
      ctx.lineWidth = 4 + Math.random() * 3;
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#FEEBC8';

      for (let b = 0; b < boltCount; b++) {
        ctx.strokeStyle = Math.random() > 0.3 ? '#ECC94B' : '#FFFFFF';
        ctx.beginPath();
        let curX = startX;
        let curY = startY;
        ctx.moveTo(curX, curY);

        const steps = 8;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const targetStepX = startX + (targetX - startX) * t;
          const targetStepY = startY + (targetY - startY) * t;
          curX = targetStepX + (Math.random() - 0.5) * 45;
          curY = targetStepY + (Math.random() - 0.5) * 45;
          ctx.lineTo(curX, curY);
        }
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
      }

      // Electric spark explosion at target
      ctx.fillStyle = '#FAF089';
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * 50;
        ctx.beginPath();
        ctx.arc(targetX + Math.cos(angle) * dist, targetY + Math.sin(angle) * dist, 3 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🌈 ASH'S SIGNATURE 10,000,000 VOLT THUNDERBOLT ===
  async playAshZMoveThunderbolt(startX, startY, targetX, targetY) {
    this.screenShake(16, 1200);
    const ctx = this.ctx;
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];

    for (let frame = 0; frame < 36; frame++) {
      this.clear();

      // Screen flash
      if (frame % 4 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      // Draw 7 Rainbow Lightning Beams simultaneously
      rainbowColors.forEach((color, idx) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 5 + Math.random() * 4;
        ctx.shadowBlur = 25;
        ctx.shadowColor = color;

        ctx.beginPath();
        let curX = startX + (idx - 3) * 12;
        let curY = startY;
        ctx.moveTo(curX, curY);

        const steps = 10;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const targetStepX = startX + (targetX - startX) * t;
          const targetStepY = startY + (targetY - startY) * t;
          curX = targetStepX + (Math.random() - 0.5) * 55;
          curY = targetStepY + (Math.random() - 0.5) * 55;
          ctx.lineTo(curX, curY);
        }
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
      });

      // Titanic plasma ring at impact
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(targetX, targetY, (frame * 3) % 80, 0, Math.PI * 2);
      ctx.stroke();

      await new Promise(r => setTimeout(r, 25));
    }
    this.clear();
  }

  // === 🔥 FIRE: FLAMETHROWER & FIRE BLAST ===
  async playFireVfx(startX, startY, targetX, targetY, isFireBlast = false) {
    this.screenShake(7, 500);
    const ctx = this.ctx;
    const particles = [];

    // Create flame particles along trajectory
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: startX,
        y: startY,
        vx: (targetX - startX) / 14 + (Math.random() - 0.5) * 6,
        vy: (targetY - startY) / 14 + (Math.random() - 0.5) * 6,
        size: 14 + Math.random() * 20,
        color: Math.random() > 0.4 ? '#DD6B20' : (Math.random() > 0.5 ? '#E53E3E' : '#ECC94B'),
        alpha: 1.0,
        life: 0
      });
    }

    for (let frame = 0; frame < 22; frame++) {
      this.clear();

      // Render flame particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.size *= 1.03;
        p.alpha = Math.max(0, 1 - (p.life / 22));

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // If Fire Blast, draw the blazing Kanji (大) shape at target
      if (isFireBlast && frame > 8) {
        ctx.save();
        ctx.strokeStyle = '#FF3300';
        ctx.shadowColor = '#FFFF00';
        ctx.shadowBlur = 25;
        ctx.lineWidth = 12;
        ctx.beginPath();
        // Horizontal bar
        ctx.moveTo(targetX - 40, targetY);
        ctx.lineTo(targetX + 40, targetY);
        // Vertical hook & legs
        ctx.moveTo(targetX, targetY - 40);
        ctx.lineTo(targetX, targetY + 20);
        ctx.lineTo(targetX - 35, targetY + 50);
        ctx.moveTo(targetX, targetY + 20);
        ctx.lineTo(targetX + 35, targetY + 50);
        ctx.stroke();
        ctx.restore();
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🌊 WATER: HYDRO PUMP & SURF ===
  async playWaterVfx(startX, startY, targetX, targetY) {
    this.screenShake(6, 450);
    const ctx = this.ctx;
    const waves = [];

    for (let i = 0; i < 20; i++) {
      waves.push({
        x: startX,
        y: startY,
        progress: 0,
        speed: 0.06 + Math.random() * 0.04,
        spread: (Math.random() - 0.5) * 35
      });
    }

    for (let frame = 0; frame < 20; frame++) {
      this.clear();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#63B3ED';

      waves.forEach(w => {
        w.progress = Math.min(1, w.progress + w.speed);
        const curX = startX + (targetX - startX) * w.progress + w.spread * Math.sin(w.progress * Math.PI);
        const curY = startY + (targetY - startY) * w.progress + w.spread * Math.cos(w.progress * Math.PI);

        ctx.fillStyle = w.progress > 0.8 ? '#EBF8FF' : '#3182CE';
        ctx.beginPath();
        ctx.arc(curX, curY, 12 + w.progress * 18, 0, Math.PI * 2);
        ctx.fill();
      });

      // Impact splash rings at target
      if (frame > 10) {
        ctx.strokeStyle = '#90CDF4';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(targetX, targetY + 20, (frame - 10) * 6, (frame - 10) * 3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🍃 GRASS: LEAF BLADE & SOLAR BEAM ===
  async playGrassVfx(startX, startY, targetX, targetY) {
    this.screenShake(5, 400);
    const ctx = this.ctx;
    const leaves = [];

    for (let i = 0; i < 30; i++) {
      leaves.push({
        x: startX + (Math.random() - 0.5) * 40,
        y: startY + (Math.random() - 0.5) * 40,
        vx: (targetX - startX) / 12 + (Math.random() - 0.5) * 8,
        vy: (targetY - startY) / 12 + (Math.random() - 0.5) * 8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: 0.2 + Math.random() * 0.2
      });
    }

    for (let frame = 0; frame < 18; frame++) {
      this.clear();
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#68D391';

      // Giant Emerald Slash across target
      if (frame >= 8 && frame <= 14) {
        ctx.save();
        ctx.strokeStyle = '#48BB78';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(targetX - 60, targetY - 60);
        ctx.lineTo(targetX + 60, targetY + 60);
        ctx.stroke();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();
      }

      // Swirling Razor Leaves
      leaves.forEach(l => {
        l.x += l.vx;
        l.y += l.vy;
        l.rot += l.rotSpeed;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rot);
        ctx.fillStyle = '#38A169';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === ❄️ ICE: ICE BEAM & BLIZZARD ===
  async playIceVfx(startX, startY, targetX, targetY) {
    this.screenShake(6, 450);
    const ctx = this.ctx;

    for (let frame = 0; frame < 18; frame++) {
      this.clear();
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#BEE3F8';

      // Jagged Cyan Frost Beam
      ctx.strokeStyle = '#63B3ED';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const steps = 7;
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const px = startX + (targetX - startX) * t + (Math.random() - 0.5) * 20;
        const py = startY + (targetY - startY) * t + (Math.random() - 0.5) * 20;
        ctx.lineTo(px, py);
      }
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Core white beam
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Frost iceberg encasing target
      if (frame > 6) {
        ctx.fillStyle = 'rgba(190, 227, 248, 0.75)';
        ctx.beginPath();
        ctx.moveTo(targetX, targetY - 50);
        ctx.lineTo(targetX + 35, targetY);
        ctx.lineTo(targetX + 25, targetY + 40);
        ctx.lineTo(targetX - 25, targetY + 40);
        ctx.lineTo(targetX - 35, targetY);
        ctx.closePath();
        ctx.fill();
      }

      await new Promise(r => setTimeout(r, 25));
    }
    this.clear();
  }

  // === 🐉 DRAGON: DRAGON CLAW & DRACO METEOR ===
  async playDragonVfx(startX, startY, targetX, targetY) {
    this.screenShake(9, 500);
    const ctx = this.ctx;

    for (let frame = 0; frame < 18; frame++) {
      this.clear();
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#805AD5';

      // Giant Glowing Dragon Claws (3 lacerations)
      const offsets = [-20, 0, 20];
      offsets.forEach(off => {
        ctx.strokeStyle = '#9F7AEA';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(targetX - 50 + off, targetY - 60);
        ctx.lineTo(targetX + 50 + off, targetY + 60);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      await new Promise(r => setTimeout(r, 24));
    }
    this.clear();
  }

  // === 🔮 GHOST / DARK: SHADOW BALL & DARK PULSE ===
  async playDarkGhostVfx(startX, startY, targetX, targetY) {
    this.screenShake(8, 450);
    const ctx = this.ctx;

    for (let frame = 0; frame < 20; frame++) {
      this.clear();
      const t = frame / 20;
      const curX = startX + (targetX - startX) * t;
      const curY = startY + (targetY - startY) * t;

      // Swirling Shadow Sphere
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#6B46C1';
      ctx.fillStyle = '#2D3748';
      ctx.beginPath();
      ctx.arc(curX, curY, 20 + frame * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Outer purple ring
      ctx.strokeStyle = '#9F7AEA';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Tendrils
      for (let i = 0; i < 4; i++) {
        const ang = (frame * 0.4) + (i * Math.PI / 2);
        ctx.beginPath();
        ctx.arc(curX + Math.cos(ang) * 25, curY + Math.sin(ang) * 25, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 💖 PSYCHIC: PSYSTRIKE & PSYCHIC ===
  async playPsychicVfx(startX, startY, targetX, targetY) {
    this.screenShake(6, 400);
    const ctx = this.ctx;

    for (let frame = 0; frame < 18; frame++) {
      this.clear();
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ED64A6';

      // Expanding Telekinetic Distortion Rings
      for (let r = 1; r <= 3; r++) {
        const radius = ((frame * 6) + (r * 18)) % 80;
        ctx.strokeStyle = `rgba(237, 100, 166, ${1 - radius / 80})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🪨 ROCK / GROUND: EARTHQUAKE & STONE EDGE ===
  async playRockGroundVfx(targetX, targetY) {
    this.screenShake(12, 600);
    const ctx = this.ctx;

    for (let frame = 0; frame < 20; frame++) {
      this.clear();
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#744210';

      // Jagged Earthen Stone Pillars rising
      const pillarCount = 5;
      for (let i = 0; i < pillarCount; i++) {
        const px = targetX - 60 + (i * 30);
        const height = Math.min(65, (frame * 5) - (Math.abs(i - 2) * 8));
        if (height > 0) {
          ctx.fillStyle = '#975A16';
          ctx.beginPath();
          ctx.moveTo(px - 12, targetY + 30);
          ctx.lineTo(px, targetY + 30 - height);
          ctx.lineTo(px + 12, targetY + 30);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#D69E2E';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🔩 STEEL: FLASH CANNON & GIGATON HAMMER ===
  async playSteelVfx(startX, startY, targetX, targetY) {
    this.screenShake(9, 450);
    const ctx = this.ctx;

    for (let frame = 0; frame < 16; frame++) {
      this.clear();
      // Metallic laser beam
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#E2E8F0';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 14;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Outer silver halo
      ctx.strokeStyle = '#A0AEC0';
      ctx.lineWidth = 22;
      ctx.stroke();

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === ✨ FAIRY: MOONBLAST ===
  async playFairyVfx(startX, startY, targetX, targetY) {
    this.screenShake(6, 450);
    const ctx = this.ctx;

    for (let frame = 0; frame < 20; frame++) {
      this.clear();

      // Giant Radiant Moon behind user
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#FEB2B2';
      ctx.fillStyle = '#FED7D7';
      ctx.beginPath();
      ctx.arc(startX, startY - 20, 45, 0, Math.PI * 2);
      ctx.fill();

      // Star comets firing to target
      ctx.fillStyle = '#FFF5F5';
      const t = frame / 20;
      const px = startX + (targetX - startX) * t;
      const py = startY + (targetY - startY) * t;
      ctx.beginPath();
      ctx.arc(px, py, 16, 0, Math.PI * 2);
      ctx.fill();

      await new Promise(r => setTimeout(r, 22));
    }
    this.clear();
  }

  // === 🥊 PHYSICAL: TACKLE / CLOSE COMBAT / SLASH ===
  async playPhysicalHitVfx(targetX, targetY) {
    this.screenShake(6, 300);
    const ctx = this.ctx;

    for (let frame = 0; frame < 12; frame++) {
      this.clear();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFF';

      // Impact starburst
      const count = 8;
      for (let i = 0; i < count; i++) {
        const ang = (i * Math.PI * 2) / count;
        const len = frame * 4;
        ctx.strokeStyle = '#F7FAFC';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetX + Math.cos(ang) * len, targetY + Math.sin(ang) * len);
        ctx.stroke();
      }

      await new Promise(r => setTimeout(r, 20));
    }
    this.clear();
  }

  // === 🧬 MEGA EVOLUTION ANIME TRANSFORMATION ===
  async playMegaEvolutionCutscene(targetEl) {
    this.showAnimeBanner('MEGA EVOLUTION!', 'DNA RESONANCE AWAKENING');
    this.screenShake(8, 700);
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let frame = 0; frame < 30; frame++) {
      this.clear();

      // Glowing rotating DNA helix symbol
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frame * 0.15);
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ED64A6';

      // Left DNA strand
      ctx.strokeStyle = '#4299E1';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(-25, 0, 45, 0, Math.PI * 2);
      ctx.stroke();

      // Right DNA strand
      ctx.strokeStyle = '#ED64A6';
      ctx.beginPath();
      ctx.arc(25, 0, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Expanding rainbow aura ring
      ctx.strokeStyle = `hsl(${frame * 12}, 100%, 65%)`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, frame * 10, 0, Math.PI * 2);
      ctx.stroke();

      await new Promise(r => setTimeout(r, 25));
    }
    this.clear();
  }

  // === ☁️ DYNAMAX / G-MAX ANIME TRANSFORMATION ===
  async playDynamaxCutscene(targetEl) {
    this.showAnimeBanner('DYNAMAX / G-MAX!', 'POWER SPOT ERUPTION');
    this.screenShake(14, 1000);
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let frame = 0; frame < 32; frame++) {
      this.clear();

      // Red Dynamax energy geyser rising from bottom
      ctx.fillStyle = 'rgba(229, 62, 62, 0.4)';
      ctx.beginPath();
      ctx.moveTo(centerX - 80, this.canvas.height);
      ctx.lineTo(centerX + 80, this.canvas.height);
      ctx.lineTo(centerX + 40, centerY - 60);
      ctx.lineTo(centerX - 40, centerY - 60);
      ctx.closePath();
      ctx.fill();

      // Crimson storm clouds orbiting above
      ctx.fillStyle = '#742A2A';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#E53E3E';
      for (let c = 0; c < 3; c++) {
        const ang = (frame * 0.1) + (c * (Math.PI * 2 / 3));
        const cx = centerX + Math.cos(ang) * 60;
        const cy = centerY - 90 + Math.sin(ang) * 20;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 26, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      await new Promise(r => setTimeout(r, 25));
    }
    this.clear();
  }
}

export const AnimeVfx = new AnimeVfxEngine();
