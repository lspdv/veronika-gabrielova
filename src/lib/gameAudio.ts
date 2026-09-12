/**
 * Tiny chiptune engine for the easter-egg game. Everything is synthesised
 * with the Web Audio API  -  no audio assets. Must be started from a user
 * gesture (browsers block AudioContext otherwise).
 */
export type GameAudio = {
  /** Resume the context and start the background loop. */
  start(): void;
  /** Stop the background loop (one-shots still work). */
  stop(): void;
  dodge(): void;
  crash(): void;
  setMuted(muted: boolean): void;
  dispose(): void;
};

const STEP = 0.11; // seconds per 16th note (~136 BPM)
/** MIDI note numbers, 0 = rest. 32 sixteenths = 2 bars. */
const LEAD = [
  76, 78, 80, 76, 83, 80, 78, 76, 78, 80, 81, 80, 78, 76, 75, 76, 80, 83, 85, 83, 80, 78, 76, 78,
  80, 78, 76, 75, 76, 0, 76, 0,
];
/** One bass note per 8th (16 per loop). */
const BASS = [52, 52, 59, 59, 57, 57, 64, 64, 54, 54, 61, 61, 56, 56, 59, 59];

const midi = (n: number) => 440 * 2 ** ((n - 69) / 12);

export function createGameAudio(initialMuted: boolean): GameAudio {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let noise: AudioBuffer | null = null;
  let timer: number | null = null;
  let step = 0;
  let nextTime = 0;
  let muted = initialMuted;

  function ensure() {
    if (ctx) return ctx;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 0.5);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function tone(
    type: OscillatorType,
    freq: number,
    at: number,
    dur: number,
    peak: number,
    glideTo?: number,
  ) {
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(gain).connect(master);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  function hat(at: number, dur: number, peak: number, cutoff: number, cutoffTo?: number) {
    if (!ctx || !master || !noise) return;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = cutoffTo ? "lowpass" : "highpass";
    filter.frequency.setValueAtTime(cutoff, at);
    if (cutoffTo) filter.frequency.exponentialRampToValueAtTime(cutoffTo, at + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(filter).connect(gain).connect(master);
    src.start(at);
    src.stop(at + dur + 0.02);
  }

  function playStep(i: number, at: number) {
    const lead = LEAD[i];
    if (lead) tone("square", midi(lead), at, STEP * 0.9, 0.045);
    if (i % 2 === 0) tone("triangle", midi(BASS[i / 2]), at, STEP * 1.8, 0.09);
    if (i % 4 === 2) hat(at, 0.03, 0.02, 6000);
  }

  function schedule() {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 0.2) {
      playStep(step, nextTime);
      nextTime += STEP;
      step = (step + 1) % LEAD.length;
    }
  }

  return {
    start() {
      const c = ensure();
      if (c.state === "suspended") void c.resume();
      if (timer !== null) return;
      step = 0;
      nextTime = c.currentTime + 0.05;
      schedule();
      timer = window.setInterval(schedule, 60);
    },
    stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    },
    dodge() {
      const c = ensure();
      tone("square", 880, c.currentTime, 0.12, 0.12, 1760);
    },
    crash() {
      const c = ensure();
      const at = c.currentTime;
      hat(at, 0.45, 0.35, 2400, 120);
      tone("sawtooth", 220, at, 0.5, 0.18, 40);
    },
    setMuted(m: boolean) {
      muted = m;
      if (ctx && master) master.gain.setTargetAtTime(m ? 0 : 1, ctx.currentTime, 0.02);
    },
    dispose() {
      this.stop();
      void ctx?.close();
      ctx = null;
      master = null;
    },
  };
}
