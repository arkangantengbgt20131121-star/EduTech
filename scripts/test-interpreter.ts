/**
 * Smoke tests for the EduTech Python interpreter.
 * Run with: npm run test:python
 */
import { runPython } from "../src/lib/engine/python.ts";

let passed = 0;
let failed = 0;

function check(name: string, source: string, expected: string[]) {
  const result = runPython(source);
  const actual = result.output;
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed += 1;
    console.log(`✓ ${name}`);
  } else {
    failed += 1;
    console.log(`✗ ${name}`);
    console.log(`   expected: ${JSON.stringify(expected)}`);
    console.log(`   actual:   ${JSON.stringify(actual)}`);
    if (result.error) console.log(`   error:    ${result.error.message}${result.error.hint ? ` (${result.error.hint})` : ""}`);
  }
}

function checkWithInput(name: string, source: string, stdin: string[], expected: string[]) {
  const result = runPython(source, { stdin });
  const ok = JSON.stringify(result.output) === JSON.stringify(expected);
  if (ok) {
    passed += 1;
    console.log(`✓ ${name}`);
  } else {
    failed += 1;
    console.log(`✗ ${name}`);
    console.log(`   expected: ${JSON.stringify(expected)}`);
    console.log(`   actual:   ${JSON.stringify(result.output)}`);
    if (result.error) console.log(`   error:    ${result.error.message}`);
  }
}

function checkError(name: string, source: string, messagePart: string) {
  const result = runPython(source);
  const ok = Boolean(result.error && result.error.message.includes(messagePart));
  if (ok) {
    passed += 1;
    console.log(`✓ ${name}`);
  } else {
    failed += 1;
    console.log(`✗ ${name} — expected an error containing "${messagePart}", got ${JSON.stringify(result.error?.message)}`);
  }
}

check("print", 'print("Hello, EduTech!")', ["Hello, EduTech!"]);
check("f-string", 'name = "Alya"\nprint(f"Hi {name}")', ["Hi Alya"]);
check("arithmetic", "print(2 + 3 * 4)\nprint(10 / 4)\nprint(10 // 3)\nprint(2 ** 10)\nprint(17 % 5)", ["14", "2.5", "3", "1024", "2"]);
check("for loop", "total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)", ["15"]);
check("while loop", "i = 0\nwhile i < 3:\n    print(i)\n    i += 1", ["0", "1", "2"]);
check("conditionals", 'score = 82\nif score >= 80:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")', ["A"]);
check("f-string format", 'value = 3.14159\nprint(f"{value:.2f}")\nprint(f"{7:.3f}")', ["3.14", "7.000"]);
check("list and append", 'items = [1, 2, 3]\nitems.append(4)\nprint(items)\nprint(len(items))', ["[1, 2, 3, 4]", "4"]);
check("dict items loop", 'planets = {"Earth": 365, "Mars": 687}\nfor name, days in planets.items():\n    print(f"{name}: {days}")', ["Earth: 365", "Mars: 687"]);
check("functions", "def double(n):\n    return n * 2\n\nprint(double(21))", ["42"]);
check("string methods", 'word = "EduTech"\nprint(word.upper())\nprint(word.lower())\nprint(len(word))', ["EDUTECH", "edutech", "7"]);
checkWithInput("input", 'name = input("Name? ")\nprint(f"Hello {name}")', ["Alya"], ["Name? ", "Hello Alya"]);
check("sum and sorted", "scores = [68, 72, 96]\nprint(sum(scores))\nprint(sorted(scores)[0])\nprint(max(scores))", ["236", "68", "96"]);
check("break and continue", "for i in range(10):\n    if i == 2:\n        continue\n    if i == 5:\n        break\n    print(i)", ["0", "1", "3", "4"]);
check("try except", 'try:\n    print(10 / 0)\nexcept:\n    print("Cannot divide by zero")', ["Cannot divide by zero"]);
checkError("undefined variable", "print(missing)", "is not defined");
checkError("infinite loop guard", "i = 0\nwhile True:\n    i += 1", "50,000 times");

// input() with provided stdin
checkWithInput("input with stdin", 'name = input("?")\nprint(name.upper())', ["alya"], ["?", "ALYA"]);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
