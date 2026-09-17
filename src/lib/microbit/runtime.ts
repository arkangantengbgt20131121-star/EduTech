/**
 * Runtime that drives a Micro:bit program generator and keeps the virtual
 * board state in sync. Framework-agnostic on purpose: the React component in
 * `src/components/microbit/microbit-simulator.tsx` only subscribes to it.
 */
import { createMatrix, icons, numberFrames, stringFrames, type LedMatrix } from "./glyphs";
import {
  defaultSensors,
  type MicrobitApi,
  type MicrobitProgram,
  type MicrobitSensors,
} from "./simulator";

export interface LogEntry {
  id: number;
  time: number;
  message: string;
  kind: "info" | "event" | "sound";
}

export interface RuntimeState {
  frame: LedMatrix;
  log: LogEntry[];
  sensors: MicrobitSensors;
  running: boolean;
  lastTone: string | null;
  elapsed: number;
}

type Button = "A" | "B" | "AB";

function cloneFrame(frame: LedMatrix): LedMatrix {
  return frame.map((row) => [...row]);
}

export class MicrobitRuntime {
  private frame: LedMatrix = createMatrix();
  private log: LogEntry[] = [];
  private sensors: MicrobitSensors = { ...defaultSensors };
  private listeners = new Set<(state: RuntimeState) => void>();
  private generation = 0;
  private startedAt = 0;
  private elapsedTimer: ReturnType<typeof setInterval> | null = null;
  private pendingButton: ((value: Button) => void) | null = null;
  private pendingShake: (() => void) | null = null;
  private timers = new Set<ReturnType<typeof setTimeout>>();
  private logCounter = 0;
  private lastTone: string | null = null;
  running = false;
  speed = 1;

  subscribe(listener: (state: RuntimeState) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): RuntimeState {
    return {
      frame: cloneFrame(this.frame),
      log: [...this.log],
      sensors: { ...this.sensors },
      running: this.running,
      lastTone: this.lastTone,
      elapsed: this.startedAt ? Date.now() - this.startedAt : 0,
    };
  }

  private emit() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  private setFrame(frame: LedMatrix) {
    this.frame = cloneFrame(frame);
    this.emit();
  }

  setSensor<K extends keyof MicrobitSensors>(key: K, value: MicrobitSensors[K]) {
    this.sensors = { ...this.sensors, [key]: value };
    this.emit();
  }

  addLog(message: string, kind: LogEntry["kind"] = "info") {
    this.logCounter += 1;
    this.log = [
      ...this.log.slice(-79),
      { id: this.logCounter, time: Date.now() - this.startedAt, message, kind },
    ];
    this.emit();
  }

  clearLog() {
    this.log = [];
    this.emit();
  }

  private clearTimers() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  stop(reason?: string) {
    this.generation += 1;
    this.running = false;
    this.pendingButton = null;
    this.pendingShake = null;
    this.clearTimers();
    if (this.elapsedTimer) {
      clearInterval(this.elapsedTimer);
      this.elapsedTimer = null;
    }
    if (reason) this.addLog(reason, "info");
    this.emit();
  }

  reset() {
    this.stop();
    this.startedAt = 0;
    this.frame = createMatrix();
    this.log = [];
    this.sensors = { ...defaultSensors };
    this.emit();
  }

  private createApi(gen: number): MicrobitApi {
    const alive = () => this.generation === gen;

    const pause = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          this.timers.delete(timer);
          resolve();
        }, Math.max(16, ms / this.speed));
        this.timers.add(timer);
        if (!alive()) clearTimeout(timer);
      });

    const waitForButtonWithValue = () =>
      new Promise<Button>((resolve) => {
        if (!alive()) return;
        this.pendingButton = resolve;
      });

    const waitForShake = () =>
      new Promise<void>((resolve) => {
        if (!alive()) return;
        this.pendingShake = resolve;
      });

    return {
      showIcon: async (name) => {
        if (!alive()) return;
        this.setFrame(icons[name] ?? icons.diamond);
      },
      showString: async (text) => {
        for (const frame of stringFrames(text)) {
          if (!alive()) return;
          this.setFrame(frame);
          await pause(90);
        }
      },
      showNumber: async (value) => {
        for (const frame of numberFrames(value)) {
          if (!alive()) return;
          this.setFrame(frame);
          await pause(70);
        }
      },
      showFrame: async (frame) => {
        if (!alive()) return;
        this.setFrame(frame);
      },
      clear: async () => {
        if (!alive()) return;
        this.setFrame(createMatrix());
      },
      pause,
      log: (message) => {
        if (alive()) this.addLog(message);
      },
      playTone: (name) => {
        if (!alive()) return;
        this.lastTone = name;
        this.addLog(`♪ ${name}`, "sound");
        this.emit();
      },
      waitForButton: async () => {
        await waitForButtonWithValue();
      },
      waitForButtonWithValue,
      waitForShake,
      randomRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      runningTime: () => Date.now() - this.startedAt,
      sensors: () => ({ ...this.sensors }),
    };
  }

  async start(program: MicrobitProgram) {
    this.stop();
    this.generation += 1;
    const gen = this.generation;
    this.running = true;
    this.startedAt = Date.now();
    this.addLog(`▶ Running "${program.name}"`);
    this.emit();

    this.elapsedTimer = setInterval(() => this.emit(), 500);
    const api = this.createApi(gen);
    const iterator = program.run(api);

    try {
      for (;;) {
        const next = await iterator.next();
        if (next.done || this.generation !== gen) break;
      }
    } catch (error) {
      if (this.generation === gen) {
        this.addLog(
          `⚠ Program stopped: ${error instanceof Error ? error.message : "unknown error"}`,
        );
      }
    } finally {
      if (this.generation === gen) {
        this.stop();
        this.addLog("■ Program finished");
      }
    }
  }

  pressButton(button: Button) {
    this.addLog(`Button ${button} pressed`, "event");
    if (this.pendingButton) {
      const resolve = this.pendingButton;
      this.pendingButton = null;
      resolve(button);
    }
  }

  shake() {
    this.addLog("Board shaken", "event");
    this.sensors = {
      ...this.sensors,
      accelerationX: 1400 + Math.round(Math.random() * 700),
      accelerationY: 1200 + Math.round(Math.random() * 700),
      accelerationZ: 900,
    };
    this.emit();
    if (this.pendingShake) {
      const resolve = this.pendingShake;
      this.pendingShake = null;
      resolve();
    }
    const timer = setTimeout(() => {
      this.sensors = { ...this.sensors, accelerationX: 0, accelerationY: 0, accelerationZ: 1000 };
      this.emit();
    }, 600 / this.speed);
    this.timers.add(timer);
  }

  setSpeed(speed: number) {
    this.speed = speed;
    this.emit();
  }
}

export { createMatrix };
export type { LedMatrix };
