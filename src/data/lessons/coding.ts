import type { Lesson } from "../types";

/** Coding — Python, JavaScript, HTML/CSS and algorithms. */
export const codingLessons: Lesson[] = [
  {
    id: "python-first-program",
    title: "Python: Your First Program",
    subjectId: "coding",
    unitId: "python-basics",
    track: "coding",
    summary:
      "Write, run and break your first Python program — then make it talk to a real user.",
    difficulty: "Beginner",
    minutes: 15,
    xp: 110,
    tags: ["Python", "Beginner", "print", "Input"],
    objectives: [
      "Run Python code and read the output",
      "Print messages and ask the user for input",
      "Store values in variables and use them later",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A program is a list of instructions a computer follows exactly, in order. Python is one of the friendliest languages to start with because it reads almost like English.",
          "The classic first instruction is `print()`. It sends text to the screen — your program's way of talking to you.",
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Hello, EduTech!",
        code: 'print("Hello, EduTech!")\nprint("I am learning Python.")',
        output: "Hello, EduTech!\nI am learning Python.",
      },
      {
        type: "widget",
        widget: "playground",
        title: "Run it yourself",
        caption:
          "Edit the code on the left, then press Run. Change the message and see what happens.",
        config: {
          language: "python",
          code: 'print("Hello, EduTech!")\nprint("I am learning Python.")',
        },
      },
      {
        type: "keyTerms",
        terms: [
          { term: "print()", definition: "A function that shows text on the screen." },
          { term: "String", definition: "Text wrapped in quotes, like \"hello\" or 'EduTech'." },
          { term: "Variable", definition: "A named box that stores a value you can use later." },
          { term: "input()", definition: "A function that pauses the program and waits for the user to type something." },
        ],
      },
      {
        type: "steps",
        title: "Build it: a friendly greeter",
        steps: [
          {
            title: "Start with a message",
            body: "Print a welcome line so your program feels alive when it starts.",
            code: 'print("Welcome to my first program!")',
          },
          {
            title: "Store a value in a variable",
            body: "Create a variable for the user's name. The `=` sign means 'store this', not 'is equal to'.",
            code: 'name = "Alya"',
          },
          {
            title: "Use the variable",
            body: "Put the variable inside an f-string — note the `f` before the quotes. Anything inside curly braces is replaced by the value.",
            code: 'print(f"Hello, {name}! Ready to code?")',
          },
          {
            title: "Ask the user",
            body: "Replace the fixed name with `input()`. The text inside becomes the prompt shown to the user.",
            code: 'name = input("What is your name? ")\nprint(f"Nice to meet you, {name}!")',
          },
          {
            title: "Add the numbers",
            body: "`input()` always returns text. Wrap it in `int()` to turn the answer into a number you can do maths with.",
            code: 'age = int(input("How old are you? "))\nprint(f"In 10 years you will be {age + 10}.")',
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Quotes must match",
        body: "If you open a string with `\"`, close it with `\"`. Mixing quotes is the most common beginner error — `print(\"hello')` will fail with a SyntaxError.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Python is everywhere",
        body: "Python powers Instagram's backend, NASA's data analysis, and most of the machine-learning models in use today. The `print()` you just wrote is the same function those systems start with.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Debug like a pro",
        body: "Read errors from the **last line upwards** — Python tells you the file, the line number and the problem. If your output looks wrong, add a temporary `print()` to check the value of a variable.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What does `print(\"Hi\")` do?",
        options: ["Saves the word Hi", "Shows Hi on the screen", "Asks the user a question", "Deletes a variable"],
        answer: 1,
        explanation: "`print()` displays whatever you give it in the output area of your program.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "To ask the user to type something, use the _______ function.",
        answer: ["input", "input()"],
        explanation: "`input()` pauses the program and waits for the user to type text and press Enter.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "`age = \"12\"` stores the number 12 that you can add 1 to.",
        answer: false,
        explanation:
          "Anything in quotes is text. `\"12\"` is a string, so you would need `int(age)` before doing maths.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which line prints: `Score: 50` if the variable `score` holds 50?",
        options: [
          'print("Score: score")',
          'print(f"Score: {score}")',
          'print(Score: {score})',
          'print("Score" + 50)',
        ],
        answer: 1,
        explanation:
          "An f-string with curly braces inserts the value of a variable into the text.",
        points: 20,
      },
    ],
    updatedAt: "2026-08-25",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "python-loops",
    title: "Python: Loops That Do the Work",
    subjectId: "coding",
    unitId: "control-flow",
    track: "coding",
    summary:
      "Stop repeating yourself. Use `for` and `while` loops to repeat work — and see exactly what happens on each turn.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Python", "Loops", "for", "while", "Algorithms"],
    objectives: [
      "Repeat instructions with a `for` loop",
      "Understand when a `while` loop is the better choice",
      "Avoid the classic infinite-loop bug",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Computers are brilliant at doing the same thing over and over without getting bored. Humans are not. A **loop** hands the boring part to the computer.",
          "Two loops cover almost everything: `for` repeats a set number of times (or over a list of items), and `while` repeats as long as a condition stays true.",
        ],
      },
      {
        type: "compare",
        title: "for vs while",
        columns: [
          {
            title: "for — when you know the count",
            tone: "good",
            items: [
              "Repeat 10 times: `for i in range(10):`",
              "Walk through a list of items",
              "Predictable, easy to read, hardest to break",
            ],
          },
          {
            title: "while — when you don't",
            tone: "neutral",
            items: [
              "Keep going until the user guesses right",
              "Repeat while a value is under a limit",
              "Powerful, but needs a way out",
            ],
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Your first loop",
        code: 'for lap in range(1, 6):\n    print(f"Lap {lap}")',
        output: "Lap 1\nLap 2\nLap 3\nLap 4\nLap 5",
      },
      {
        type: "callout",
        variant: "info",
        title: "range() is half-open",
        body: "`range(1, 6)` gives 1, 2, 3, 4, 5 — it stops *before* the second number. `range(5)` starts at 0 and gives 0, 1, 2, 3, 4. This trips up everybody once.",
      },
      {
        type: "widget",
        widget: "playground",
        title: "Experiment with loops",
        caption:
          "Press Run and watch each line appear in order. Then change `range(1, 6)` to `range(1, 4)` and predict the output before you run it.",
        config: {
          language: "python",
          code: 'total = 0\n\nfor lap in range(1, 6):\n    total = total + lap\n    print(f"Lap {lap}: running total is {total}")\n\nprint(f"Finished! Total distance score: {total}")',
        },
      },
      {
        type: "steps",
        title: "Build it: a times-table trainer",
        steps: [
          {
            title: "Pick a number",
            body: "Store the table you want to practise in a variable.",
            code: "number = 7",
          },
          {
            title: "Loop through 1 to 12",
            body: "Use a `for` loop over `range(1, 13)` and print the multiplication each time.",
            code: 'for i in range(1, 13):\n    print(f"{number} x {i} = {number * i}")',
          },
          {
            title: "Add a pattern",
            body: "Print a line of stars first so the output looks like a proper worksheet. Repeating a character is a loop too: `\"*\" * 20`.",
            code: 'print("=" * 20)\nprint(f" {number} times table")\nprint("=" * 20)',
          },
          {
            title: "Count with while",
            body: "Rewrite it with `while`. Notice you must change the counter yourself — forget that line and the loop never ends.",
            code: "i = 1\nwhile i <= 12:\n    print(f\"{number} x {i} = {number * i}\")\n    i += 1",
          },
          {
            title: "Break out early",
            body: "Stop the loop as soon as the answer passes 50 using `break`. Loops you can exit are far more flexible.",
            code: "for i in range(1, 13):\n    answer = number * i\n    if answer > 50:\n        break\n    print(answer)",
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Loops inside loops",
        code: 'for row in range(1, 4):\n    line = ""\n    for star in range(row):\n        line = line + "*"\n    print(line)',
        output: "*\n**\n***",
      },
      {
        type: "list",
        title: "Loop survival checklist",
        ordered: true,
        items: [
          "Does every `while` loop change something so the condition can become false?",
          "Is the code inside the loop indented (4 spaces)?",
          "Is the variable name inside the loop different from the one being changed?",
          "If your program hangs, it is almost always an infinite loop — stop and re-read the condition.",
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Loops run the world",
        body: "Your phone's battery percentages, the frames in every game, the pixels on this page — all produced by loops running millions of times a second.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "How many times does `for i in range(4):` repeat?",
        options: ["3", "4", "5", "Forever"],
        answer: 1,
        explanation: "`range(4)` produces 0, 1, 2, 3 — four values, so four repeats.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "`range(1, 6)` produces the numbers 1, 2, 3, 4 and _______.",
        answer: ["5"],
        explanation: "The end value of `range` is never included, so the last number is 5.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "A `while` loop keeps running forever if nothing inside it changes the condition.",
        answer: true,
        explanation:
          "That is an infinite loop. Always make sure something inside the loop can eventually make the condition false.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match the keyword to its job.",
        pairs: [
          { left: "for", right: "Repeat over a known range or list" },
          { left: "while", right: "Repeat until a condition becomes false" },
          { left: "break", right: "Exit the loop immediately" },
          { left: "range", right: "Generate a sequence of numbers" },
        ],
        explanation:
          "Together these four give you full control over repetition in Python.",
        points: 25,
      },
      {
        id: "q5",
        type: "multipleChoice",
        prompt: "What does `for i in range(2, 8, 2)` print?",
        options: ["2 3 4 5 6 7", "2 4 6", "2 4 6 8", "0 2 4 6"],
        answer: 1,
        explanation:
          "The third value is the step: start at 2, add 2 each time, stop before 8 → 2, 4, 6.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-01",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "python-conditionals",
    title: "Python: Decisions with if, elif and else",
    subjectId: "coding",
    unitId: "control-flow",
    track: "coding",
    summary:
      "Teach your program to choose between paths — grade a score, validate input and build a simple quiz bot.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Python", "Conditions", "Logic", "Booleans"],
    objectives: [
      "Compare values with `==`, `>`, `<` and `!=`",
      "Chain decisions with `elif`",
      "Combine conditions using `and`, `or` and `not`",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Every interesting program makes decisions: is the player alive? Is the password correct? Is this student's score a pass? In Python those questions are written with `if`.",
          "A condition is an expression that evaluates to either `True` or `False`. That is a **boolean**, and it is the switch that controls the flow of your program.",
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Your first decision",
        code: 'score = 82\n\nif score >= 80:\n    print("Excellent work!")\nelif score >= 60:\n    print("Good — keep practising.")\nelse:\n    print("Let us review this topic together.")',
        output: "Excellent work!",
      },
      {
        type: "table",
        title: "Comparison operators",
        headers: ["Operator", "Meaning", "Example that is True"],
        rows: [
          ["==", "is equal to", "5 == 5"],
          ["!=", "is not equal to", "5 != 3"],
          ["> / >=", "greater than / at least", "7 > 2"],
          ["< / <=", "less than / at most", "3 <= 3"],
          ["in", "appears inside", '"a" in "cat"'],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "= is not ==",
        body: "One equals sign **stores** a value (`score = 10`). Two equals signs **compare** values (`if score == 10`). Using one instead of the other is the number-one beginner bug.",
      },
      {
        type: "widget",
        widget: "playground",
        title: "Try the grade calculator",
        caption:
          "Change the value of `score` and run again. Try 45, 60, 79 and 100 to see every branch.",
        config: {
          language: "python",
          code: 'score = 82\nattendance = 0.9\n\nif score >= 80 and attendance >= 0.8:\n    grade = "A"\nelif score >= 60:\n    grade = "B"\nelse:\n    grade = "C"\n\nprint(f"Score: {score}")\nprint(f"Attendance: {attendance * 100:.0f}%")\nprint(f"Final grade: {grade}")\n\nif score >= 60 or attendance >= 0.95:\n    print("Result: PASS")\nelse:\n    print("Result: needs review")',
        },
      },
      {
        type: "steps",
        title: "Build it: a tiny quiz bot",
        steps: [
          {
            title: "Ask the question",
            body: "Use `input()` to collect the answer, and clean it up with `.lower()` so capital letters do not matter.",
            code: 'answer = input("What language are we learning? ").lower()',
          },
          {
            title: "Check the answer",
            body: "Compare with `==`. Remember: text comparisons are case-sensitive, which is why `.lower()` helps.",
            code: 'if answer == "python":\n    print("Correct! +10 points")',
          },
          {
            title: "Handle close answers",
            body: "Good quiz bots are forgiving. Use `in` to accept several spellings.",
            code: 'if answer in ("python", "py"):\n    print("Correct!")',
          },
          {
            title: "Add a fallback",
            body: "Always give feedback when the answer is wrong — silence confuses users.",
            code: 'else:\n    print("Not quite. The answer is Python — the language named after a comedy group.")',
          },
          {
            title: "Keep score across rounds",
            body: "Track a `points` variable and report the total at the end. Now it is a real quiz.",
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Combining conditions",
        code: 'points = 0\n\na1 = input("1) What does print() do? ").lower()\nif "show" in a1 or "display" in a1:\n    points += 10\n    print("Correct!")\nelse:\n    print("It shows text on the screen.")\n\na2 = input("2) Which loop repeats a known number of times? ").lower()\nif a2 == "for":\n    points += 10\n    print("Correct!")\nelse:\n    print("The answer is: for")\n\nprint(f"Total: {points} / 20")',
        output: "Total: 20 / 20",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Read your if-statements out loud",
        body: "If you cannot read your condition as a clear English sentence, simplify it. Real programmers use truth tables and plain language before writing nested conditions.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which operator checks whether two values are equal?",
        options: ["=", "==", "=>", "!="],
        answer: 1,
        explanation: "`==` compares values; `=` stores a value in a variable.",
        points: 20,
      },
      {
        id: "q2",
        type: "trueFalse",
        prompt: "`elif` is only checked when the previous `if` was false.",
        answer: true,
        explanation:
          "Python checks conditions in order and stops at the first one that is True, so `elif` runs only if everything above it failed.",
        points: 20,
      },
      {
        id: "q3",
        type: "fillBlank",
        prompt: "`True` and `False` are values of the _______ data type.",
        answer: ["boolean", "bool", "booleans"],
        explanation: "Booleans represent exactly two states — on or off, true or false.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "When is `age > 10 and age < 20` True?",
        options: ["Always", "When age is 15", "When age is 25", "Never"],
        answer: 1,
        explanation:
          "With `and`, both parts must be true, so age must sit between 11 and 19.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-04",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "javascript-interactivity",
    title: "JavaScript: Make a Page React",
    subjectId: "coding",
    unitId: "javascript",
    track: "coding",
    summary:
      "Add real interaction to a web page with JavaScript — buttons, click events and live text updates.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["JavaScript", "DOM", "Events", "Web"],
    objectives: [
      "Select elements on a page with JavaScript",
      "Respond to a click with an event handler",
      "Update text and styles from code",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "HTML gives a page structure, CSS gives it style, and **JavaScript gives it behaviour**. Without JavaScript a web page is a poster; with it, the page is an app.",
          "The trick is the **DOM** — the browser's live model of your HTML. JavaScript can read the DOM and change it, and the page updates instantly.",
        ],
      },
      {
        type: "diagram",
        title: "How a click becomes a change",
        nodes: [
          { emoji: "🖱️", title: "User clicks", detail: "The button receives the event" },
          { emoji: "🎧", title: "Listener fires", detail: "Your function is called" },
          { emoji: "🔍", title: "Pick elements", detail: "querySelector finds them" },
          { emoji: "✨", title: "Update the DOM", detail: "Text or style changes" },
        ],
      },
      {
        type: "widget",
        widget: "playground",
        title: "Live preview: score counter",
        caption:
          "The output panel is a real rendered page. Click the button in the preview to watch the JavaScript run.",
        config: {
          language: "html",
          code: '<h1 id="score">0</h1>\n<button id="add">Add a point</button>\n<p id="message">Press the button to begin.</p>\n\n<style>\n  body { font-family: system-ui, sans-serif; text-align: center; padding: 16px; }\n  h1 { font-size: 48px; margin: 8px 0; color: #6366f1; }\n  button { font-size: 16px; padding: 10px 18px; border-radius: 10px;\n           border: 0; background: #6366f1; color: white; cursor: pointer; }\n  button:hover { background: #4f46e5; }\n</style>\n\n<script>\n  let score = 0;\n  const scoreEl = document.getElementById("score");\n  const messageEl = document.getElementById("message");\n\n  document.getElementById("add").addEventListener("click", () => {\n    score = score + 1;\n    scoreEl.textContent = score;\n    messageEl.textContent = score >= 10\n      ? "Level up! You reached 10 points."\n      : "Keep going, you have " + (10 - score) + " to go.";\n  });\n</script>',
        },
      },
      {
        type: "steps",
        title: "Build it: from poster to app",
        steps: [
          {
            title: "Find your elements once",
            body: "`document.getElementById` grabs an element by its `id`. Store it in a `const` so you do not search again on every click.",
            code: 'const scoreEl = document.getElementById("score");',
          },
          {
            title: "Listen for the event",
            body: "`addEventListener` says 'when this happens, run this function'. The arrow function `() => {}` is the code that runs.",
            code: 'document.getElementById("add").addEventListener("click", () => {\n    score = score + 1;\n    scoreEl.textContent = score;\n});',
          },
          {
            title: "Change the view, not the data",
            body: "Notice the pattern: update the number first, then update what the user sees. Keeping data and display separate makes bigger apps much simpler.",
          },
          {
            title: "Add conditions",
            body: "Use `if` and `else` (or the shorter ternary `? :`) to change the message when the score passes 10 — instant feedback keeps players playing.",
          },
          {
            title: "Break it on purpose",
            body: "Change `textContent` to `innerHTML` and see the difference, then change the id in the HTML but not the JavaScript. Reading a real error — `Cannot read properties of null` — is the fastest way to learn the DOM.",
            hint: "Open the browser console with F12 to see JavaScript errors as they happen.",
          },
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "The same idea in plain JavaScript",
        code: 'const colors = ["#6366f1", "#22d3ee", "#f472b6", "#34d399"];\nlet index = 0;\n\nfunction nextColor() {\n  document.body.style.background = colors[index];\n  index = (index + 1) % colors.length;  // wrap back to the start\n}',
        output: "Each call paints the page in the next colour in the list.",
      },
      {
        type: "callout",
        variant: "info",
        title: "let, const and var",
        body: "Use `const` for values that never change (elements, functions) and `let` for values that do (counters, scores). Avoid `var` — it is the old style and behaves confusingly inside loops.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "One language, everywhere",
        body: "JavaScript runs in every browser, on servers with Node.js, and inside robotics boards like the Micro:bit. Once you know it, you can build almost anything.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What does the DOM represent?",
        options: [
          "The browser's live model of the page",
          "The downloaded image files",
          "The CSS stylesheet",
          "The web server",
        ],
        answer: 0,
        explanation:
          "The Document Object Model is the browser's structured, editable version of your HTML page.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "`element.addEventListener(\"click\", fn)` makes `fn` run when the element is _______.",
        answer: ["clicked", "click", "clicking"],
        explanation: "The first argument names the event you are listening for; here, a click.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "`const` should be used for values that will be reassigned later.",
        answer: false,
        explanation: "`const` means the binding cannot be reassigned — use `let` for counters and changing values.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which line puts the number 5 inside a heading element?",
        options: [
          'heading.innerHTML = "5"',
          'heading.text = 5',
          'heading.value = 5',
          'heading.write("5")',
        ],
        answer: 0,
        explanation:
          "`innerHTML` (or `textContent` for safety) replaces the content inside an element.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-08",
    author: "Ms. Sinta Wijaya · Web Development",
  },
  {
    id: "html-css-first-page",
    title: "HTML & CSS: Build Your First Real Web Page",
    subjectId: "coding",
    unitId: "web-pages",
    track: "coding",
    summary:
      "Structure a page with semantic HTML, then style it with modern CSS — flexbox, spacing and colour.",
    difficulty: "Beginner",
    minutes: 25,
    xp: 160,
    tags: ["HTML", "CSS", "Flexbox", "Web design"],
    objectives: [
      "Structure content with semantic HTML tags",
      "Style elements with CSS selectors",
      "Lay out a card with flexbox",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "HTML is the **structure** — headings, paragraphs, images, buttons. CSS is the **style** — colour, spacing, size, layout. Together they build everything you see on the web.",
          "The most important habit in modern web code is using **semantic tags**: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`. They describe what content *is*, which helps screen readers, search engines and future-you.",
        ],
      },
      {
        type: "compare",
        title: "HTML vs CSS",
        columns: [
          {
            title: "HTML — the skeleton",
            tone: "neutral",
            items: [
              "Tells the browser what each thing is",
              "Written with tags: `<h1>Hello</h1>`",
              "Content first, meaning first",
            ],
          },
          {
            title: "CSS — the paint & layout",
            tone: "good",
            items: [
              "Tells the browser how it should look",
              "Written with selectors: `h1 { color: navy; }`",
              "Handles spacing, colour, type and layout",
            ],
          },
        ],
      },
      {
        type: "widget",
        widget: "playground",
        title: "Edit a real page live",
        caption:
          "Everything here is real HTML, CSS and JavaScript. Change the colours, add a card, break it and fix it.",
        config: {
          language: "html",
          code: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px;\n           background: #0f172a; color: #e2e8f0; }\n    .card {\n      background: #1e293b;\n      border-radius: 18px;\n      padding: 20px;\n      max-width: 380px;\n      display: flex;\n      gap: 16px;\n      align-items: center;\n      box-shadow: 0 18px 40px -22px rgba(99,102,241,0.8);\n    }\n    .avatar {\n      width: 56px; height: 56px; border-radius: 50%;\n      display: grid; place-items: center; font-size: 28px;\n      background: linear-gradient(135deg, #6366f1, #22d3ee);\n    }\n    h2 { margin: 0 0 4px; font-size: 18px; }\n    p { margin: 0; color: #94a3b8; font-size: 14px; }\n    .tag { display: inline-block; margin-top: 10px; font-size: 12px;\n           background: rgba(99,102,241,0.2); color: #a5b4fc;\n           padding: 3px 10px; border-radius: 999px; }\n  </style>\n</head>\n<body>\n  <article class="card">\n    <div class="avatar">🤖</div>\n    <div>\n      <h2>Robotics Club</h2>\n      <p>Thursdays after school · Lab 2</p>\n      <span class="tag">12 members</span>\n    </div>\n  </article>\n</body>\n</html>',
        },
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Tag / element", definition: "A labelled piece of content, e.g. `<p>` for a paragraph." },
          { term: "Selector", definition: "The part of CSS that chooses what to style: `h1`, `.card`, `#header`." },
          { term: "Class", definition: "A reusable name you add to elements with `class=\"card\"` so CSS can find them." },
          { term: "Flexbox", definition: "A CSS layout mode that arranges items in a row or column, with easy spacing and alignment." },
        ],
      },
      {
        type: "steps",
        title: "Build it: a club card",
        steps: [
          {
            title: "Start with semantic structure",
            body: "Write the content first, with no styling at all. Use `<article>`, `<h2>` and `<p>` so the page makes sense before it looks good.",
            code: '<article class="card">\n  <div class="avatar">🤖</div>\n  <div>\n    <h2>Robotics Club</h2>\n    <p>Thursdays after school · Lab 2</p>\n  </div>\n</article>',
          },
          {
            title: "Add a class, then style it",
            body: "Give the article a `class`, then write one CSS rule for that class. One rule styles every card on the page — that is the whole point of CSS.",
            code: ".card {\n  background: #1e293b;\n  border-radius: 18px;\n  padding: 20px;\n}",
          },
          {
            title: "Lay it out with flexbox",
            body: "`display: flex` puts the avatar and the text side by side. `gap` spaces them, `align-items: center` lines them up neatly.",
            code: ".card {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}",
          },
          {
            title: "Style the avatar with a gradient",
            body: "A circular gradient badge needs only three lines. Rounded corners come from `border-radius: 50%`.",
            code: ".avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #6366f1, #22d3ee);\n}",
          },
          {
            title: "Check the accessibility",
            body: "Squint at your page. Can you still tell what matters most? Is the text readable against the background? Good design survives being blurred.",
          },
        ],
      },
      {
        type: "list",
        title: "HTML habits that will help you forever",
        items: [
          "One `<h1>` per page — it is the page title.",
          "Use `<button>` for actions and `<a>` for links. Never a clickable `<div>`.",
          "Always write `alt` text on images so screen readers can describe them.",
          "Indent children by two spaces: your future self will thank you.",
          "Test on a narrow window — most of your visitors are on phones.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Use the browser's inspector",
        body: "Right-click any element and choose **Inspect**. You can change CSS live, see the box model, and copy the exact styles you like from any site you admire (for learning, not for copying).",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which tag is the most semantic choice for a blog post's main content?",
        options: ["<div>", "<article>", "<span>", "<section>"],
        answer: 1,
        explanation:
          "`<article>` describes self-contained content like a post or product card. `<div>` says nothing about meaning.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "In CSS, a class named `card` is selected by writing `______`.",
        answer: [".card"],
        explanation: "A dot selects a class; `#card` would select an element with `id=\"card\"`.",
        points: 20,
      },
      {
        id: "q3",
        type: "multipleChoice",
        prompt: "Which CSS property places two child elements side by side?",
        options: ["display: flex", "display: block", "position: static", "text-align: center"],
        answer: 0,
        explanation:
          "`display: flex` turns the element into a flex container so children flow in a row by default.",
        points: 20,
      },
      {
        id: "q4",
        type: "trueFalse",
        prompt: "The `alt` attribute on an image is optional and only decorative.",
        answer: false,
        explanation:
          "`alt` text is essential for screen-reader users and appears when an image fails to load.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-09",
    author: "Ms. Sinta Wijaya · Web Development",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "python-lists-and-data",
    title: "Python: Lists, Dictionaries and Real Data",
    subjectId: "coding",
    unitId: "python-basics",
    track: "coding",
    summary: "Store many values at once and process them with loops.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["Python", "Lists", "Data"],
    objectives: ["Create and loop through lists", "Use dictionaries to store labelled data"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "algorithms-searching",
    title: "Algorithms: Searching and Sorting",
    subjectId: "coding",
    unitId: "algorithms",
    track: "coding",
    summary: "Compare linear and binary search, then sort a list the way computers do.",
    difficulty: "Intermediate",
    minutes: 30,
    xp: 200,
    tags: ["Algorithms", "Searching", "Sorting"],
    objectives: ["Explain binary search", "Trace a bubble sort"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "functions-and-reuse",
    title: "Functions: Write Once, Use Everywhere",
    subjectId: "coding",
    unitId: "python-basics",
    track: "coding",
    summary: "Package code into reusable functions with parameters and return values.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 175,
    tags: ["Python", "Functions", "Reuse"],
    objectives: ["Define and call functions", "Return values and reuse code"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Dimas Halim · Coding",
  },
];
