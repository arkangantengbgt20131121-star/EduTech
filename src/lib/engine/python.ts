/**
 * A small, safe Python interpreter for the EduTech playground.
 *
 * It supports the subset of Python taught across the platform: variables,
 * numbers, strings, f-strings, lists, dictionaries, conditions, loops,
 * functions and the built-ins used in lessons. It runs entirely in the
 * browser with a step limit, so a student can never freeze the page with an
 * infinite loop.
 *
 * This is deliberately not a full Python implementation — it is a carefully
 * scoped teaching interpreter with friendly error messages.
 */

export interface RunResult {
  output: string[];
  error?: { message: string; line?: number; hint?: string };
  steps: number;
  variables: Record<string, string>;
}

/* ------------------------------- Tokenizer -------------------------------- */

type TokenType =
  | "name"
  | "number"
  | "string"
  | "fstring"
  | "op"
  | "newline"
  | "indent"
  | "dedent"
  | "eof";

interface Token {
  type: TokenType;
  value: string;
  line: number;
  /** Raw inner text for f-strings. */
  raw?: string;
}

const KEYWORDS = new Set([
  "if",
  "elif",
  "else",
  "while",
  "for",
  "in",
  "def",
  "return",
  "break",
  "continue",
  "and",
  "or",
  "not",
  "True",
  "False",
  "None",
  "pass",
  "try",
  "except",
  "as",
  "import",
  "from",
]);

export class PythonError extends Error {
  line?: number;
  hint?: string;
  constructor(message: string, line?: number, hint?: string) {
    super(message);
    this.name = "PythonError";
    this.line = line;
    this.hint = hint;
  }
}

function tokenize(source: string): Token[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const tokens: Token[] = [];
  const indentStack: number[] = [0];
  let bracketDepth = 0;

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    if (bracketDepth === 0) {
      const stripped = rawLine.replace(/#.*$/, "");
      if (stripped.trim() === "") return;
      const indent = stripped.length - stripped.trimStart().length;
      if (indent > (indentStack[indentStack.length - 1] ?? 0)) {
        indentStack.push(indent);
        tokens.push({ type: "indent", value: "", line: lineNumber });
      } else {
        while (indent < (indentStack[indentStack.length - 1] ?? 0)) {
          indentStack.pop();
          tokens.push({ type: "dedent", value: "", line: lineNumber });
        }
      }
    }

    const line = rawLine.replace(/#(?![^'"]*['"])/, " # ");
    let i = 0;
    while (i < line.length) {
      const char = line[i];

      if (char === "#") break;
      if (char === " " || char === "\t" || char === "\\") {
        i += 1;
        continue;
      }

      // Strings (including f-strings)
      const isFString =
        (char === "f" || char === "F") && (line[i + 1] === '"' || line[i + 1] === "'");
      if (char === '"' || char === "'" || isFString) {
        const quoteStart = isFString ? i + 1 : i;
        const quote = line[quoteStart];
        let j = quoteStart + 1;
        let value = "";
        while (j < line.length) {
          if (line[j] === "\\") {
            const next = line[j + 1];
            value +=
              next === "n" ? "\n" : next === "t" ? "\t" : next === "\\" ? "\\" : next === quote ? quote : `\\${next}`;
            j += 2;
            continue;
          }
          if (line[j] === quote) break;
          value += line[j];
          j += 1;
        }
        if (j >= line.length) {
          throw new PythonError(`Unclosed ${isFString ? "f-string" : "string"} on line ${lineNumber}`, lineNumber, "Every opening quote needs a closing quote of the same type.");
        }
        tokens.push({
          type: isFString ? "fstring" : "string",
          value: value,
          line: lineNumber,
        });
        i = j + 1;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char) || (char === "." && /[0-9]/.test(line[i + 1] ?? ""))) {
        let j = i;
        while (j < line.length && /[0-9._]/.test(line[j])) j += 1;
        if (line[j] === "e" || line[j] === "E") {
          j += 1;
          if (line[j] === "+" || line[j] === "-") j += 1;
          while (j < line.length && /[0-9]/.test(line[j])) j += 1;
        }
        tokens.push({ type: "number", value: line.slice(i, j).replace(/_/g, ""), line: lineNumber });
        i = j;
        continue;
      }

      // Names / keywords
      if (/[A-Za-z_]/.test(char)) {
        let j = i;
        while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j += 1;
        const word = line.slice(i, j);
        tokens.push({ type: KEYWORDS.has(word) ? "op" : "name", value: word, line: lineNumber });
        i = j;
        continue;
      }

      // Multi-character operators
      const three = line.slice(i, i + 3);
      const two = line.slice(i, i + 2);
      if (two === "**" || two === "//" || two === "==" || two === "!=" || two === "<=" || two === ">=" || two === "+=" || two === "-=" || two === "*=" || two === "/=") {
        tokens.push({ type: "op", value: two, line: lineNumber });
        i += 2;
        if (three === "**=") {
          tokens[tokens.length - 1].value = "**=";
        }
        continue;
      }

      if ("()[]{}".includes(char)) {
        bracketDepth += "([{".includes(char) ? 1 : -1;
        tokens.push({ type: "op", value: char, line: lineNumber });
        i += 1;
        continue;
      }

      if ("+-*/%<>=,:.!".includes(char)) {
        tokens.push({ type: "op", value: char, line: lineNumber });
        i += 1;
        continue;
      }

      throw new PythonError(`I do not understand the character "${char}" on line ${lineNumber}`, lineNumber);
    }

    if (bracketDepth === 0) tokens.push({ type: "newline", value: "", line: lineNumber });
  });

  while (indentStack.length > 1) {
    indentStack.pop();
    tokens.push({ type: "dedent", value: "", line: lines.length });
  }
  tokens.push({ type: "eof", value: "", line: lines.length });
  return tokens;
}

/* --------------------------------- Parser --------------------------------- */

type Node = Record<string, unknown> & { kind: string; line?: number };

class Parser {
  private pos = 0;
  private tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(offset = 0): Token {
    return this.tokens[Math.min(this.pos + offset, this.tokens.length - 1)];
  }

  private next(): Token {
    return this.tokens[this.pos++];
  }

  private matchOp(...values: string[]): boolean {
    const token = this.peek();
    return token.type === "op" && values.includes(token.value);
  }

  private expectOp(value: string, context: string): Token {
    const token = this.peek();
    if (token.type !== "op" || token.value !== value) {
      throw new PythonError(
        `Expected "${value}" ${context} but found ${this.describe(token)}`,
        token.line,
      );
    }
    return this.next();
  }

  private describe(token: Token) {
    if (token.type === "newline") return "the end of the line";
    if (token.type === "eof") return "the end of the program";
    return `"${token.value}"`;
  }

  private skipNewlines() {
    while (this.peek().type === "newline") this.pos += 1;
  }

  parseProgram(): { body: Node[]; line?: number } {
    const body = this.parseBlock();
    if (this.peek().type !== "eof") {
      const token = this.peek();
      throw new PythonError(`Unexpected ${this.describe(token)}`, token.line, "Check your indentation — lines inside a block need 4 spaces.");
    }
    return { body };
  }

  private parseBlock(): Node[] {
    const body: Node[] = [];
    this.skipNewlines();
    const expectIndent = this.peek().type === "indent";
    if (expectIndent) this.next();
    while (this.peek().type !== "dedent" && this.peek().type !== "eof") {
      this.skipNewlines();
      if (this.peek().type === "dedent" || this.peek().type === "eof") break;
      body.push(this.parseStatement());
      this.skipNewlines();
    }
    if (this.peek().type === "dedent") this.next();
    return body;
  }

  private parseStatement(): Node {
    const token = this.peek();
    const line = token.line;

    if (token.type === "op") {
      switch (token.value) {
        case "pass":
          this.next();
          return { kind: "pass", line };
        case "if":
          return this.parseIf();
        case "while":
          return this.parseWhile();
        case "for":
          return this.parseFor();
        case "def":
          return this.parseDef();
        case "return": {
          this.next();
          if (this.peek().type === "newline") return { kind: "return", line, value: null };
          const value = this.parseExpression();
          return { kind: "return", line, value };
        }
        case "break":
          this.next();
          return { kind: "break", line };
        case "continue":
          this.next();
          return { kind: "continue", line };
        case "import":
        case "from":
          this.skipStatement();
          return { kind: "pass", line };
        case "try":
          return this.parseTry();
        default:
          break;
      }
    }

    // Assignment or expression statement
    const expression = this.parseExpression();
    if (this.matchOp("=", "+=", "-=", "*=", "/=", "**=")) {
      const operator = this.next().value;
      const value = this.parseExpression();
      if (expression.kind !== "name" && expression.kind !== "index" && expression.kind !== "attr") {
        throw new PythonError("The left side of '=' must be a variable name", line);
      }
      return { kind: "assign", line, target: expression, operator, value };
    }
    return { kind: "expr", line, expression };
  }

  private skipStatement() {
    while (this.peek().type !== "newline" && this.peek().type !== "eof") this.pos += 1;
  }

  private parseTry(): Node {
    const line = this.peek().line;
    this.next(); // try
    this.expectOp(":", "after try");
    const body = this.parseBlock();
    this.skipNewlines();
    let handler: Node[] = [];
    let errorName: string | null = null;
    if (this.peek().type === "op" && this.peek().value === "except") {
      this.next();
      if (this.peek().type === "name" || (this.peek().type === "op" && this.peek().value === "Exception")) {
        this.next();
        if (this.matchOp("as")) {
          this.next();
          errorName = this.next().value;
        }
      }
      this.expectOp(":", "after except");
      handler = this.parseBlock();
    }
    return { kind: "try", line, body, handler, errorName };
  }

  private parseIf(): Node {
    const line = this.peek().line;
    this.next();
    const test = this.parseExpression();
    this.expectOp(":", "after the if condition");
    const body = this.parseBlock();
    const branches: { test: Node | null; body: Node[] }[] = [{ test, body }];

    this.skipNewlines();
    while (this.peek().type === "op" && (this.peek().value === "elif" || this.peek().value === "else")) {
      const keyword = this.next().value;
      if (keyword === "elif") {
        const branchTest = this.parseExpression();
        this.expectOp(":", "after the elif condition");
        branches.push({ test: branchTest, body: this.parseBlock() });
      } else {
        this.expectOp(":", "after else");
        branches.push({ test: null, body: this.parseBlock() });
        break;
      }
      this.skipNewlines();
    }
    return { kind: "if", line, branches };
  }

  private parseWhile(): Node {
    const line = this.peek().line;
    this.next();
    const test = this.parseExpression();
    this.expectOp(":", "after the while condition");
    const body = this.parseBlock();
    return { kind: "while", line, test, body };
  }

  private parseFor(): Node {
    const line = this.peek().line;
    this.next();
    const targets = [this.next().value];
    while (this.peek().type === "op" && this.peek().value === ",") {
      this.next();
      targets.push(this.next().value);
    }
    if (!(this.peek().type === "op" && this.peek().value === "in")) {
      throw new PythonError("A for loop needs 'in', like: for i in range(5):", line);
    }
    this.next();
    const iterable = this.parseExpression();
    this.expectOp(":", "after the for loop");
    const body = this.parseBlock();
    return { kind: "for", line, targets, iterable, body };
  }

  private parseDef(): Node {
    const line = this.peek().line;
    this.next();
    const name = this.next().value;
    this.expectOp("(", "after the function name");
    const params: { name: string; default: Node | null }[] = [];
    while (!this.matchOp(")")) {
      const paramName = this.next().value;
      let defaultValue: Node | null = null;
      if (this.matchOp("=")) {
        this.next();
        defaultValue = this.parseExpression();
      }
      params.push({ name: paramName, default: defaultValue });
      if (this.matchOp(",")) this.next();
    }
    this.expectOp(")", "to close the parameter list");
    this.expectOp(":", "after the function definition");
    const body = this.parseBlock();
    return { kind: "def", line, name, params, body };
  }

  /* ----------------------------- Expressions ----------------------------- */

  parseExpression(): Node {
    return this.parseOr();
  }

  private parseOr(): Node {
    let left = this.parseAnd();
    while (this.peek().type === "op" && this.peek().value === "or") {
      const line = this.next().line;
      const right = this.parseAnd();
      left = { kind: "logical", line, operator: "or", left, right };
    }
    return left;
  }

  private parseAnd(): Node {
    let left = this.parseNot();
    while (this.peek().type === "op" && this.peek().value === "and") {
      const line = this.next().line;
      const right = this.parseNot();
      left = { kind: "logical", line, operator: "and", left, right };
    }
    return left;
  }

  private parseNot(): Node {
    if (this.peek().type === "op" && this.peek().value === "not") {
      const line = this.next().line;
      return { kind: "unary", line, operator: "not", operand: this.parseNot() };
    }
    return this.parseComparison();
  }

  private parseComparison(): Node {
    let left = this.parseArithmetic();
    for (;;) {
      const token = this.peek();
      let operator: string | null = null;
      if (token.type === "op" && ["==", "!=", "<", ">", "<=", ">="].includes(token.value)) {
        operator = token.value;
      } else if (token.type === "op" && token.value === "in") {
        operator = "in";
      } else if (token.type === "op" && token.value === "not" && this.peek(1).value === "in") {
        operator = "not in";
      }
      if (!operator) return left;
      const line = this.next().line;
      if (operator === "not in") this.next();
      const right = this.parseArithmetic();
      left = { kind: "compare", line, operator, left, right };
    }
  }

  private parseArithmetic(): Node {
    let left = this.parseTerm();
    while (this.peek().type === "op" && (this.peek().value === "+" || this.peek().value === "-")) {
      const operator = this.next().value;
      const line = this.peek().line;
      const right = this.parseTerm();
      left = { kind: "binary", line, operator, left, right };
    }
    return left;
  }

  private parseTerm(): Node {
    let left = this.parseUnary();
    while (
      this.peek().type === "op" &&
      ["*", "/", "//", "%"].includes(this.peek().value)
    ) {
      const operator = this.next().value;
      const line = this.peek().line;
      const right = this.parseUnary();
      left = { kind: "binary", line, operator, left, right };
    }
    return left;
  }

  private parseUnary(): Node {
    const token = this.peek();
    if (token.type === "op" && (token.value === "-" || token.value === "+")) {
      this.next();
      return { kind: "unary", line: token.line, operator: token.value, operand: this.parseUnary() };
    }
    return this.parsePower();
  }

  private parsePower(): Node {
    const base = this.parsePostfix();
    if (this.peek().type === "op" && this.peek().value === "**") {
      const line = this.next().line;
      const exponent = this.parseUnary();
      return { kind: "binary", line, operator: "**", left: base, right: exponent };
    }
    return base;
  }

  private parsePostfix(): Node {
    let node = this.parsePrimary();
    for (;;) {
      const token = this.peek();
      if (token.type === "op" && token.value === "(") {
        this.next();
        const args: Node[] = [];
        const kwargs: { name: string; value: Node }[] = [];
        while (!this.matchOp(")")) {
          if (this.peek().type === "name" && this.peek(1).type === "op" && this.peek(1).value === "=") {
            const name = this.next().value;
            this.next();
            kwargs.push({ name, value: this.parseExpression() });
          } else {
            args.push(this.parseExpression());
          }
          if (this.matchOp(",")) this.next();
          else break;
        }
        this.expectOp(")", "to close the call");
        node = { kind: "call", line: token.line, callee: node, args, kwargs };
        continue;
      }
      if (token.type === "op" && token.value === "[") {
        this.next();
        const index = this.parseExpression();
        this.expectOp("]", "to close the index");
        node = { kind: "index", line: token.line, target: node, index };
        continue;
      }
      if (token.type === "op" && token.value === ".") {
        this.next();
        const attr = this.next().value;
        node = { kind: "attr", line: token.line, target: node, attr };
        continue;
      }
      return node;
    }
  }

  private parsePrimary(): Node {
    const token = this.next();
    const line = token.line;

    if (token.type === "number") {
      const value = token.value.includes(".") || token.value.includes("e") ? parseFloat(token.value) : parseInt(token.value, 10);
      return { kind: "literal", line, value };
    }
    if (token.type === "string") return { kind: "literal", line, value: token.value };
    if (token.type === "fstring") return { kind: "fstring", line, raw: token.value };
    if (token.type === "name") return { kind: "name", line, name: token.value };

    if (token.type === "op") {
      if (token.value === "True") return { kind: "literal", line, value: true };
      if (token.value === "False") return { kind: "literal", line, value: false };
      if (token.value === "None") return { kind: "literal", line, value: null };
      if (token.value === "not") {
        return { kind: "unary", line, operator: "not", operand: this.parseNot() };
      }
      if (token.value === "(") {
        const expression = this.parseExpression();
        this.expectOp(")", "to close the bracket");
        return expression;
      }
      if (token.value === "[") {
        const items: Node[] = [];
        while (!this.matchOp("]")) {
          items.push(this.parseExpression());
          if (this.matchOp(",")) this.next();
          else break;
        }
        this.expectOp("]", "to close the list");
        return { kind: "list", line, items };
      }
      if (token.value === "{") {
        const entries: { key: Node; value: Node }[] = [];
        while (!this.matchOp("}")) {
          const key = this.parseExpression();
          this.expectOp(":", "between a dictionary key and its value");
          const value = this.parseExpression();
          entries.push({ key, value });
          if (this.matchOp(",")) this.next();
          else break;
        }
        this.expectOp("}", "to close the dictionary");
        return { kind: "dict", line, entries };
      }
    }

    throw new PythonError(`Unexpected ${this.describe(token)}`, token.line, "Check for a missing comma, bracket or quote on this line.");
  }
}

/* ------------------------------ Interpreter ------------------------------- */

class BreakSignal {}
class ContinueSignal {}
class ReturnSignal {
  value: unknown;

  constructor(value: unknown) {
    this.value = value;
  }
}

type PyValue = unknown;

const MAX_STEPS = 400_000;
const MAX_OUTPUT = 400;

function pyRepr(value: PyValue): string {
  if (value === null || value === undefined) return "None";
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return String(value);
    return String(Number(value.toFixed(10)));
  }
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return `[${value.map((item) => pyStr(item)).join(", ")}]`;
  if (value instanceof Map) {
    return `{${[...value.entries()].map(([key, item]) => `${pyRepr(key)}: ${pyRepr(item)}`).join(", ")}}`;
  }
  return String(value);
}

function pyStr(value: PyValue): string {
  if (typeof value === "string") return value;
  return pyRepr(value);
}

function formatNumber(value: number, spec: string): string {
  const match = /^([<>^]?)(\d*)(?:\.(\d+))?([fde%]?)$/.exec(spec);
  if (!match) return String(value);
  const [, align, width, precision, type] = match;
  let text: string;
  if (type === "f") text = value.toFixed(precision ? parseInt(precision, 10) : 6);
  else if (type === "d") text = Math.trunc(value).toString();
  else if (type === "%") text = `${(value * 100).toFixed(precision ? parseInt(precision, 10) : 6)}%`;
  else if (type === "e") text = value.toExponential(precision ? parseInt(precision, 10) : 6);
  else if (precision) text = value.toFixed(parseInt(precision, 10));
  else text = String(value);
  if (width) {
    const size = parseInt(width, 10);
    if (text.length < size) {
      const pad = " ".repeat(size - text.length);
      if (align === "<") return text + pad;
      if (align === "^") return pad.slice(0, Math.floor(pad.length / 2)) + text + pad.slice(0, Math.ceil(pad.length / 2));
      return pad + text;
    }
  }
  return text;
}

interface Env {
  vars: Map<string, PyValue>;
  parent: Env | null;
}

function createEnv(parent: Env | null = null): Env {
  return { vars: new Map(), parent };
}

function envGet(env: Env, name: string): PyValue {
  let current: Env | null = env;
  while (current) {
    if (current.vars.has(name)) return current.vars.get(name);
    current = current.parent;
  }
  throw new PythonError(
    `"${name}" is not defined yet`,
    undefined,
    `Create it first with a line like: ${name} = 0`,
  );
}

function envSet(env: Env, name: string, value: PyValue) {
  let current: Env | null = env;
  while (current) {
    if (current.vars.has(name)) {
      current.vars.set(name, value);
      return;
    }
    current = current.parent;
  }
  env.vars.set(name, value);
}

function truthy(value: PyValue): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (value instanceof Map) return value.size > 0;
  return true;
}

export function runPython(
  source: string,
  options: { stdin?: string[] } = {},
): RunResult {
  const output: string[] = [];
  let steps = 0;
  const stdinQueue = [...(options.stdin ?? [])];

  const checkStep = (line?: number) => {
    steps += 1;
    if (steps > MAX_STEPS) {
      throw new PythonError(
        "This program ran for too long and was stopped",
        line,
        "Check your loops — a while loop needs something inside it that eventually makes the condition false.",
      );
    }
  };

  const push = (text: string) => {
    if (output.length < MAX_OUTPUT) output.push(text);
  };

  const getAttribute = (target: PyValue, attr: string): PyValue => {
    if (typeof target === "string") {
      const stringMethods: Record<string, (...args: PyValue[]) => PyValue> = {
        upper: () => target.toUpperCase(),
        lower: () => target.toLowerCase(),
        title: () => target.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()),
        strip: () => target.trim(),
        split: (sep?: PyValue) => (sep === undefined ? target.split(/\s+/) : target.split(String(sep))),
        startswith: (prefix: PyValue) => target.startsWith(String(prefix)),
        endswith: (suffix: PyValue) => target.endsWith(String(suffix)),
        replace: (from: PyValue, to: PyValue) => target.split(String(from)).join(String(to)),
        count: (needle: PyValue) => target.split(String(needle)).length - 1,
        find: (needle: PyValue) => target.indexOf(String(needle)),
        isdigit: () => /^[0-9]+$/.test(target),
        isalpha: () => /^[A-Za-z]+$/.test(target),
        format: (...args: PyValue[]) =>
          target.replace(/\{(\d*)\}/g, (_all, index: string) =>
            index === "" ? String(args.shift() ?? "") : pyStr(args[parseInt(index, 10)] ?? ""),
          ),
      };
      const method = stringMethods[attr];
      if (method) return { __function: method };
    }
    if (Array.isArray(target)) {
      const listMethods: Record<string, (...args: PyValue[]) => PyValue> = {
        append: (item: PyValue) => {
          target.push(item);
          return null;
        },
        insert: (index: PyValue, item: PyValue) => {
          target.splice(Number(index), 0, item);
          return null;
        },
        pop: (index?: PyValue) => target.splice(index === undefined ? target.length - 1 : Number(index), 1)[0] ?? null,
        remove: (item: PyValue) => {
          const index = target.indexOf(item);
          if (index >= 0) target.splice(index, 1);
          return null;
        },
        index: (item: PyValue) => target.indexOf(item),
        count: (item: PyValue) => target.filter((entry) => entry === item).length,
        sort: () => {
          target.sort((a, b) => (pyRepr(a) > pyRepr(b) ? 1 : -1));
          return null;
        },
        reverse: () => {
          target.reverse();
          return null;
        },
        clear: () => {
          target.length = 0;
          return null;
        },
        copy: () => [...target],
      };
      const method = listMethods[attr];
      if (method) return { __function: method };
    }
    if (target instanceof Map) {
      const dictMethods: Record<string, (...args: PyValue[]) => PyValue> = {
        keys: () => [...target.keys()],
        values: () => [...target.values()],
        items: () => [...target.entries()].map(([key, value]) => [key, value]),
        get: (key: PyValue, fallback?: PyValue) => (target.has(String(key)) ? target.get(String(key)) : (fallback ?? null)),
      };
      const method = dictMethods[attr];
      if (method) return { __function: method };
    }
    if (typeof target === "number") {
      const numberMethods: Record<string, (...args: PyValue[]) => PyValue> = {
        bit_length: () => Math.abs(Math.trunc(Number(target))).toString(2).length,
      };
      const method = numberMethods[attr];
      if (method) return { __function: method };
    }
    throw new PythonError(`This value has no method called "${attr}"`);
  };

  const builtins = (name: string, args: PyValue[], kwargs: Record<string, PyValue>): PyValue => {
    switch (name) {
      case "print": {
        const sep = kwargs.sep !== undefined ? pyStr(kwargs.sep) : " ";
        const end = kwargs.end !== undefined ? pyStr(kwargs.end) : "\n";
        const text = args.map((arg) => pyStr(arg)).join(sep);
        if (end === "\n") {
          push(text);
        } else if (end.endsWith("\n")) {
          push(text + end.slice(0, -1));
        } else if (output.length === 0) {
          output.push(text + end);
        } else {
          output[output.length - 1] += text + end;
        }
        return null;
      }
      case "input": {
        if (args.length && args[0] !== undefined) push(pyStr(args[0]));
        const next = stdinQueue.shift();
        if (next !== undefined) return next;
        throw new PythonError(
          "input() is waiting for a value, but the input box is empty",
          undefined,
          'Add values in the "Program input" box below the editor, one per line, then run again.',
        );
      }
      case "len":
        return lengthOf(args[0]);
      case "range": {
        const start = args.length > 1 ? Number(args[0]) : 0;
        const stop = Number(args.length > 1 ? args[1] : args[0]);
        const step = args.length > 2 ? Number(args[2]) : 1;
        if (step === 0) throw new PythonError("range() step cannot be 0");
        const result: number[] = [];
        if (step > 0) for (let i = start; i < stop; i += step) result.push(i);
        else for (let i = start; i > stop; i += step) result.push(i);
        return result;
      }
      case "int": {
        if (typeof args[0] === "string") {
          const parsed = parseInt(args[0].trim(), 10);
          if (Number.isNaN(parsed)) throw new PythonError(`int() could not read "${args[0]}" as a whole number`);
          return parsed;
        }
        return Math.trunc(Number(args[0]));
      }
      case "float": {
        const parsed = parseFloat(String(args[0]));
        if (Number.isNaN(parsed)) throw new PythonError(`float() could not read "${String(args[0])}" as a number`);
        return parsed;
      }
      case "str":
        return pyStr(args[0]);
      case "bool":
        return truthy(args[0]);
      case "abs":
        return Math.abs(Number(args[0]));
      case "round": {
        const digits = args.length > 1 ? Number(args[1]) : 0;
        const factor = 10 ** digits;
        return Math.round(Number(args[0]) * factor) / factor;
      }
      case "sum": {
        const list = args[0];
        if (!Array.isArray(list)) throw new PythonError("sum() needs a list of numbers");
        return list.reduce((total: number, item) => total + Number(item), 0);
      }
      case "min": {
        const list = args.length === 1 && Array.isArray(args[0]) ? (args[0] as PyValue[]) : args;
        return list.reduce((best, item) => (compare(item, best) < 0 ? item : best));
      }
      case "max": {
        const list = args.length === 1 && Array.isArray(args[0]) ? (args[0] as PyValue[]) : args;
        return list.reduce((best, item) => (compare(item, best) > 0 ? item : best));
      }
      case "sorted": {
        if (!Array.isArray(args[0])) throw new PythonError("sorted() needs a list");
        const copy = [...args[0]];
        copy.sort((a, b) => compare(a, b));
        return copy;
      }
      case "list":
        return Array.isArray(args[0]) ? [...args[0]] : [...String(args[0] ?? "")];
      case "enumerate":
        if (!Array.isArray(args[0])) throw new PythonError("enumerate() needs a list");
        return args[0].map((item, index) => [index, item]);
      case "dict":
        return new Map();
      case "zip": {
        const lists = args.filter(Array.isArray) as PyValue[][];
        if (lists.length < 2) throw new PythonError("zip() needs at least two lists");
        const size = Math.min(...lists.map((list) => list.length));
        return Array.from({ length: size }, (_, index) => lists.map((list) => list[index]));
      }
      default:
        throw new PythonError(
          `"${name}" is not a built-in function in this playground`,
          undefined,
          "Available built-ins: print, input, len, range, int, float, str, bool, abs, round, sum, min, max, sorted, list, enumerate, zip.",
        );
    }
  };

  const lengthOf = (value: PyValue): number => {
    if (typeof value === "string") return value.length;
    if (Array.isArray(value)) return value.length;
    if (value instanceof Map) return value.size;
    throw new PythonError("len() works on strings, lists and dictionaries");
  };

  const compare = (a: PyValue, b: PyValue): number => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    const left = pyRepr(a);
    const right = pyRepr(b);
    return left < right ? -1 : left > right ? 1 : 0;
  };

  const evaluate = (node: Node, env: Env): PyValue => {
    checkStep(node.line as number | undefined);
    switch (node.kind) {
      case "literal":
        return node.value;
      case "name": {
        const name = node.name as string;
        if (["pi"].includes(name)) return Math.PI;
        return envGet(env, name);
      }
      case "fstring": {
        const raw = node.raw as string;
        return raw.replace(/\{\{|\}\}|\{([^{}]+)\}/g, (match, expression: string) => {
          if (match === "{{") return "{";
          if (match === "}}") return "}";
          const [expressionSource, spec] = expression.split(":");
          const value = evaluate(new Parser(tokenize(expressionSource.trim())).parseExpression(), env);
          if (spec) {
            if (typeof value === "number") return formatNumber(value, spec.trim());
            const text = pyStr(value);
            const widthMatch = /^([<>^]?)(\d+)$/.exec(spec.trim());
            if (widthMatch) {
              const [, align, width] = widthMatch;
              const size = parseInt(width, 10);
              const pad = " ".repeat(Math.max(0, size - text.length));
              if (align === "<") return text + pad;
              if (align === "^") return pad.slice(0, Math.floor(pad.length / 2)) + text + pad.slice(0, Math.ceil(pad.length / 2));
              return pad + text;
            }
            return text;
          }
          return pyStr(value);
        });
      }
      case "list":
        return (node.items as Node[]).map((item) => evaluate(item, env));
      case "dict": {
        const map = new Map<string, PyValue>();
        for (const entry of node.entries as { key: Node; value: Node }[]) {
          map.set(String(evaluate(entry.key, env)), evaluate(entry.value, env));
        }
        return map;
      }
      case "unary": {
        const value = evaluate(node.operand as Node, env);
        if (node.operator === "not") return !truthy(value);
        if (node.operator === "-") return -Number(value);
        return Number(value);
      }
      case "logical": {
        const left = evaluate(node.left as Node, env);
        if (node.operator === "and") return truthy(left) ? evaluate(node.right as Node, env) : left;
        return truthy(left) ? left : evaluate(node.right as Node, env);
      }
      case "compare": {
        const left = evaluate(node.left as Node, env);
        const right = evaluate(node.right as Node, env);
        switch (node.operator) {
          case "==":
            return pyRepr(left) === pyRepr(right);
          case "!=":
            return pyRepr(left) !== pyRepr(right);
          case "<":
            return compare(left, right) < 0;
          case ">":
            return compare(left, right) > 0;
          case "<=":
            return compare(left, right) <= 0;
          case ">=":
            return compare(left, right) >= 0;
          case "in":
            return contains(right, left);
          case "not in":
            return !contains(right, left);
          default:
            throw new PythonError(`Unknown operator ${String(node.operator)}`);
        }
      }
      case "binary":
        return binaryOp(node.operator as string, evaluate(node.left as Node, env), evaluate(node.right as Node, env));
      case "index": {
        const target = evaluate(node.target as Node, env);
        const index = evaluate(node.index as Node, env);
        return indexValue(target, index);
      }
      case "attr": {
        const target = evaluate(node.target as Node, env);
        return getAttribute(target, node.attr as string);
      }
      case "call": {
        const calleeNode = node.callee as Node;
        const args = (node.args as Node[]).map((arg) => evaluate(arg, env));
        const kwargs: Record<string, PyValue> = {};
        for (const kwarg of (node.kwargs as { name: string; value: Node }[]) ?? []) {
          kwargs[kwarg.name] = evaluate(kwarg.value, env);
        }
        if (calleeNode.kind === "name") {
          const name = calleeNode.name as string;
          if (!hasInParents(env, name)) {
            return builtins(name, args, kwargs);
          }
        }
        const callee = evaluate(calleeNode, env);
        if (callee && typeof callee === "object" && "__function" in (callee as object)) {
          return (callee as { __function: (...a: PyValue[]) => PyValue }).__function(...args);
        }
        if (callee && typeof callee === "object" && "__userFunction" in (callee as object)) {
          const fn = (callee as { __userFunction: { params: { name: string; default: Node | null }[]; body: Node[]; name: string } }).__userFunction;
          const fnEnv = createEnv(env);
          fn.params.forEach((param, index) => {
            if (index < args.length) fnEnv.vars.set(param.name, args[index]);
            else if (param.default) fnEnv.vars.set(param.name, evaluate(param.default, env));
            else throw new PythonError(`Function ${fn.name}() is missing the argument "${param.name}"`);
          });
          try {
            executeBlock(fn.body, fnEnv);
          } catch (signal) {
            if (signal instanceof ReturnSignal) return signal.value;
            throw signal;
          }
          return null;
        }
        throw new PythonError("This value cannot be called like a function");
      }
      default:
        throw new PythonError(`Unsupported expression: ${node.kind}`);
    }
  };

  const hasInParents = (env: Env, name: string): boolean => {
    let current: Env | null = env;
    while (current) {
      if (current.vars.has(name)) return true;
      current = current.parent;
    }
    return false;
  };

  const indexValue = (target: PyValue, index: PyValue): PyValue => {
    if (typeof target === "string") {
      let position = Number(index);
      if (position < 0) position = target.length + position;
      return target[position] ?? "";
    }
    if (Array.isArray(target)) {
      let position = Number(index);
      if (position < 0) position = target.length + position;
      const value = target[position];
      if (value === undefined) {
        throw new PythonError(`List index ${String(index)} is out of range`, undefined, `This list has ${target.length} items, so valid indexes are 0 to ${target.length - 1}.`);
      }
      return value;
    }
    if (target instanceof Map) {
      if (!target.has(String(index))) {
        throw new PythonError(`The key "${String(index)}" is not in this dictionary`, undefined, "Use .get(key, default) if the key might be missing.");
      }
      return target.get(String(index));
    }
    throw new PythonError("You can only use [ ] with strings, lists and dictionaries");
  };

  const contains = (container: PyValue, item: PyValue): boolean => {
    if (typeof container === "string") return container.includes(String(item));
    if (Array.isArray(container)) return container.some((entry) => pyRepr(entry) === pyRepr(item));
    if (container instanceof Map) return container.has(String(item));
    throw new PythonError("The 'in' keyword works with strings, lists and dictionaries");
  };

  const binaryOp = (operator: string, left: PyValue, right: PyValue): PyValue => {
    if (operator === "+" && typeof left === "string" && typeof right === "string") return left + right;
    if (operator === "*" && typeof left === "string" && typeof right === "number") return left.repeat(Math.max(0, Math.trunc(right)));
    if (operator === "*" && typeof right === "string" && typeof left === "number") return right.repeat(Math.max(0, Math.trunc(left)));
    if (operator === "+" && Array.isArray(left) && Array.isArray(right)) return [...left, ...right];
    if (operator === "*" && Array.isArray(left) && typeof right === "number") {
      const result: PyValue[] = [];
      for (let i = 0; i < right; i += 1) result.push(...left);
      return result;
    }
    if (operator === "+" && typeof left === "string" && typeof right === "number") {
      throw new PythonError("Cannot add a number to a string directly", undefined, 'Convert it first, for example: str(score) + " points" or use an f-string: f"Score: {score}"');
    }
    const a = Number(left);
    const b = Number(right);
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) throw new PythonError("You cannot divide by zero", undefined, "Check the value of the divisor before dividing.");
        return a / b;
      case "//":
        if (b === 0) throw new PythonError("You cannot divide by zero");
        return Math.floor(a / b);
      case "%":
        if (b === 0) throw new PythonError("You cannot use modulo with zero");
        return ((a % b) + b) % b;
      case "**":
        return a ** b;
      default:
        throw new PythonError(`Unknown operator ${operator}`);
    }
  };

  const executeBlock = (body: Node[], env: Env): void => {
    for (const statement of body) execute(statement, env);
  };

  const assignTo = (target: Node, env: Env, value: PyValue) => {
    if (target.kind === "name") {
      envSet(env, target.name as string, value);
      if (env.parent === null) env.vars.set(target.name as string, value);
      return;
    }
    if (target.kind === "index") {
      const container = evaluate(target.target as Node, env);
      const index = evaluate(target.index as Node, env);
      if (Array.isArray(container)) {
        const position = Number(index);
        if (position < 1 || position > container.length) {
          throw new PythonError(`Cannot assign to index ${position}`, undefined, "Assigning a new list position requires append().");
        }
        container[position - 1] = value;
        return;
      }
      if (container instanceof Map) {
        container.set(String(index), value);
        return;
      }
      throw new PythonError("Cannot assign into this value");
    }
    if (target.kind === "attr") {
      const attr = target.attr as string;
      const subject = target.target as Node;
      if (subject.kind === "name") {
        envSet(env, `${subject.name as string}.${attr}`, value);
        return;
      }
    }
    throw new PythonError("Unsupported assignment target");
  };

  const execute = (node: Node, env: Env): void => {
    checkStep(node.line as number | undefined);
    switch (node.kind) {
      case "pass":
        return;
      case "expr":
        evaluate(node.expression as Node, env);
        return;
      case "assign": {
        const operator = node.operator as string;
        let value: PyValue;
        if (operator === "=") {
          value = evaluate(node.value as Node, env);
        } else {
          const current = evaluate(node.target as Node, env);
          const next = evaluate(node.value as Node, env);
          value = binaryOp(operator.replace("=", ""), current, next);
          if (node.target && (node.target as Node).kind === "name") {
            const name = (node.target as Node).name as string;
            envSet(env, name, value);
            return;
          }
        }
        assignTo(node.target as Node, env, value);
        return;
      }
      case "if": {
        for (const branch of node.branches as { test: Node | null; body: Node[] }[]) {
          if (branch.test === null || truthy(evaluate(branch.test, env))) {
            executeBlock(branch.body, createEnv(env));
            return;
          }
        }
        return;
      }
      case "while": {
        let iterations = 0;
        while (truthy(evaluate(node.test as Node, env))) {
          iterations += 1;
          if (iterations > 50_000) {
            throw new PythonError(
              "This while loop has run 50,000 times without stopping",
              node.line as number,
              "Make sure something inside the loop changes the condition — for example: i += 1",
            );
          }
          try {
            executeBlock(node.body as Node[], createEnv(env));
          } catch (signal) {
            if (signal instanceof BreakSignal) break;
            if (signal instanceof ContinueSignal) continue;
            throw signal;
          }
        }
        return;
      }
      case "for": {
        const iterable = evaluate(node.iterable as Node, env);
        let items: PyValue[];
        if (Array.isArray(iterable)) items = iterable;
        else if (typeof iterable === "string") items = iterable.split("");
        else if (iterable instanceof Map) items = [...iterable.keys()];
        else throw new PythonError("A for loop needs something to loop over — a list, string or dictionary", node.line as number, "For example: for i in range(5):");

        for (const item of items) {
          const loopEnv = createEnv(env);
          const targets = node.targets as string[];
          if (targets.length === 1) loopEnv.vars.set(targets[0], item);
          else if (Array.isArray(item)) {
            targets.forEach((name, index) => loopEnv.vars.set(name, item[index]));
          } else {
            throw new PythonError("This loop wants two variables but the items are single values");
          }
          try {
            executeBlock(node.body as Node[], loopEnv);
          } catch (signal) {
            if (signal instanceof BreakSignal) break;
            if (signal instanceof ContinueSignal) continue;
            throw signal;
          }
        }
        return;
      }
      case "def": {
        env.vars.set(node.name as string, {
          __userFunction: { params: node.params, body: node.body, name: node.name },
        });
        return;
      }
      case "return":
        throw new ReturnSignal(node.value ? evaluate(node.value as Node, env) : null);
      case "break":
        throw new BreakSignal();
      case "continue":
        throw new ContinueSignal();
      case "try": {
        try {
          executeBlock(node.body as Node[], createEnv(env));
        } catch (error) {
          if (error instanceof PythonError) {
            const handler = node.handler as Node[];
            if (!handler.length) throw error;
            const handlerEnv = createEnv(env);
            if (node.errorName) handlerEnv.vars.set(node.errorName as string, error.message);
            executeBlock(handler, handlerEnv);
          } else {
            throw error;
          }
        }
        return;
      }
      default:
        throw new PythonError(`Unsupported statement: ${node.kind}`);
    }
  };

  try {
    const tokens = tokenize(source);
    const program = new Parser(tokens).parseProgram();
    const env = createEnv(null);
    env.vars.set("__name__", "__main__");
    executeBlock(program.body, env);
    return {
      output,
      steps,
      variables: Object.fromEntries(
        [...env.vars.entries()]
          .filter(([key]) => !key.startsWith("__"))
          .map(([key, value]) => [key, pyRepr(value)]),
      ),
    };
  } catch (error) {
    if (error instanceof PythonError) {
      return {
        output,
        error: { message: error.message, line: error.line, hint: error.hint },
        steps,
        variables: {},
      };
    }
    if (error instanceof BreakSignal) {
      return { output, error: { message: "'break' can only be used inside a loop", hint: "Remove the break or move it inside a for or while loop." }, steps, variables: {} };
    }
    if (error instanceof ContinueSignal) {
      return { output, error: { message: "'continue' can only be used inside a loop", hint: "Move the continue statement inside a loop." }, steps, variables: {} };
    }
    if (error instanceof ReturnSignal) {
      return { output, error: { message: "'return' can only be used inside a function", hint: "Indent the return line inside a def block." }, steps, variables: {} };
    }
    return {
      output,
      error: { message: error instanceof Error ? error.message : "Unknown error" },
      steps,
      variables: {},
    };
  }
}

/** Parse a single expression — used for f-string interpolation. */
