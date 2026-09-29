/**
 * Audio Ambiance System (Web Audio API)
 * Tạo âm thanh sân vườn buổi sớm & tiếng chim cu gáy gù tự nhiên không cần file âm thanh ngoài.
 */

class DoveAmbiance {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.noiseNode = null;
    this.noiseGain = null;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    this.isPlaying = true;
    this.startGentleWind();
    this.scheduleDoveCalls();
  }

  stop() {
    this.isPlaying = false;
    if (this.noiseGain) {
      try {
        this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      } catch (e) {}
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // Tiếng gió thoảng qua rặng tre (Pink/Brown noise nhẹ nhàng)
  startGentleWind() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.noiseGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

    whiteNoise.connect(filter);
    filter.connect(this.noiseGain);
    this.noiseGain.connect(this.ctx.destination);
    whiteNoise.start(0);
    this.noiseNode = whiteNoise;
  }

  // Mô phỏng tiếng gáy cu gáy: "Cục cù... cu... cục cù cù cu"
  playDoveCoo() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // Chuỗi nốt cu gáy giọng thổ (tần số khoảng 420Hz - 540Hz)
    const notes = [
      { time: 0.0, dur: 0.18, freqStart: 420, freqEnd: 460, gain: 0.15 }, // Cục
      { time: 0.28, dur: 0.45, freqStart: 530, freqEnd: 480, gain: 0.22 }, // Cù
      { time: 0.85, dur: 0.65, freqStart: 510, freqEnd: 440, gain: 0.25 }, // Cuuu
      { time: 1.8, dur: 0.18, freqStart: 430, freqEnd: 470, gain: 0.16 }, // Cục
      { time: 2.1, dur: 0.40, freqStart: 520, freqEnd: 470, gain: 0.23 }, // Cù
      { time: 2.6, dur: 0.38, freqStart: 510, freqEnd: 460, gain: 0.22 }, // Cù
      { time: 3.1, dur: 0.70, freqStart: 500, freqEnd: 430, gain: 0.24 }  // Cuuu
    ];

    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.freqStart, now + note.time);
      osc.frequency.exponentialRampToValueAtTime(note.freqEnd, now + note.time + note.dur);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now + note.time);

      gain.gain.setValueAtTime(0.0001, now + note.time);
      gain.gain.linearRampToValueAtTime(note.gain, now + note.time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur + 0.05);
    });
  }

  scheduleDoveCalls() {
    if (!this.isPlaying) return;
    this.playDoveCoo();
    // Lặp lại sau mỗi 8 - 14 giây tự nhiên
    const nextInterval = 8000 + Math.random() * 6000;
    this.timer = setTimeout(() => {
      this.scheduleDoveCalls();
    }, nextInterval);
  }
}

window.doveAmbiance = new DoveAmbiance();
