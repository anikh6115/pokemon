// Web Audio API Chiptune Synth Engine
// Provides authentic 8-bit / 16-bit sound effects and procedural background music

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentMusic = null;
    this.musicTimer = null;
    this.volume = 0.25;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    return this.isMuted;
  }

  // Generate basic tone
  playTone(freq, type = 'square', duration = 0.1, gainVal = 0.2, detune = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  // === SOUND EFFECTS ===
  playBlip() {
    this.playTone(880, 'square', 0.04, 0.15);
  }

  playSelect() {
    this.playTone(523.25, 'triangle', 0.08, 0.2);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.08, 0.2), 40);
  }

  playCancel() {
    this.playTone(400, 'square', 0.08, 0.2);
    setTimeout(() => this.playTone(280, 'square', 0.08, 0.2), 50);
  }

  playBump() {
    this.playTone(110, 'sawtooth', 0.08, 0.25);
  }

  playHit(isSuperEffective = false) {
    if (isSuperEffective) {
      this.playTone(150, 'sawtooth', 0.2, 0.4);
      setTimeout(() => this.playTone(110, 'square', 0.25, 0.5), 60);
      setTimeout(() => this.playTone(80, 'sawtooth', 0.3, 0.4), 120);
    } else {
      this.playTone(220, 'triangle', 0.12, 0.3);
      setTimeout(() => this.playTone(140, 'sawtooth', 0.15, 0.25), 50);
    }
  }

  playFaint() {
    this.playTone(300, 'sawtooth', 0.15, 0.3);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.2, 0.3), 100);
    setTimeout(() => this.playTone(160, 'sawtooth', 0.25, 0.3), 200);
    setTimeout(() => this.playTone(110, 'sawtooth', 0.35, 0.3), 300);
  }

  playPokeballThrow() {
    this.playTone(440, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(660, 'sine', 0.12, 0.2), 80);
    setTimeout(() => this.playTone(880, 'sine', 0.15, 0.2), 160);
  }

  playPokeballShake() {
    this.playTone(330, 'square', 0.08, 0.2);
    setTimeout(() => this.playTone(293, 'square', 0.08, 0.2), 60);
  }

  playCatchSuccess() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.2, 0.3), idx * 120);
    });
  }

  playLevelUp() {
    const notes = [440, 554, 659, 880, 784, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'square', 0.15, 0.25), idx * 100);
    });
  }

  playMegaEvolution() {
    // Shimmering ascending cosmic arpeggio
    const freqs = [220, 330, 440, 550, 660, 880, 1100, 1320, 1760];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.25, 0.3), i * 60);
    });
  }

  playZMove() {
    // Powerful cosmic blast
    this.playTone(130, 'sawtooth', 0.4, 0.5);
    setTimeout(() => this.playTone(400, 'square', 0.2, 0.4), 80);
    setTimeout(() => this.playTone(800, 'sine', 0.3, 0.4), 160);
    setTimeout(() => this.playTone(1200, 'sine', 0.4, 0.4), 240);
    setTimeout(() => this.playTone(90, 'sawtooth', 0.5, 0.6), 320);
  }

  playDynamax() {
    // Deep thunderous sub-bass explosion
    this.playTone(65, 'sawtooth', 0.6, 0.6);
    setTimeout(() => this.playTone(82, 'triangle', 0.5, 0.5), 100);
    setTimeout(() => this.playTone(110, 'square', 0.4, 0.4), 200);
  }

  playHeal() {
    const notes = [659, 659, 659, 523, 659, 784, 392];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.18, 0.3), idx * 140);
    });
  }

  playSaveFanfare() {
    // Classic Pokémon Emerald Save Chime
    this.playTone(523.25, 'sine', 0.12, 0.25); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.12, 0.25), 90); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.15, 0.3), 180); // G5
    setTimeout(() => this.playTone(1046.50, 'triangle', 0.28, 0.35), 280); // C6
  }

  // === BACKGROUND MUSIC CHIPTUNE LOOPS ===
  playMusic(trackName) {
    if (this.currentMusic === trackName && this.musicTimer) return;
    this.currentMusic = trackName;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.isMuted) return;

    let step = 0;
    // Chiptune melodies for different situations
    const tracks = {
      route: [
        { f: 330, d: 0.15 }, { f: 392, d: 0.15 }, { f: 440, d: 0.2 }, { f: 392, d: 0.15 },
        { f: 330, d: 0.15 }, { f: 294, d: 0.2 }, { f: 330, d: 0.2 }, { f: 392, d: 0.25 }
      ],
      city: [
        { f: 261, d: 0.2 }, { f: 329, d: 0.2 }, { f: 392, d: 0.2 }, { f: 523, d: 0.3 },
        { f: 440, d: 0.2 }, { f: 392, d: 0.2 }, { f: 349, d: 0.2 }, { f: 329, d: 0.3 }
      ],
      battle: [
        { f: 164, d: 0.1 }, { f: 164, d: 0.1 }, { f: 196, d: 0.12 }, { f: 220, d: 0.1 },
        { f: 164, d: 0.1 }, { f: 246, d: 0.1 }, { f: 220, d: 0.12 }, { f: 196, d: 0.15 },
        { f: 329, d: 0.1 }, { f: 293, d: 0.1 }, { f: 329, d: 0.15 }, { f: 392, d: 0.18 }
      ],
      champion: [
        { f: 220, d: 0.1 }, { f: 247, d: 0.1 }, { f: 261, d: 0.1 }, { f: 330, d: 0.2 },
        { f: 440, d: 0.2 }, { f: 392, d: 0.15 }, { f: 330, d: 0.15 }, { f: 261, d: 0.2 }
      ]
    };

    const track = tracks[trackName] || tracks.route;
    const intervalMs = 240;

    this.musicTimer = setInterval(() => {
      if (this.isMuted) return;
      const note = track[step % track.length];
      this.playTone(note.f, 'triangle', note.d, 0.12);
      // Subtle bass companion
      if (step % 2 === 0) {
        this.playTone(note.f / 2, 'sawtooth', 0.18, 0.08);
      }
      step++;
    }, intervalMs);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.currentMusic = null;
  }
}

export const Sound = new SoundEngine();
