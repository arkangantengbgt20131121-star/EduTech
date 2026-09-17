/**
 * Micro:bit simulator engine.
 *
 * Programs are written as async generators that yield LED frames and read
 * button / sensor state through a small API. The engine is deliberately
 * separate from React so the visual simulator, the lesson widgets and (later)
 * a real Micro:bit bridge all drive the same programs.
 *
 * Architecture note: swapping this for a real emulator (or a WebUSB connection
 * to a physical board) only requires a new driver that implements `MicrobitApi`.
 */
import { createMatrix, diceFaces, icons, numberFrames, stringFrames, type LedMatrix } from "./glyphs";

export interface MicrobitSensors {
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  lightLevel: number;
  temperature: number;
  heading: number;
}

export interface MicrobitApi {
  showIcon(name: keyof typeof icons | string): Promise<void>;
  showString(text: string): Promise<void>;
  showNumber(value: number): Promise<void>;
  showFrame(frame: LedMatrix): Promise<void>;
  clear(): Promise<void>;
  pause(ms: number): Promise<void>;
  log(message: string): void;
  playTone(name: string, ms?: number): void;
  waitForButton(button: "A" | "B" | "AB"): Promise<void>;
  /** Resolves with whichever button (or pair) was pressed next. */
  waitForButtonWithValue(): Promise<"A" | "B" | "AB">;
  waitForShake(): Promise<void>;
  randomRange(min: number, max: number): number;
  runningTime(): number;
  sensors: () => MicrobitSensors;
}

export interface MicrobitProgram {
  id: string;
  name: string;
  emoji: string;
  description: string;
  /** Friendly MakeCode-style listing shown to students. */
  blocks: string;
  /** What the student needs to do to interact with the program. */
  interaction: string;
  tags: string[];
  run: (api: MicrobitApi) => AsyncGenerator<unknown, void, unknown>;
}

/* --------------------------------- Helpers -------------------------------- */

async function scrollFrames(api: MicrobitApi, frames: LedMatrix[], frameMs = 95) {
  for (const frame of frames) {
    await api.showFrame(frame);
    await api.pause(frameMs);
  }
}

function frameFromValue(value: number, max: 5 | 25): LedMatrix {
  const matrix = createMatrix();
  const lit = Math.max(1, Math.round((Math.min(Math.max(value, 0), 1) * max)));
  if (max === 25) {
    let count = 0;
    for (let row = 4; row >= 0; row -= 1) {
      for (let column = 0; column < 5; column += 1) {
        if (count < lit) {
          matrix[row][column] = true;
          count += 1;
        }
      }
    }
    return matrix;
  }
  const column = Math.min(4, Math.max(0, lit - 1));
  for (let row = 4; row >= 0; row -= 1) matrix[row][column] = true;
  return matrix;
}

function barFrame(level: number): LedMatrix {
  const matrix = createMatrix();
  const rows = Math.max(1, Math.min(5, Math.round(level * 5)));
  for (let index = 0; index < rows; index += 1) {
    const row = 4 - index;
    for (let column = 0; column < 5; column += 1) matrix[row][column] = true;
  }
  return matrix;
}

/* -------------------------------- Programs -------------------------------- */

export const microbitPrograms: MicrobitProgram[] = [
  {
    id: "heart",
    name: "Beating heart",
    emoji: "❤️",
    description: "The classic first project: a heart that beats using two frames.",
    blocks: 'forever {\n    show icon (♥)\n    pause (400)\n    show icon (small heart)\n    pause (400)\n}',
    interaction: "Just press Run — no input needed.",
    tags: ["LED matrix", "Animation", "Beginner"],
    async *run(api) {
      for (;;) {
        await api.showIcon("heart");
        await api.pause(420);
        await api.showIcon("smallHeart");
        await api.pause(420);
      }
    },
  },
  {
    id: "smiley",
    name: "Mood machine",
    emoji: "🙂",
    description: "Press A for a happy face, B for a sad face and A+B for a surprise.",
    blocks: 'on button A pressed {\n    show icon (happy)\n}\non button B pressed {\n    show icon (sad)\n}\non button A+B pressed {\n    show icon (surprised)\n    play tone (Middle C)\n}',
    interaction: "Press A, B or hold both buttons together.",
    tags: ["Buttons", "Events", "Icons", "Beginner"],
    async *run(api) {
      await api.showIcon("diamond");
      api.log("Waiting for a button…");
      for (;;) {
        const which = await api.waitForButtonWithValue();
        if (which === "A") {
          api.log("Button A pressed → happy");
          api.playTone("Middle C");
          await api.showIcon("happy");
        } else if (which === "B") {
          api.log("Button B pressed → sad");
          api.playTone("Low C");
          await api.showIcon("sad");
        } else {
          api.log("Button A+B pressed → surprised");
          api.playTone("High C");
          await api.showIcon("surprised");
        }
        await api.pause(700);
        await api.showIcon("diamond");
      }
    },
  },
  {
    id: "name",
    name: "Name display",
    emoji: "🔤",
    description: "Scrolls your name across the LED matrix, one column at a time.",
    blocks: 'on start {\n    show string ("EDUTECH")\n}',
    interaction: "Edit the text in the code panel to scroll your own name.",
    tags: ["Strings", "Scrolling", "Beginner"],
    async *run(api) {
      for (;;) {
        await scrollFrames(api, stringFrames("EDUTECH"), 90);
        await api.pause(500);
      }
    },
  },
  {
    id: "counter",
    name: "Tap counter",
    emoji: "🔢",
    description: "Counts every press of Button A; Button B resets the count to zero.",
    blocks: 'on start {\n    set count to 0\n}\non button A pressed {\n    change count by 1\n    show number (count)\n}\non button B pressed {\n    set count to 0\n    show number (count)\n}',
    interaction: "Press A to add one, B to reset.",
    tags: ["Variables", "Buttons", "Numbers", "Beginner"],
    async *run(api) {
      let count = 0;
      await api.showNumber(0);
      for (;;) {
        const which = await api.waitForButtonWithValue();
        if (which === "A") {
          count += 1;
          api.log(`Count = ${count}`);
        } else {
          count = 0;
          api.log("Counter reset to 0");
        }
        await scrollFrames(api, numberFrames(count), 70);
      }
    },
  },
  {
    id: "dice",
    name: "Digital dice",
    emoji: "🎲",
    description: "Shake the board to roll a number from 1 to 6, with a tumbling animation.",
    blocks: 'on shake {\n    for i from 0 to 8 {\n        show number (pick random 1 to 6)\n        pause (80)\n    }\n    set roll to (pick random 1 to 6)\n    show leds (dice face)\n}',
    interaction: "Press the Shake button (or shake your device) to roll.",
    tags: ["Random", "Sensors", "Animation", "Game"],
    async *run(api) {
      await api.showIcon("diamond");
      for (;;) {
        await api.waitForShake();
        for (let index = 0; index < 10; index += 1) {
          await api.showNumber(api.randomRange(1, 6));
          await api.pause(70);
        }
        const roll = api.randomRange(1, 6);
        api.log(`Rolled a ${roll}!`);
        await api.showFrame(diceFaces[roll]);
        await api.pause(1400);
        await api.clear();
        await api.showIcon("diamond");
      }
    },
  },
  {
    id: "reaction",
    name: "Reaction game",
    emoji: "⚡",
    description: "Measures how fast you react, in milliseconds — the fastest player wins.",
    blocks: 'on start {\n    pause (pick random 2000 to 5000)\n    show icon (square)\n    set start to running time\n}\non button A pressed {\n    set reaction to (running time - start)\n    show number (reaction)\n}',
    interaction: "Wait for the LEDs to light up, then press Button A as fast as you can.",
    tags: ["Timing", "Random", "Game", "Measure"],
    async *run(api) {
      let best = 9999;
      for (;;) {
        api.log("Get ready… do not press yet");
        await api.showIcon("smallDiamond");
        await api.pause(api.randomRange(1500, 3500));
        await api.showIcon("square");
        const started = api.runningTime();
        api.log("GO! Press Button A now");
        const which = await api.waitForButtonWithValue();
        if (which === "B") {
          api.log("Cancelled — press A to play again");
          await api.pause(400);
          continue;
        }
        const reaction = api.runningTime() - started;
        api.log(`Reaction time: ${reaction} ms`);
        await scrollFrames(api, numberFrames(reaction), 65);
        if (reaction < best) {
          best = reaction;
          api.log(`New personal best: ${best} ms`);
          await api.showIcon("happy");
          api.playTone("High C");
        } else {
          await api.showIcon("sad");
        }
        await api.pause(900);
      }
    },
  },
  {
    id: "temperature",
    name: "Temperature display",
    emoji: "🌡️",
    description: "Reads the on-board temperature sensor and shows it as a bar graph.",
    blocks: 'forever {\n    set temp to input.temperature()\n    show number (temp)\n    plot bar graph of (temp)\n}',
    interaction: "Move the temperature slider to change the reading.",
    tags: ["Sensors", "Data", "Bars", "Intermediate"],
    async *run(api) {
      for (;;) {
        const temperature = api.sensors().temperature;
        api.log(`Temperature: ${temperature} °C`);
        await scrollFrames(api, numberFrames(temperature), 70);
        const level = Math.min(1, Math.max(0, (temperature - 10) / 30));
        await api.showFrame(barFrame(level));
        await api.pause(700);
      }
    },
  },
  {
    id: "greeting",
    name: "Greeting card",
    emoji: "👋",
    description: "An interactive card: press A to say hi, B to wave goodbye, A+B for a surprise.",
    blocks: 'on button A pressed {\n    show string ("HI!")\n}\non button B pressed {\n    show string ("BYE")\n}\non button A+B pressed {\n    show icon (surprised)\n    play tone (Middle C)\n}',
    interaction: "Press A, B, or hold A+B together.",
    tags: ["Buttons", "Events", "Strings", "Beginner"],
    async *run(api) {
      await api.showIcon("happy");
      for (;;) {
        const which = await api.waitForButtonWithValue();
        if (which === "A") {
          api.log("Button A → HI!");
          await scrollFrames(api, stringFrames("HI!"), 95);
        } else if (which === "B") {
          api.log("Button B → BYE");
          await scrollFrames(api, stringFrames("BYE"), 95);
        } else {
          api.log("Buttons A+B → surprise");
          api.playTone("High C");
          await api.showIcon("surprised");
          await api.pause(600);
        }
        await api.showIcon("happy");
      }
    },
  },
  {
    id: "stepCounter",
    name: "Step counter",
    emoji: "🏃",
    description: "Counts steps from movement, and warns with a sad face when it gets dark.",
    blocks: 'on start {\n    set steps to 0\n}\nforever {\n    if (total movement > 1500) {\n        change steps by 1\n    }\n    if (input.lightLevel() < 50) {\n        show icon (sad)\n    }\n}',
    interaction: "Use the Shake button to simulate movement, and the light slider for darkness.",
    tags: ["Accelerometer", "Light sensor", "Thresholds", "Intermediate"],
    async *run(api) {
      let steps = 0;
      for (;;) {
        const sensors = api.sensors();
        const movement =
          Math.abs(sensors.accelerationX) + Math.abs(sensors.accelerationY) + Math.abs(sensors.accelerationZ);

        if (movement > 1500) {
          steps += 1;
          api.log(`Step counted — total ${steps}`);
          await scrollFrames(api, numberFrames(steps), 60);
        } else if (sensors.lightLevel < 50) {
          api.log("It is dark in here…");
          await api.showIcon("sad");
        } else {
          await api.showFrame(frameFromValue(steps % 25, 25));
        }
        await api.pause(120);
      }
    },
  },
  {
    id: "rover",
    name: "Motor driver",
    emoji: "🚗",
    description: "Drives a two-wheeled rover: A turns left, B turns right, A+B goes straight.",
    blocks: 'on button A pressed {\n    motorRun (M1, 0)\n    motorRun (M2, 70)\n}\non button B pressed {\n    motorRun (M1, 70)\n    motorRun (M2, 0)\n}\non button A+B pressed {\n    motorRun (M1, 80)\n    motorRun (M2, 80)\n}\non shake {\n    motorStop (M1)\n    motorStop (M2)\n}',
    interaction: "A = left wheel, B = right wheel, shake = stop. Watch the log for motor commands.",
    tags: ["Motors", "Buttons", "Robotics", "Intermediate"],
    async *run(api) {
      api.log("Rover ready — waiting for commands");
      for (;;) {
        const which = await api.waitForButtonWithValue();
        if (which === "A") {
          api.log("M1 = 0%, M2 = 70% → turning left");
          await api.showIcon("arrowNorth");
        } else if (which === "B") {
          api.log("M1 = 70%, M2 = 0% → turning right");
          await api.showIcon("arrowEast");
        } else {
          api.log("M1 = 80%, M2 = 80% → driving forward");
          await api.showFrame(frameFromValue(0.6, 5));
        }
        await api.pause(500);
      }
    },
  },
  {
    id: "nightLight",
    name: "Night light",
    emoji: "🌙",
    description: "Turns every LED on when the room gets dark, and off when it is bright.",
    blocks: 'forever {\n    if (input.lightLevel() < 50) {\n        show leds (all on)\n    } else {\n        clear screen\n    }\n}',
    interaction: "Drag the light level slider to simulate a dark or bright room.",
    tags: ["Light sensor", "Conditions", "Beginner"],
    async *run(api) {
      for (;;) {
        const { lightLevel } = api.sensors();
        if (lightLevel < 50) {
          api.log(`Light level ${lightLevel} → dark, turning the lights on`);
          await api.showIcon("square");
        } else {
          api.log(`Light level ${lightLevel} → bright enough`);
          await api.clear();
        }
        await api.pause(350);
      }
    },
  },
  {
    id: "alarm",
    name: "Motion alarm",
    emoji: "🚨",
    description: "Stays quiet until the board is moved, then flashes and sounds an alarm.",
    blocks: 'on start {\n    show icon (no entry)\n}\non shake {\n    for i from 0 to 5 {\n        show icon (cross)\n        play tone\n        pause (150)\n        clear screen\n        pause (150)\n    }\n}',
    interaction: "Press Shake to trip the alarm.",
    tags: ["Sensors", "Alarm", "Sound", "Intermediate"],
    async *run(api) {
      await api.showIcon("noEntry");
      for (;;) {
        await api.waitForShake();
        api.log("Motion detected — ALARM!");
        for (let index = 0; index < 6; index += 1) {
          api.playTone("High C", 150);
          await api.showIcon("cross");
          await api.pause(150);
          await api.clear();
          await api.pause(150);
        }
        await api.showIcon("noEntry");
      }
    },
  },
];

export const programById = Object.fromEntries(
  microbitPrograms.map((program) => [program.id, program]),
);

export function getProgram(id: string): MicrobitProgram {
  return programById[id] ?? microbitPrograms[0];
}

export const defaultSensors: MicrobitSensors = {
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 1000,
  lightLevel: 180,
  temperature: 26,
  heading: 0,
};
