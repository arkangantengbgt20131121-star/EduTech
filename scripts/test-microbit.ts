/**
 * Smoke test for the Micro:bit simulator.
 *
 * Every shipped program is driven by the real `MicrobitRuntime` for a short
 * while, with the buttons and shake events fired at it, and we assert that the
 * runtime produced frames/log entries without throwing.
 *
 * Run with:  npm run test:microbit
 */
import { MicrobitRuntime, type RuntimeState } from "../src/lib/microbit/runtime";
import { microbitPrograms } from "../src/lib/microbit/simulator";

const failures: string[] = [];
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

process.on("unhandledRejection", (reason) => {
  failures.push(`unhandled rejection: ${String(reason)}`);
});

async function exercise(programId: string) {
  const program = microbitPrograms.find((item) => item.id === programId);
  if (!program) throw new Error(`unknown program ${programId}`);

  const runtime = new MicrobitRuntime();
  let state: RuntimeState = runtime.getState();
  const unsubscribe = runtime.subscribe((next) => {
    state = next;
  });

  const frameSeen = new Set<string>();

  runtime.start(program);
  for (let step = 0; step < 12; step += 1) {
    await sleep(25);
    if (step === 2) runtime.pressButton("A");
    if (step === 4) runtime.pressButton("B");
    if (step === 6) runtime.pressButton("AB");
    if (step === 8) runtime.shake();
    frameSeen.add(state.frame.map((row) => row.map(Number).join("")).join("|"));
  }

  runtime.stop();
  unsubscribe();

  return {
    frames: frameSeen.size,
    logEntries: state.log.length,
    sensors: state.sensors,
    speed: runtime.speed,
  };
}

async function main() {
  let passed = 0;
  for (const program of microbitPrograms) {
    try {
      const result = await exercise(program.id);
      const problems: string[] = [];
      if (result.frames < 1) problems.push("no LED frames rendered");
      if (typeof result.sensors.temperature !== "number") problems.push("sensors unavailable");

      if (problems.length) {
        failures.push(`${program.id}: ${problems.join(", ")}`);
        console.log(`✗ ${program.id.padEnd(14)} ${problems.join(", ")}`);
      } else {
        passed += 1;
        console.log(
          `✓ ${program.id.padEnd(14)} ${String(result.frames).padStart(2)} frames · ${String(result.logEntries).padStart(2)} log lines`,
        );
      }
    } catch (error) {
      failures.push(`${program.id}: ${(error as Error).message}`);
      console.log(`✗ ${program.id.padEnd(14)} threw: ${(error as Error).message}`);
    }
  }

  console.log(`\n${passed}/${microbitPrograms.length} programs ran cleanly`);
  if (failures.length) {
    console.error("\nFailures:");
    for (const failure of failures) console.error(` - ${failure}`);
    process.exit(1);
  }
}

void main();
