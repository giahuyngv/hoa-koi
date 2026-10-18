// Procedural Japanese Acoustic Sound & Chill BGM Engine (Web Audio API)
// Synthesizes:
// 1. Relaxing Japanese Chill Background Music (Koto, Shakuhachi bamboo flute, Warm Washitsu Pad, Furin wind chimes, Edo Lo-Fi)
// 2. Hanafuda card snaps ("Pachin!"), Koto pentatonic chimes, Kabuki Hyoshigi clappers, and Taiko drums.

export const BGM_TRACKS = [
  {
    id: 'sakura_washitsu',
    name: '🌸 Trà Thất Anh Đào',
    subtitle: 'Koto & Sáo Trúc Shakuhachi êm dịu',
    stepMs: 430
  },
  {
    id: 'tsukimi_bamboo',
    name: '🌕 Trăng Thu Rừng Trúc',
    subtitle: 'Hirajoshi Thiền Tịnh & Chuông Gió Furin',
    stepMs: 490
  },
  {
    id: 'kyoto_lofi',
    name: '🍵 Quán Trà Edo Lo-Fi',
    subtitle: 'Giai điệu Koto Chill & Nhịp Lo-Fi ấm áp',
    stepMs: 390
  }
];

const BGM_ENABLED_STORAGE_KEY = 'hanakoi_bgm_enabled';
const SFX_ENABLED_STORAGE_KEY = 'hanakoi_sfx_enabled';

function readAudioPref(key) {
  try {
    return localStorage.getItem(key) !== '0';
  } catch {
    return true;
  }
}

function writeAudioPref(key, enabled) {
  try {
    localStorage.setItem(key, enabled ? '1' : '0');
  } catch {
    // Ignore storage errors
  }
}

class SoundEngine {
  constructor() {
    this.ctx = null;
    // Nhạc nền (BGM) và hiệu ứng âm thanh (SFX + giọng nhân vật) bật/tắt độc lập
    this.bgmEnabled = readAudioPref(BGM_ENABLED_STORAGE_KEY);
    this.sfxEnabled = readAudioPref(SFX_ENABLED_STORAGE_KEY);
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.currentTrackIndex = 0;
    this.bgmVolume = 0.42;

    // Audio bus nodes for lush Japanese room reverb/delay
    this.bgmMasterGain = null;
    this.bgmDryGain = null;
    this.bgmWetNode = null;

    // Traditional Japanese Hirajoshi / Yo pentatonic scale frequencies
    this.kotoScale = [293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  }

  // Tắt hết cả nhạc nền lẫn SFX
  get muted() {
    return !this.bgmEnabled && !this.sfxEnabled;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.setupBgmBus(this.ctx);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Context dành cho SFX: trả về null khi SFX đang tắt
  sfxContext() {
    if (!this.sfxEnabled) return null;
    return this.ensureContext();
  }

  /**
   * Creates a warm stereo echo/reverb acoustic space for the BGM instruments
   */
  setupBgmBus(ctx) {
    this.bgmMasterGain = ctx.createGain();
    this.bgmMasterGain.gain.setValueAtTime(this.bgmVolume, ctx.currentTime);
    this.bgmMasterGain.connect(ctx.destination);

    this.bgmDryGain = ctx.createGain();
    this.bgmDryGain.gain.setValueAtTime(0.85, ctx.currentTime);
    this.bgmDryGain.connect(this.bgmMasterGain);

    // Lush warm echo loop (simulates wooden Washitsu / garden acoustics)
    const delay1 = ctx.createDelay(1.0);
    const delay2 = ctx.createDelay(1.0);
    delay1.delayTime.setValueAtTime(0.36, ctx.currentTime);
    delay2.delayTime.setValueAtTime(0.54, ctx.currentTime);

    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(0.34, ctx.currentTime);

    const dampFilter = ctx.createBiquadFilter();
    dampFilter.type = 'lowpass';
    dampFilter.frequency.setValueAtTime(1650, ctx.currentTime);

    const wetGain = ctx.createGain();
    wetGain.gain.setValueAtTime(0.42, ctx.currentTime);

    delay1.connect(dampFilter);
    dampFilter.connect(delay2);
    delay2.connect(feedback);
    feedback.connect(delay1);

    dampFilter.connect(wetGain);
    delay2.connect(wetGain);
    wetGain.connect(this.bgmMasterGain);

    this.bgmWetNode = delay1;
  }

  connectToBgmSpace(node) {
    if (!this.bgmDryGain || !this.bgmWetNode) return;
    node.connect(this.bgmDryGain);
    node.connect(this.bgmWetNode);
  }

  getCurrentTrack() {
    return BGM_TRACKS[this.currentTrackIndex] || BGM_TRACKS[0];
  }

  cycleTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % BGM_TRACKS.length;
    this.bgmStep = 0;
    this.bgmEnabled = true;
    writeAudioPref(BGM_ENABLED_STORAGE_KEY, true);
    this.startBgm();
    this.restartBgmLoop();
    // Play a gentle Koto confirmation chord
    this.playKotoNote(440, 0, 0.5, 0.09);
    this.playKotoNote(659.25, 0.06, 0.6, 0.09);
    return this.getCurrentTrack();
  }

  toggleBgm() {
    this.bgmEnabled = !this.bgmEnabled;
    writeAudioPref(BGM_ENABLED_STORAGE_KEY, this.bgmEnabled);
    if (this.bgmEnabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
    return this.bgmEnabled;
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    writeAudioPref(SFX_ENABLED_STORAGE_KEY, this.sfxEnabled);
    if (!this.sfxEnabled && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    return this.sfxEnabled;
  }

  startBgm() {
    if (!this.bgmEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (this.bgmPlaying && this.bgmTimer) return;
    this.bgmPlaying = true;

    if (this.bgmMasterGain) {
      const now = ctx.currentTime;
      this.bgmMasterGain.gain.cancelScheduledValues(now);
      this.bgmMasterGain.gain.setValueAtTime(0.01, now);
      this.bgmMasterGain.gain.linearRampToValueAtTime(this.bgmVolume, now + 1.2);
    }

    this.restartBgmLoop();
  }

  restartBgmLoop() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (!this.bgmEnabled) {
      this.bgmPlaying = false;
      return;
    }
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.bgmPlaying = true;
    const track = this.getCurrentTrack();
    // Play first step immediately
    this.tickBgmStep();
    this.bgmTimer = setInterval(() => {
      this.tickBgmStep();
    }, track.stepMs);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.ctx && this.bgmMasterGain) {
      const now = this.ctx.currentTime;
      this.bgmMasterGain.gain.cancelScheduledValues(now);
      this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, now);
      this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    }
  }

  /**
   * Sequencer tick for the 3 Japanese Chill BGM tracks (32-step cycle = 4 bars of 8 steps)
   */
  tickBgmStep() {
    if (!this.bgmEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx || ctx.state !== 'running') return;

    const step = this.bgmStep % 32;
    this.bgmStep++;

    const trackId = this.getCurrentTrack().id;
    if (trackId === 'sakura_washitsu') {
      this.playSakuraWashitsuStep(step);
    } else if (trackId === 'tsukimi_bamboo') {
      this.playTsukimiBambooStep(step);
    } else {
      this.playKyotoLofiStep(step);
    }
  }

  /**
   * Track 1: 🌸 Trà Thất Anh Đào (Sakura Washitsu Chill)
   * Warm Japanese Yo pentatonic in G / D major-pentatonic with Koto arpeggios & Shakuhachi flute
   */
  playSakuraWashitsuStep(step) {
    // 1. Warm Washitsu Pad Chords at the start of each 8-step bar
    if (step === 0) {
      // Gmaj7 warm pad
      this.playBgmWarmPad([196.00, 293.66, 369.99, 493.88], 3.4, 0.085);
    } else if (step === 8) {
      // Asus4 / F#m7 warm pad
      this.playBgmWarmPad([220.00, 293.66, 369.99, 440.00], 3.4, 0.085);
    } else if (step === 16) {
      // Em9 warm pad
      this.playBgmWarmPad([164.81, 246.94, 293.66, 392.00], 3.4, 0.085);
    } else if (step === 24) {
      // Dadd9 warm pad
      this.playBgmWarmPad([146.83, 220.00, 293.66, 329.63, 369.99], 3.4, 0.085);
    }

    // 2. Expressive Koto Plucked Pattern (D4=293.66, E4=329.63, F#4=369.99, G4=392.00, A4=440.00, B4=493.88, D5=587.33, E5=659.25, G5=783.99, A5=880.00)
    const kotoPattern = {
      0:  { f: 293.66, dur: 1.5, v: 0.11 },
      1:  { f: 392.00, dur: 1.4, v: 0.09 },
      2:  { f: 440.00, dur: 1.4, v: 0.10 },
      3:  { f: 493.88, dur: 1.6, v: 0.11 },
      5:  { f: 587.33, dur: 1.8, v: 0.12 },
      6:  { f: 493.88, dur: 1.2, v: 0.08 },
      7:  { f: 440.00, dur: 1.3, v: 0.09 },

      8:  { f: 329.63, dur: 1.5, v: 0.10 },
      10: { f: 440.00, dur: 1.4, v: 0.10 },
      11: { f: 493.88, dur: 1.4, v: 0.09 },
      12: { f: 659.25, dur: 1.9, v: 0.11 },
      14: { f: 587.33, dur: 1.5, v: 0.10 },
      15: { f: 440.00, dur: 1.2, v: 0.08 },

      16: { f: 246.94, dur: 1.6, v: 0.10 },
      17: { f: 329.63, dur: 1.4, v: 0.09 },
      18: { f: 392.00, dur: 1.5, v: 0.10 },
      19: { f: 493.88, dur: 1.7, v: 0.11 },
      21: { f: 659.25, dur: 1.6, v: 0.11 },
      22: { f: 587.33, dur: 1.4, v: 0.09 },
      23: { f: 493.88, dur: 1.3, v: 0.08 },

      24: { f: 293.66, dur: 1.7, v: 0.11 },
      25: { f: 369.99, dur: 1.4, v: 0.09 },
      26: { f: 440.00, dur: 1.5, v: 0.10 },
      27: { f: 587.33, dur: 1.8, v: 0.11 },
      29: { f: 493.88, dur: 1.4, v: 0.09 },
      30: { f: 440.00, dur: 1.5, v: 0.09 },
      31: { f: 392.00, dur: 1.5, v: 0.08 }
    };

    const note = kotoPattern[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    // 3. Gentle Shakuhachi Bamboo Flute phrases
    if (step === 4) {
      this.playBgmShakuhachi(587.33, 554.37, 2.1, 0.075);
    } else if (step === 13) {
      this.playBgmShakuhachi(659.25, 587.33, 1.9, 0.07);
    } else if (step === 20) {
      this.playBgmShakuhachi(493.88, 440.00, 2.2, 0.075);
    } else if (step === 28) {
      this.playBgmShakuhachi(440.00, 392.00, 2.0, 0.07);
    }

    // 4. Delicate Furin glass wind chime shimmer
    if (step === 7 || step === 23) {
      if (Math.random() < 0.75) {
        this.playBgmFurinChime(1174.66, 0.032);
      }
    }
  }

  /**
   * Track 2: 🌕 Trăng Thu Rừng Trúc (Tsukimi Bamboo Forest)
   * Contemplative Japanese Hirajoshi pentatonic scale (A, B, C, E, F) with deep bamboo flute & night chimes
   */
  playTsukimiBambooStep(step) {
    // 1. Deep Moonlight Ambient Pads
    if (step === 0) {
      // Am9
      this.playBgmWarmPad([110.00, 220.00, 261.63, 329.63, 493.88], 3.8, 0.085);
    } else if (step === 8) {
      // Fmaj7#11
      this.playBgmWarmPad([174.61, 261.63, 329.63, 440.00, 493.88], 3.8, 0.085);
    } else if (step === 16) {
      // Dm9
      this.playBgmWarmPad([146.83, 220.00, 261.63, 329.63, 349.23], 3.8, 0.085);
    } else if (step === 24) {
      // Esus4 -> E7 peaceful resolution
      this.playBgmWarmPad([164.81, 246.94, 329.63, 440.00], 3.8, 0.08);
    }

    // 2. Hirajoshi Koto Plucks (A3=220, B3=246.94, C4=261.63, E4=329.63, F4=349.23, A4=440, B4=493.88, C5=523.25, E5=659.25, F5=698.46, A5=880)
    const hirajoshiPattern = {
      0:  { f: 220.00, dur: 1.8, v: 0.11 },
      2:  { f: 329.63, dur: 1.6, v: 0.10 },
      3:  { f: 349.23, dur: 1.5, v: 0.09 },
      4:  { f: 440.00, dur: 1.9, v: 0.11 },
      6:  { f: 523.25, dur: 1.7, v: 0.10 },
      7:  { f: 493.88, dur: 1.5, v: 0.09 },

      8:  { f: 261.63, dur: 1.8, v: 0.10 },
      10: { f: 349.23, dur: 1.6, v: 0.09 },
      11: { f: 440.00, dur: 1.6, v: 0.10 },
      12: { f: 659.25, dur: 2.1, v: 0.11 },
      14: { f: 523.25, dur: 1.6, v: 0.09 },

      16: { f: 293.66, dur: 1.8, v: 0.10 },
      18: { f: 349.23, dur: 1.5, v: 0.09 },
      19: { f: 440.00, dur: 1.6, v: 0.10 },
      20: { f: 523.25, dur: 1.9, v: 0.11 },
      22: { f: 493.88, dur: 1.6, v: 0.09 },
      23: { f: 329.63, dur: 1.5, v: 0.08 },

      24: { f: 246.94, dur: 1.8, v: 0.10 },
      26: { f: 329.63, dur: 1.6, v: 0.10 },
      27: { f: 493.88, dur: 1.7, v: 0.10 },
      28: { f: 440.00, dur: 2.2, v: 0.11 },
      30: { f: 329.63, dur: 1.6, v: 0.09 }
    };

    const note = hirajoshiPattern[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    // 3. Soulful Shakuhachi Moonlight solo
    if (step === 3) {
      this.playBgmShakuhachi(659.25, 587.33, 2.4, 0.08);
    } else if (step === 12) {
      this.playBgmShakuhachi(523.25, 493.88, 2.2, 0.075);
    } else if (step === 20) {
      this.playBgmShakuhachi(440.00, 392.00, 2.5, 0.08);
    }

    // 4. Furin wind chime & Shishi-odoshi bamboo tap
    if (step === 15) {
      this.playBgmFurinChime(1318.51, 0.035);
    } else if (step === 31) {
      this.playBgmBambooTap(0.055);
    }
  }

  /**
   * Track 3: 🍵 Quán Trà Edo Lo-Fi (Kyoto Tea House Lo-Fi)
   * Cozy downtempo Lo-Fi pulse with jazzy Japanese pentatonic Koto & warm Rhodes chords
   */
  playKyotoLofiStep(step) {
    // 1. Cozy Lo-Fi Heartbeat Pulse (every 8-step bar: soft sub-kick on 0, 5; soft brush on 2, 6; warm wood rim on 4)
    const barStep = step % 8;
    if (barStep === 0 || barStep === 5) {
      this.playBgmLofiKick(0.13);
    }
    if (barStep === 2 || barStep === 6) {
      this.playBgmLofiBrush(0.035);
    }
    if (barStep === 4) {
      this.playBgmBambooTap(0.045);
    }

    // 2. Jazzy Lo-Fi Warm Pad Chords (Fmaj9 -> Em7 -> Dm9 -> G13sus4)
    if (step === 0) {
      this.playBgmWarmPad([174.61, 261.63, 329.63, 392.00, 440.00], 2.9, 0.09);
    } else if (step === 8) {
      this.playBgmWarmPad([164.81, 246.94, 293.66, 392.00, 493.88], 2.9, 0.09);
    } else if (step === 16) {
      this.playBgmWarmPad([146.83, 220.00, 261.63, 329.63, 392.00], 2.9, 0.09);
    } else if (step === 24) {
      this.playBgmWarmPad([196.00, 293.66, 349.23, 440.00, 523.25], 2.9, 0.09);
    }

    // 3. Chill Pentatonic Koto Lo-Fi Melody (C major / A minor pentatonic: C, D, E, G, A)
    const lofiMelody = {
      0:  { f: 523.25, dur: 1.2, v: 0.11 },
      1:  { f: 659.25, dur: 1.2, v: 0.10 },
      3:  { f: 783.99, dur: 1.5, v: 0.11 },
      5:  { f: 659.25, dur: 1.2, v: 0.09 },
      6:  { f: 587.33, dur: 1.3, v: 0.10 },

      8:  { f: 493.88, dur: 1.3, v: 0.10 },
      10: { f: 587.33, dur: 1.2, v: 0.10 },
      11: { f: 659.25, dur: 1.5, v: 0.11 },
      13: { f: 523.25, dur: 1.3, v: 0.09 },
      15: { f: 440.00, dur: 1.3, v: 0.09 },

      16: { f: 440.00, dur: 1.4, v: 0.10 },
      17: { f: 523.25, dur: 1.3, v: 0.10 },
      19: { f: 659.25, dur: 1.5, v: 0.11 },
      21: { f: 587.33, dur: 1.3, v: 0.10 },
      22: { f: 523.25, dur: 1.4, v: 0.09 },

      24: { f: 392.00, dur: 1.4, v: 0.10 },
      25: { f: 440.00, dur: 1.3, v: 0.09 },
      27: { f: 523.25, dur: 1.5, v: 0.11 },
      29: { f: 587.33, dur: 1.4, v: 0.10 },
      30: { f: 659.25, dur: 1.6, v: 0.11 }
    };

    const note = lofiMelody[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    if (step === 12 || step === 28) {
      this.playBgmShakuhachi(659.25, 587.33, 1.5, 0.065);
    }
  }

  // ==========================================================================
  // BGM INSTRUMENT SYNTHESIZERS
  // ==========================================================================

  /**
   * Warm plucked silk-string Koto with natural pitch-bend attack and lowpass resonant decay
   */
  playBgmKotoPluck(freq, duration = 1.5, volume = 0.1) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    // Subtle Koto string pluck pitch bend (starts slightly sharp, settles quickly)
    osc1.frequency.setValueAtTime(freq * 1.007, now);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.03);

    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm resonant low-pass filter that mellows out as the string rings
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.2, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.15), now + duration);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.32, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(gain);

    this.connectToBgmSpace(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  /**
   * Breath-infused Shakuhachi bamboo flute with expressive pitch glide and gentle vibrato
   */
  playBgmShakuhachi(freq, startGlideFreq, duration = 2.0, volume = 0.075) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    subOsc.type = 'triangle';

    // Expressive bamboo flute pitch glide (portamento)
    osc.frequency.setValueAtTime(startGlideFreq || freq * 0.96, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.22);
    subOsc.frequency.setValueAtTime((startGlideFreq || freq * 0.96) * 2, now);
    subOsc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.22);

    // Natural breath vibrato LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.6, now);
    lfoGain.gain.setValueAtTime(0.1, now);
    lfoGain.gain.linearRampToValueAtTime(3.2, now + duration * 0.55);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.18, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Smooth swell and gentle release
    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.35);
    gain.gain.setValueAtTime(volume * 0.9, now + duration * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    osc.connect(filter);
    subOsc.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);

    this.connectToBgmSpace(gain);

    osc.start(now);
    subOsc.start(now);
    lfo.start(now);
    osc.stop(now + duration + 0.05);
    subOsc.stop(now + duration + 0.05);
    lfo.stop(now + duration + 0.05);
  }

  /**
   * Warm Washitsu Ambient Chord Pad
   */
  playBgmWarmPad(freqs, duration = 3.4, volume = 0.08) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(580, now);

    const masterChordGain = ctx.createGain();
    const perNoteVol = volume / Math.max(1, freqs.length * 0.65);

    masterChordGain.gain.setValueAtTime(0.0005, now);
    masterChordGain.gain.linearRampToValueAtTime(perNoteVol, now + 0.9);
    masterChordGain.gain.setValueAtTime(perNoteVol * 0.85, now + duration * 0.6);
    masterChordGain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    filter.connect(masterChordGain);
    this.connectToBgmSpace(masterChordGain);

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Slight chorus detune for warmth
      osc.frequency.setValueAtTime(f * (1 + (idx - 1.5) * 0.0015), now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + duration + 0.08);
    });
  }

  /**
   * Japanese Furin (glass wind chime) high shimmer
   */
  playBgmFurinChime(freq = 1174.66, volume = 0.032) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2.41, now);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.25, now);

    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0004, now + 1.4);

    osc1.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);

    this.connectToBgmSpace(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.45);
    osc2.stop(now + 1.45);
  }

  /**
   * Soft Shishi-odoshi bamboo tap / woodblock
   */
  playBgmBambooTap(volume = 0.05) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.065);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.075);

    osc.connect(gain);
    this.connectToBgmSpace(gain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Soft muffled Lo-Fi heartbeat sub-kick
   */
  playBgmLofiKick(volume = 0.12) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(105, now);
    osc.frequency.exponentialRampToValueAtTime(44, now + 0.14);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.bgmMasterGain);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  /**
   * Soft brushed bamboo shaker for Lo-Fi groove
   */
  playBgmLofiBrush(volume = 0.03) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);
    noise.start(now);
  }

  // ==========================================================================
  // GAMEPLAY SOUND EFFECTS (SFX)
  // ==========================================================================

  /**
   * Soft paper slide when hovering or drawing a card
   */
  playCardHover() {
    const ctx = this.sfxContext();
    if (!ctx) return;
    if (this.bgmEnabled && !this.bgmPlaying) {
      this.startBgm();
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.045);
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Iconic Hanafuda "Pachin!" card slap onto the tatami mat
   */
  playCardSnap(isBright = false) {
    const ctx = this.sfxContext();
    if (!ctx) return;
    if (this.bgmEnabled && !this.bgmPlaying) {
      this.startBgm();
    }
    const now = ctx.currentTime;

    // 1. White noise burst for crisp card slap
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.28, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.06);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Wooden body thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(58, now + 0.08);
    oscGain.gain.setValueAtTime(0.25, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);

    // 3. Golden Koto harmonic if capturing a 20pt Bright (Hikari) or Sake Cup!
    if (isBright) {
      this.playKotoNote(587.33, 0.05, 0.35);
      this.playKotoNote(880.0, 0.12, 0.45);
    }
  }

  /**
   * Plucked Koto string note for UI / SFX
   */
  playKotoNote(freq = 440, delay = 0, duration = 0.55, volume = 0.14) {
    const ctx = this.sfxContext();
    if (!ctx) return;
    const start = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc2.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    osc2.frequency.setValueAtTime(freq * 2, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc2.start(start);
    osc.stop(start + duration + 0.02);
    osc2.stop(start + duration + 0.02);
  }

  /**
   * Traditional Kabuki Hyoshigi clapper + Taiko drum for "KOI-KOI!" cut-in
   */
  playKoiKoiFanfare() {
    const ctx = this.sfxContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Double Hyoshigi wooden clack ("Kaan! Kaan!")
    [0, 0.16].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2250, now + offset);
      osc.frequency.exponentialRampToValueAtTime(1650, now + offset + 0.09);
      gain.gain.setValueAtTime(0.16, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.11);
    });

    // Deep Taiko Drum boom
    const taiko = ctx.createOscillator();
    const tGain = ctx.createGain();
    taiko.type = 'sine';
    taiko.frequency.setValueAtTime(135, now + 0.02);
    taiko.frequency.exponentialRampToValueAtTime(42, now + 0.45);
    tGain.gain.setValueAtTime(0.35, now + 0.02);
    tGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    taiko.connect(tGain);
    tGain.connect(ctx.destination);
    taiko.start(now + 0.02);
    taiko.stop(now + 0.5);

    // Rising Koto glissando
    [293.66, 392.0, 440.0, 587.33, 783.99].forEach((f, idx) => {
      this.playKotoNote(f, 0.18 + idx * 0.055, 0.5, 0.12);
    });
  }

  /**
   * Celebratory Koto fanfare when declaring Shōbu / Winning a round
   */
  playShobuVictory() {
    const notes = [392.0, 440.0, 587.33, 659.25, 880.0, 1174.66];
    notes.forEach((f, idx) => {
      this.playKotoNote(f, idx * 0.075, 0.75, 0.15);
    });
  }

  /**
   * Gacha Omikuji pull & reveal chime
   */
  playGachaReveal(isHighRarity = false) {
    const seq = isHighRarity
      ? [440, 523.25, 659.25, 783.99, 880, 1046.5, 1318.5]
      : [392, 440, 587.33, 659.25, 783.99];
    seq.forEach((f, i) => {
      this.playKotoNote(f, i * 0.065, 0.6, 0.14);
    });
  }

  /**
   * Speaks a character's teasing / pouting / praising line in Japanese (via Web Speech API)
   * accompanied by an expressive character chime inflection.
   */
  speakCharacterLine(opponent, lineObj) {
    if (!this.sfxEnabled || !lineObj) return;
    const ctx = this.sfxContext();
    const vp = (opponent && opponent.voiceProfile) || { pitch: 1.1, rate: 1.0, baseFreq: 440 };

    // 1. Play a cute/expressive Visual Novel vocal inflection chime
    if (ctx) {
      const f = vp.baseFreq || 440;
      this.playKotoNote(f, 0, 0.28, 0.11);
      this.playKotoNote(f * 1.25, 0.09, 0.34, 0.12);
      this.playKotoNote(f * 1.5, 0.18, 0.42, 0.10);
    }

    // 2. Speak Japanese voice line via browser SpeechSynthesis if available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const voices = window.speechSynthesis.getVoices() || [];
        const jpVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ja'));
        const viVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));

        const utter = new SpeechSynthesisUtterance(
          jpVoice ? lineObj.jp : viVoice ? lineObj.vi : lineObj.jp
        );
        if (jpVoice) {
          utter.voice = jpVoice;
          utter.lang = 'ja-JP';
        } else if (viVoice) {
          utter.voice = viVoice;
          utter.lang = 'vi-VN';
        } else {
          utter.lang = 'ja-JP';
        }
        utter.pitch = vp.pitch || 1.1;
        utter.rate = vp.rate || 1.0;
        utter.volume = 0.9;
        window.speechSynthesis.speak(utter);
      } catch (e) {
        // Ignore TTS errors on restricted browsers
      }
    }
  }
}

export const soundEngine = new SoundEngine();

