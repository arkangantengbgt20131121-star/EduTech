import type { Lesson } from "./types";

export const techLessons: Lesson[] = [
  // ─── ROBOTICS ────────────────────────────────────────────────
  {
    id: "r-microbit-hello",
    subjectId: "robotics",
    title: "Meet the Micro:bit: Your First Blinking Heart",
    description:
      "Unbox the micro:bit in your browser, learn its parts, and program a beating heart on the LED matrix.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["micro:bit", "LED", "MakeCode"],
    objectives: [
      "Name the main parts of the BBC micro:bit",
      "Show images and text on the 5×5 LED display",
      "Build a beating-heart animation with loops",
    ],
    sections: [
      {
        heading: "A computer smaller than your palm",
        body: [
          "The BBC micro:bit is a pocket-sized computer with 25 LEDs, two buttons, motion and temperature sensors, and even a radio — all on one tiny board. Schools in over 60 countries use it to learn coding and electronics.",
          "You don't need the physical board to start: EduTech has a built-in micro:bit simulator. Everything you learn here transfers directly to a real device later.",
        ],
      },
      {
        heading: "The 5×5 LED display",
        body: [
          "The front of the micro:bit is a grid of 25 red LEDs arranged 5 by 5. Each LED can be on or off, and by combining them you can draw icons, letters and simple animations.",
          "In MakeCode you can use blocks like 'show leds' to draw a picture, or 'show string' to scroll text. The display refreshes so fast that switching two pictures looks like animation.",
        ],
      },
      {
        heading: "forever loops keep programs alive",
        body: [
          "Most micro:bit programs live inside a 'forever' loop — a block of code that repeats endlessly. A beating heart is just two heart pictures shown one after another with a short pause between them.",
          "Timing matters: a pause of 500 milliseconds (half a second) between frames gives a calm heartbeat. Try 100 ms for an excited one!",
        ],
      },
    ],
    keyTerms: [
      { term: "Microcontroller", definition: "A tiny computer on a single chip that runs one program at a time." },
      { term: "LED", definition: "Light Emitting Diode — a small light that turns on when electricity flows through it." },
      { term: "Loop", definition: "Code that repeats. A forever loop repeats until the power is turned off." },
    ],
    examples: [
      {
        title: "Beating heart in MakeCode JavaScript",
        language: "javascript",
        code: "basic.forever(function () {\n  basic.showLeds(`\n    . # . # .\n    # # # # #\n    # # # # #\n    . # # # .\n    . . # . .\n  `)\n  basic.pause(500)\n  basic.showLeds(`\n    . . . . .\n    . # . # .\n    . # # # .\n    . . # . .\n    . . . . .\n  `)\n  basic.pause(500)\n})",
        explanation:
          "Two heart patterns alternate forever. The # symbols are lit LEDs and dots are unlit. Change the pause values to speed up or slow down the heartbeat.",
      },
    ],
    activity: {
      title: "Animate your own icon",
      description:
        "Design a 2-frame animation (open/closed eye, bouncing ball, pulsing star) using the simulator.",
      steps: [
        "Open the Micro:bit Simulator and clear the LED grid.",
        "Draw frame 1 of your animation by clicking LEDs on.",
        "Draw frame 2 with a small change (e.g. ball moved one row down).",
        "Run the animation and adjust the speed until it looks smooth.",
      ],
      hints: [
        "Small changes between frames look smoother than big jumps.",
        "Try 300–600 ms per frame as a starting speed.",
      ],
    },
    quiz: [
      {
        question: "How many LEDs are on the micro:bit display?",
        options: ["16", "25", "32", "64"],
        answer: 1,
        explanation: "The display is a 5 × 5 grid, so 5 × 5 = 25 LEDs.",
      },
      {
        question: "What does a 'forever' loop do?",
        options: [
          "Runs the code exactly 10 times",
          "Repeats the code endlessly",
          "Stops the program",
          "Connects to the internet",
        ],
        answer: 1,
        explanation: "A forever loop repeats its code endlessly until power is removed.",
      },
      {
        question: "Which block scrolls text across the display?",
        options: ["show leds", "show string", "pause", "clear screen"],
        answer: 1,
        explanation: "'show string' scrolls text one letter at a time across the LEDs.",
      },
    ],
    popular: true,
  },
  {
    id: "r-led-matrix",
    subjectId: "robotics",
    title: "LED Matrix Art & Animations",
    description:
      "Master brightness, plotting points and multi-frame animations to create pixel art that moves.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["micro:bit", "LED", "animation"],
    objectives: [
      "Plot and unplot individual LEDs by coordinates",
      "Use brightness to create depth in pixel art",
      "Build a 4-frame walking character animation",
    ],
    sections: [
      {
        heading: "Coordinates: finding any LED",
        body: [
          "Every LED has an address: x goes 0–4 from left to right, y goes 0–4 from top to bottom. So (0,0) is the top-left corner and (4,4) is the bottom-right.",
          "With 'plot x y' you light one LED, and with 'unplot x y' you turn it off. Combining plots in a sequence draws lines, borders and moving dots.",
        ],
      },
      {
        heading: "Brightness adds depth",
        body: [
          "LEDs aren't just on or off — each one supports 256 brightness levels (0–255). Low values glow dimly, high values shine brightly.",
          "Artists use this for shading: a ghost with a bright head fading to a dim tail looks far cooler than flat white pixels.",
        ],
      },
      {
        heading: "Animation is just fast pictures",
        body: [
          "Cartoons show 24 pictures per second; our matrix can show about 5–10 frames per second and still look alive. Plan your frames on paper first, then code each as a picture with pauses between.",
          "A walking character needs at least 2 leg positions. Alternate them while shifting the whole sprite sideways for a moonwalk effect.",
        ],
      },
    ],
    keyTerms: [
      { term: "Pixel", definition: "One dot of light. The micro:bit display has 25 pixels." },
      { term: "Coordinate", definition: "An (x, y) address that locates one LED on the grid." },
      { term: "Frame", definition: "One still picture in an animation sequence." },
    ],
    examples: [
      {
        title: "Chasing dot with coordinates",
        language: "javascript",
        code: "basic.forever(function () {\n  for (let x = 0; x <= 4; x++) {\n    led.plot(x, 2)\n    basic.pause(200)\n    led.unplot(x, 2)\n  }\n})",
        explanation:
          "A dot travels along the middle row (y = 2). plot() lights each LED, pause() waits, then unplot() erases it before the next one lights.",
      },
      {
        title: "Fading ghost with brightness",
        language: "javascript",
        code: "for (let brightness = 0; brightness <= 255; brightness += 51) {\n  led.plotBrightness(2, 2, brightness)\n  basic.pause(150)\n}",
        explanation:
          "plotBrightness(x, y, level) sets one LED's glow from 0 (off) to 255 (full). This fades the center LED in smoothly.",
      },
    ],
    activity: {
      title: "Pixel-art emoji walk",
      description: "Create a 2-frame walking emoji and make it travel across the matrix.",
      steps: [
        "Sketch two frames of a simple character (legs apart / legs together).",
        "Code frame 1 with showLeds and a 300 ms pause.",
        "Code frame 2 with showLeds and a 300 ms pause inside a forever loop.",
        "Bonus: shift the sprite one column each cycle using plot coordinates.",
      ],
      hints: [
        "Keep your character 3 columns wide so it fits while moving.",
        "Use brightness on the eyes to make them pop.",
      ],
    },
    quiz: [
      {
        question: "Which coordinate is the center of the display?",
        options: ["(0, 0)", "(2, 2)", "(4, 4)", "(5, 5)"],
        answer: 1,
        explanation: "x and y both run 0–4, so the exact middle is (2, 2).",
      },
      {
        question: "What is the maximum brightness value of an LED?",
        options: ["100", "255", "5", "1000"],
        answer: 1,
        explanation: "Brightness ranges from 0 (off) to 255 (full brightness).",
      },
      {
        question: "Why do animations need pauses between frames?",
        options: [
          "To save battery",
          "So each frame stays visible long enough to see",
          "To cool down the LEDs",
          "Pauses are not needed",
        ],
        answer: 1,
        explanation: "Without pauses the frames would flash by too fast for eyes to follow.",
      },
    ],
  },
  {
    id: "r-buttons-sensors",
    subjectId: "robotics",
    title: "Buttons, Shake & Sensors",
    description:
      "Make your micro:bit react to the world: buttons, gestures, temperature and light.",
    level: "Intermediate",
    durationMin: 30,
    xp: 80,
    tags: ["micro:bit", "sensors", "input"],
    objectives: [
      "Handle button A, B and A+B press events",
      "Detect shake gestures with the accelerometer",
      "Read temperature and light level sensors",
    ],
    sections: [
      {
        heading: "Events: when this happens, do that",
        body: [
          "Interactive programs are built from events. 'on button A pressed' runs code only when someone presses A. Your program can listen for many events at once — buttons, shakes, even a logo touch.",
          "Events make programs feel alive because they respond to people instead of just running blindly from top to bottom.",
        ],
      },
      {
        heading: "The accelerometer feels motion",
        body: [
          "Inside the micro:bit, a tiny accelerometer measures acceleration in three directions. MakeCode turns this into friendly gestures: shake, tilt left/right, face up/down and freefall.",
          "Shake is perfect for dice, magic 8-balls and step counters. The 'acceleration' block even gives exact numbers for building a spirit level.",
        ],
      },
      {
        heading: "Hidden sensors everywhere",
        body: [
          "The micro:bit also senses temperature (using the processor chip) and light (using the LEDs themselves in reverse!). Readings are approximate but great for experiments.",
          "Combine sensors with logic: if temperature > 30°C show a sun icon, else show a snowflake. Congratulations — you built a weather station.",
        ],
      },
    ],
    keyTerms: [
      { term: "Event", definition: "Something that happens (button press) that triggers code to run." },
      { term: "Accelerometer", definition: "A sensor that measures motion and tilt." },
      { term: "Input", definition: "Information flowing into the computer from the outside world." },
    ],
    examples: [
      {
        title: "Magic fortune teller",
        language: "javascript",
        code: 'input.onButtonPressed(Button.A, function () {\n  basic.showString("HI!")\n})\ninput.onGesture(Gesture.Shake, function () {\n  let fortune = randint(0, 2)\n  if (fortune == 0) {\n    basic.showString("YES")\n  } else if (fortune == 1) {\n    basic.showString("NO")\n  } else {\n    basic.showString("MAYBE")\n  }\n})',
        explanation:
          "Button A shows a greeting. Shaking picks a random number 0–2 and shows a fortune. randint() is how programs make random choices.",
      },
    ],
    activity: {
      title: "Build a digital dice",
      description: "Shake to roll a dice that shows 1–6 as LED pips.",
      steps: [
        "Add an 'on shake' event block.",
        "Generate a random number from 1 to 6.",
        "Display the number with showNumber (or draw pips with plot).",
        "Test 10 shakes — does every number appear? That's randomness!",
      ],
      hints: [
        "randint(1, 6) gives each number an equal chance.",
        "Add a short dice-shaking animation before revealing the result.",
      ],
    },
    quiz: [
      {
        question: "Which sensor detects a shake?",
        options: ["Thermometer", "Accelerometer", "Compass", "Microphone"],
        answer: 1,
        explanation: "The accelerometer measures motion, which MakeCode converts into gestures like shake.",
      },
      {
        question: "How does the micro:bit sense light?",
        options: [
          "With a camera",
          "Using the LEDs in reverse",
          "It cannot sense light",
          "With a solar panel",
        ],
        answer: 1,
        explanation: "Cleverly, the LED matrix doubles as a light sensor when read in reverse.",
      },
      {
        question: "What is an event handler?",
        options: [
          "Code that runs when something happens",
          "A type of battery",
          "A broken program",
          "The USB cable",
        ],
        answer: 0,
        explanation: "Event handlers like 'on button pressed' run their code in response to events.",
      },
    ],
    popular: true,
  },
  {
    id: "r-reaction-game",
    subjectId: "robotics",
    title: "Build a Reaction Timer Game",
    description:
      "Combine LEDs, buttons and timing to create a 2-player reaction game — then challenge your friends.",
    level: "Intermediate",
    durationMin: 35,
    xp: 100,
    tags: ["micro:bit", "game", "project"],
    objectives: [
      "Measure reaction time in milliseconds",
      "Use game states: waiting, ready and result",
      "Add scoring and a winner announcement",
    ],
    sections: [
      {
        heading: "Designing the game loop",
        body: [
          "Every game has states. Ours has three: WAITING (showing dots while players get ready), GO (a surprise signal after a random delay), and RESULT (showing who pressed first and their time).",
          "The random delay is the secret sauce — if the signal always came after 3 seconds, players would anticipate it instead of reacting.",
        ],
      },
      {
        heading: "Timing with running time",
        body: [
          "The 'running time (ms)' block returns milliseconds since the micro:bit powered on. Record the time when GO appears, record it again when a button is pressed, and subtract: that's the reaction time.",
          "Average human reaction is about 250 ms. Under 200 ms is excellent — under 100 ms usually means someone cheated by pressing early!",
        ],
      },
      {
        heading: "Fair play: catching cheaters",
        body: [
          "Real games handle cheating. If a player presses during the WAITING state, set a flag and show an X — they lose the round.",
          "This teaches an important programming concept: the same button press means different things in different states. Always check the state first!",
        ],
      },
    ],
    keyTerms: [
      { term: "Game state", definition: "What mode the game is currently in (waiting, playing, over)." },
      { term: "Millisecond", definition: "One thousandth of a second — the unit of reaction time." },
      { term: "Flag variable", definition: "A variable that remembers yes/no information, like 'cheated'." },
    ],
    examples: [
      {
        title: "Reaction timer core logic",
        language: "javascript",
        code: 'let startTime = 0\nlet waiting = true\n\nbasic.showString("READY")\nbasic.pause(randint(1000, 4000))\nwaiting = false\nstartTime = input.runningTime()\nbasic.showIcon(IconNames.Yes)\n\ninput.onButtonPressed(Button.A, function () {\n  if (waiting) {\n    basic.showIcon(IconNames.No) // pressed too early!\n  } else {\n    let reaction = input.runningTime() - startTime\n    basic.showNumber(reaction)\n  }\n})',
        explanation:
          "After a random 1–4 second pause the checkmark appears and timing starts. Pressing early shows an X; pressing after shows your time in ms.",
      },
    ],
    activity: {
      title: "Tournament edition",
      description: "Extend the game for 2 players with a best-of-3 score system.",
      steps: [
        "Assign button A to player 1 and button B to player 2.",
        "Track scores in two variables (scoreA, scoreB).",
        "First to press after GO wins the round; first to 2 round-wins takes the match.",
        "Show the champion with a scrolling 'P1 WINS' or 'P2 WINS' message.",
      ],
      hints: [
        "Disable further presses after the first one each round with a 'roundOver' flag.",
        "Use A+B together to reset scores for a rematch.",
      ],
    },
    quiz: [
      {
        question: "Why should the GO delay be random?",
        options: [
          "To save battery",
          "So players must react instead of predicting",
          "Random code runs faster",
          "It is required by law",
        ],
        answer: 1,
        explanation: "A fixed delay lets players anticipate; randomness forces genuine reaction.",
      },
      {
        question: "How is reaction time calculated?",
        options: [
          "press time − signal time",
          "signal time − press time",
          "press time + signal time",
          "It cannot be calculated",
        ],
        answer: 0,
        explanation: "Subtract the moment GO appeared from the moment the button was pressed.",
      },
      {
        question: "What is a typical human reaction time?",
        options: ["25 ms", "250 ms", "2500 ms", "25 seconds"],
        answer: 1,
        explanation: "Most people react in roughly 200–300 milliseconds.",
      },
    ],
  },

  // ─── CODING ──────────────────────────────────────────────────
  {
    id: "c-python-basics",
    subjectId: "coding",
    title: "Python Basics: Variables & Print",
    description:
      "Write your first Python programs: printing, variables, input and simple math.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["python", "variables", "beginner"],
    objectives: [
      "Use print() to display output",
      "Store data in variables",
      "Read user input and do basic math",
    ],
    sections: [
      {
        heading: "Python: the friendly giant",
        body: [
          "Python powers Instagram, Netflix recommendations and even NASA tools — yet reads almost like English. That's why it's the world's most popular first language.",
          "In Python, print('Hello!') displays text. The parentheses hold arguments, and quotes mark text (called a string). Simple, readable, powerful.",
        ],
      },
      {
        heading: "Variables are labeled boxes",
        body: [
          "A variable stores a value for later: score = 100 puts 100 in a box labeled score. You can read it (print(score)) or change it (score = 150).",
          "Python figures out types automatically: 42 is an integer, 3.14 is a float (decimal), and 'EduTech' is a string. Use clear names — player_name beats x every time.",
        ],
      },
      {
        heading: "Talking to the user",
        body: [
          "input('Your name: ') pauses the program and waits for typing. Whatever is typed comes back as a string — wrap it in int() to do math with it: age = int(input('Age: ')).",
          "Combine everything and you can build a greeting bot, a tip calculator or a quiz game in under 10 lines. That's the magic of Python.",
        ],
      },
    ],
    keyTerms: [
      { term: "String", definition: "Text data wrapped in quotes, e.g. 'hello'." },
      { term: "Variable", definition: "A named container that stores a value." },
      { term: "Function", definition: "A reusable command like print() or input()." },
    ],
    examples: [
      {
        title: "Greeting bot",
        language: "python",
        code: 'name = input("What is your name? ")\nage = int(input("How old are you? "))\n\nprint("Hello, " + name + "!")\nprint("Next year you will be", age + 1)',
        explanation:
          "input() reads text, int() converts age to a number, and print() combines strings with + and commas. Run it in the Coding Playground!",
      },
      {
        title: "Tip calculator",
        language: "python",
        code: 'bill = float(input("Bill total: Rp "))\ntip = bill * 0.10\nprint("Tip (10%): Rp", tip)\nprint("Total to pay: Rp", bill + tip)',
        explanation:
          "float() allows decimals. Multiplying by 0.10 computes 10%. Real programs look exactly like this — just bigger.",
      },
    ],
    activity: {
      title: "Build a biodata bot",
      description: "Create a program that asks 3 questions and prints a fun profile card.",
      steps: [
        "Ask for name, hobby and favorite food using input().",
        "Store each answer in a clearly-named variable.",
        "Print a profile card with borders made of = characters.",
        "Bonus: ask for birth year and compute the user's age in 2030.",
      ],
      starterCode: '# Biodata Bot\nname = input("Name: ")\n# ask 2 more questions here...\n\nprint("=" * 25)\nprint("NAME :", name)\nprint("=" * 25)',
      language: "python",
      hints: [
        "'=' * 25 repeats the character 25 times.",
        "Convert birth year with int() before doing math.",
      ],
    },
    quiz: [
      {
        question: "What does print('Hi') do?",
        options: ["Saves a file", "Displays Hi on screen", "Deletes text", "Turns off the computer"],
        answer: 1,
        explanation: "print() displays its argument as output on the screen.",
      },
      {
        question: "Which is a valid variable name?",
        options: ["2score", "player_score", "player-score", "print"],
        answer: 1,
        explanation: "Names can't start with numbers or contain dashes; avoid keywords like print.",
      },
      {
        question: "What does int('25') return?",
        options: ["The text '25'", "The number 25", "An error", "Nothing"],
        answer: 1,
        explanation: "int() converts the string '25' into the number 25 so you can do math.",
      },
    ],
    popular: true,
  },
  {
    id: "c-python-loops",
    subjectId: "coding",
    title: "Python Loops: Repeat Like a Pro",
    description:
      "Stop copying code — use for and while loops to repeat tasks thousands of times instantly.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["python", "loops", "beginner"],
    objectives: [
      "Write for loops with range()",
      "Control while loops safely",
      "Use break and continue",
    ],
    sections: [
      {
        heading: "Why loops rule",
        body: [
          "Imagine printing numbers 1 to 1000 by hand — that's 1000 lines. A for loop does it in 2 lines and never gets tired or makes typos. Loops are the reason computers beat humans at repetitive work.",
          "Python's for loop walks through a sequence: for i in range(5) counts 0,1,2,3,4. Indentation (4 spaces) marks which lines belong inside the loop.",
        ],
      },
      {
        heading: "for vs while",
        body: [
          "Use for when you know how many times to repeat: for day in range(7) for a week. Use while when repeating until a condition changes: while lives > 0 for a game.",
          "Warning: while True with no exit runs forever! Always make sure the condition can become False, or use break to escape. Infinite loops freeze programs.",
        ],
      },
      {
        heading: "Loop superpowers",
        body: [
          "Loops combine with lists beautifully: for name in ['Ari', 'Bima', 'Citra'] greets everyone. Add if inside to filter: only greet names starting with A.",
          "Nested loops (a loop inside a loop) draw grids, tables and patterns. The multiplication table is just 3 lines with nesting!",
        ],
      },
    ],
    keyTerms: [
      { term: "Iteration", definition: "One single pass through a loop's body." },
      { term: "range(n)", definition: "Generates numbers 0 up to (but not including) n." },
      { term: "Infinite loop", definition: "A loop whose condition never becomes False — usually a bug." },
    ],
    examples: [
      {
        title: "Multiplication table",
        language: "python",
        code: 'for i in range(1, 11):\n    for j in range(1, 11):\n        print(f"{i} x {j} = {i * j}")\n    print("---")',
        explanation:
          "Nested loops: the outer loop picks i, the inner loop counts j. f-strings (f'...') embed values inside text. 100 lines of table from 4 lines of code!",
      },
      {
        title: "Countdown with while",
        language: "python",
        code: 'count = 5\nwhile count > 0:\n    print(count, "...")\n    count = count - 1\nprint("Blast off! 🚀")',
        explanation:
          "The loop runs while count is positive, decreasing it each round. When count hits 0 the condition fails and the loop ends.",
      },
    ],
    activity: {
      title: "Pattern printer",
      description: "Print a right triangle of stars using nested loops.",
      steps: [
        "Loop row from 1 to 5 with for row in range(1, 6).",
        "Inside, print row copies of '*' on one line (hint: '*' * row).",
        "Run and verify you see a triangle.",
        "Bonus: print an upside-down triangle, then a diamond!",
      ],
      starterCode: "# Pattern Printer\nfor row in range(1, 6):\n    # print stars here",
      language: "python",
      hints: ["'*' * 3 gives '***'.", "For upside-down, loop from 5 down to 1 with range(5, 0, -1)."],
    },
    quiz: [
      {
        question: "How many times does for i in range(5) repeat?",
        options: ["4", "5", "6", "Infinite"],
        answer: 1,
        explanation: "range(5) produces 0,1,2,3,4 — five iterations.",
      },
      {
        question: "What does break do inside a loop?",
        options: [
          "Pauses for 1 second",
          "Exits the loop immediately",
          "Skips to the next iteration",
          "Deletes the loop",
        ],
        answer: 1,
        explanation: "break jumps out of the loop entirely. (continue skips to the next round.)",
      },
      {
        question: "Which loop fits 'keep asking until password is correct'?",
        options: ["for", "while", "Neither", "Both equally"],
        answer: 1,
        explanation: "while repeats until a condition changes — perfect when attempts are unknown.",
      },
    ],
    popular: true,
  },
  {
    id: "c-python-game",
    subjectId: "coding",
    title: "Python Project: Number Guessing Game",
    description:
      "Build a complete game with random numbers, loops, hints and scoring — your first real project.",
    level: "Intermediate",
    durationMin: 35,
    xp: 90,
    tags: ["python", "game", "project"],
    objectives: [
      "Use the random module",
      "Combine loops, conditions and input",
      "Design difficulty levels and scoring",
    ],
    sections: [
      {
        heading: "Planning like a developer",
        body: [
          "Pros never start typing immediately — they plan. Our game: (1) pick a secret number 1–100, (2) loop asking for guesses, (3) say 'too high' or 'too low', (4) celebrate the win with attempt count.",
          "Breaking big problems into small steps is called decomposition, and it's the #1 programmer skill. Each step becomes a few lines of code.",
        ],
      },
      {
        heading: "Randomness with the random module",
        body: [
          "Python's toolbox grows with modules. import random unlocks randint(a, b), choice(list) and shuffle(). The computer picks fairly — humans are terrible at being random!",
          "Pro tip: random.seed(42) makes 'random' numbers repeatable — great for testing that your game logic is correct.",
        ],
      },
      {
        heading: "Polish makes it a game",
        body: [
          "Working code is half the job; the other half is feel. Add attempt limits (7 tries), 'hot/cold' hints, a play-again loop and emoji feedback. Suddenly it feels like a real game, not homework.",
          "Always validate input: if the user types 'banana', int() crashes. Wrap risky code in try/except to handle mistakes gracefully.",
        ],
      },
    ],
    keyTerms: [
      { term: "Module", definition: "A library of extra tools you unlock with import." },
      { term: "Decomposition", definition: "Breaking a big problem into small solvable steps." },
      { term: "try/except", definition: "Catches errors so the program survives bad input." },
    ],
    examples: [
      {
        title: "Complete guessing game",
        language: "python",
        code: 'import random\n\nsecret = random.randint(1, 20)\nattempts = 0\n\nprint("🎯 Guess my number (1-20)!")\n\nwhile True:\n    guess = int(input("Your guess: "))\n    attempts += 1\n    if guess == secret:\n        print(f"🎉 Correct in {attempts} tries!")\n        break\n    elif guess < secret:\n        print("📈 Too low!")\n    else:\n        print("📉 Too high!")',
        explanation:
          "The loop runs until break. Each wrong guess gives a directional hint. attempts += 1 is shorthand for attempts = attempts + 1.",
      },
    ],
    activity: {
      title: "Level up the game",
      description: "Add difficulty levels and a 7-guess limit to the base game.",
      steps: [
        "Ask the player to pick Easy (1–10), Medium (1–50) or Hard (1–100).",
        "Set the secret range and max attempts based on the choice.",
        "End with 'Game over' if attempts run out, revealing the secret.",
        "Bonus: wrap the whole game in a play-again loop.",
      ],
      hints: [
        "Store ranges in variables: low, high = 1, 50.",
        "Check attempts >= max_attempts after each wrong guess.",
      ],
    },
    quiz: [
      {
        question: "What does random.randint(1, 20) return?",
        options: [
          "Always 1",
          "A random integer from 1 to 20 inclusive",
          "A decimal between 1 and 20",
          "The number 20",
        ],
        answer: 1,
        explanation: "randint includes both endpoints — 1 and 20 are both possible.",
      },
      {
        question: "What is decomposition?",
        options: [
          "Deleting old code",
          "Breaking problems into smaller steps",
          "A type of loop",
          "Running code faster",
        ],
        answer: 1,
        explanation: "Decomposition splits big problems into small steps you can solve one by one.",
      },
      {
        question: "Why use try/except around int(input())?",
        options: [
          "It runs faster",
          "It prevents crashes on non-numeric input",
          "It is required by Python",
          "It hides the input",
        ],
        answer: 1,
        explanation: "int('banana') raises an error; try/except catches it so the game continues.",
      },
    ],
  },
  {
    id: "c-html-css",
    subjectId: "coding",
    title: "HTML & CSS: Build Your First Web Page",
    description:
      "Structure content with HTML tags and make it beautiful with CSS colors, fonts and layouts.",
    level: "Beginner",
    durationMin: 30,
    xp: 70,
    tags: ["html", "css", "web"],
    objectives: [
      "Write semantic HTML structure",
      "Style pages with CSS selectors",
      "Build a personal profile card",
    ],
    sections: [
      {
        heading: "HTML is the skeleton",
        body: [
          "Every website — Google, YouTube, EduTech — is HTML underneath. Tags like <h1>, <p>, <img> and <a> describe content: headings, paragraphs, images, links.",
          "Tags nest like boxes: <body> holds <main>, which holds <h1> and <p>. Indentation keeps the family tree readable. Browsers are forgiving, but clean structure matters.",
        ],
      },
      {
        heading: "CSS is the fashion",
        body: [
          "CSS controls looks: color, fonts, spacing, layout. A rule has a selector (who to style) and declarations (how): h1 { color: indigo; font-size: 48px; }.",
          "The box model is the key idea: every element is a box with content, padding, border and margin. Master spacing and your pages instantly look professional.",
        ],
      },
      {
        heading: "Classes: style once, reuse everywhere",
        body: [
          "Give elements class='card' and style .card once — every card updates together. This is how big sites stay consistent with thousands of pages.",
          "Modern CSS with flexbox and grid makes layouts fun: centering, which once took 20 lines of hacks, is now place-items: center. You're learning at the best time!",
        ],
      },
    ],
    keyTerms: [
      { term: "Tag", definition: "An HTML marker like <p> that describes content." },
      { term: "Selector", definition: "The CSS part that chooses which elements to style." },
      { term: "Box model", definition: "Content + padding + border + margin around every element." },
    ],
    examples: [
      {
        title: "Profile card",
        language: "html",
        code: '<div class="card">\n  <img src="avatar.png" alt="My photo">\n  <h2>Ayu Pratama</h2>\n  <p>Future game developer 🎮</p>\n  <a href="#">Follow me</a>\n</div>\n\n<style>\n.card {\n  background: white;\n  border-radius: 16px;\n  padding: 24px;\n  text-align: center;\n  box-shadow: 0 8px 24px rgba(0,0,0,0.12);\n  max-width: 280px;\n}\n.card img { width: 96px; border-radius: 50%; }\n.card a {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  padding: 10px 24px;\n  border-radius: 999px;\n  text-decoration: none;\n}\n</style>',
        explanation:
          "HTML builds the card's content; CSS in <style> rounds corners, adds shadow and styles the button. Try it in the Playground's HTML tab!",
      },
    ],
    activity: {
      title: "My favorite things page",
      description: "Build a one-page site about your top 3 hobbies with images and links.",
      steps: [
        "Create headings, paragraphs and an unordered list (<ul><li>).",
        "Add at least one image with meaningful alt text.",
        "Style with CSS: background color, centered content, styled links.",
        "Bonus: make hobby cards side-by-side with display: flex and gap.",
      ],
      starterCode: "<h1>My Top 3 Hobbies</h1>\n<p>Hi! I'm ___ and I love...</p>\n<!-- add your list, images and style! -->",
      language: "html",
      hints: [
        "Use <ul> for bullet lists and <ol> for numbered lists.",
        "max-width: 600px; margin: auto; centers your content nicely.",
      ],
    },
    quiz: [
      {
        question: "Which tag creates the largest heading?",
        options: ["<head>", "<h1>", "<header>", "<title>"],
        answer: 1,
        explanation: "<h1> is the top-level heading; <head> holds metadata, not visible content.",
      },
      {
        question: "What does CSS 'margin' control?",
        options: [
          "Space inside the border",
          "Space outside the border",
          "Text color",
          "Font size",
        ],
        answer: 1,
        explanation: "Margin is outside the border (pushes neighbors away); padding is inside.",
      },
      {
        question: "How do you style all elements with class='btn'?",
        options: [".btn { }", "#btn { }", "btn { }", "<btn> { }"],
        answer: 0,
        explanation: "A dot selects classes (.btn); # selects ids; plain names select tags.",
      },
    ],
    popular: true,
  },
  {
    id: "c-javascript",
    subjectId: "coding",
    title: "JavaScript: Make the Web Interactive",
    description:
      "Add buttons that count, dark mode toggles and live input — JavaScript brings pages to life.",
    level: "Intermediate",
    durationMin: 30,
    xp: 80,
    tags: ["javascript", "web", "DOM"],
    objectives: [
      "Run JavaScript in the browser",
      "Respond to clicks with event listeners",
      "Update page content dynamically",
    ],
    sections: [
      {
        heading: "The language of the web",
        body: [
          "HTML structures, CSS styles, and JavaScript behaves. Every like button, dropdown and game you've used online runs on JavaScript — it's the only language browsers natively speak.",
          "JS looks similar to Python but with curly braces and semicolons: let score = 0; console.log('Hi'). Open any site, press F12, and you can run JS in the Console right now!",
        ],
      },
      {
        heading: "The DOM: your page as objects",
        body: [
          "The browser turns HTML into the DOM (Document Object Model) — a tree of objects JS can grab and change. document.querySelector('h1') finds the first heading; .textContent reads or writes its text.",
          "This is the core loop of front-end development: find element → listen for event → update something. Master this and you can build anything interactive.",
        ],
      },
      {
        heading: "Events make it feel alive",
        body: [
          "button.addEventListener('click', () => { ... }) runs code on every click. There are events for typing, hovering, scrolling, submitting forms and even pressing keys.",
          "Combine events with conditions and you get dark-mode toggles, live character counters, quiz apps and to-do lists — real projects for your portfolio.",
        ],
      },
    ],
    keyTerms: [
      { term: "DOM", definition: "The browser's object-tree version of your HTML page." },
      { term: "Event listener", definition: "Code that waits for something (click, keypress) then runs." },
      { term: "console.log()", definition: "Prints values to the browser console for debugging." },
    ],
    examples: [
      {
        title: "Click counter",
        language: "javascript",
        code: '<button id="btn">Clicked 0 times</button>\n\n<script>\nlet count = 0;\nconst btn = document.querySelector("#btn");\n\nbtn.addEventListener("click", () => {\n  count++;\n  btn.textContent = `Clicked ${count} times`;\n});\n</script>',
        explanation:
          "querySelector('#btn') grabs the button by id. Each click increments count and rewrites the label. Backticks allow ${} value embedding.",
      },
      {
        title: "Dark mode toggle",
        language: "javascript",
        code: '<button id="theme">🌙 Dark mode</button>\n\n<script>\nconst btn = document.querySelector("#theme");\nbtn.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n  const dark = document.body.classList.contains("dark");\n  btn.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";\n});\n</script>',
        explanation:
          "classList.toggle('dark') adds/removes a CSS class on <body>. Your CSS defines body.dark { background: #111; color: white; } — one class flips the whole theme!",
      },
    ],
    activity: {
      title: "Live greeting card",
      description: "An input box that updates a greeting message as you type.",
      steps: [
        "Create an <input id='name'> and a <p id='greet'>Hello!</p>.",
        "Listen for the 'input' event on the text field.",
        "Update the paragraph to 'Hello, {name}!' on every keystroke.",
        "Bonus: change the greeting color based on name length.",
      ],
      starterCode: '<input id="name" placeholder="Type your name...">\n<p id="greet">Hello!</p>\n\n<script>\n// your code here\n</script>',
      language: "html",
      hints: [
        "Read typed text with input.value inside the listener.",
        "The 'input' event fires on every keystroke, unlike 'change'.",
      ],
    },
    quiz: [
      {
        question: "How do you select <p id='msg'> in JavaScript?",
        options: [
          "document.querySelector('#msg')",
          "document.querySelector('.msg')",
          "document.getElement('msg')",
          "select('#msg')",
        ],
        answer: 0,
        explanation: "# selects by id. .msg would select class='msg' instead.",
      },
      {
        question: "Which code runs when a button is clicked?",
        options: [
          "btn.onClick = run",
          "btn.addEventListener('click', run)",
          "btn.whenClicked(run)",
          "click(btn, run)",
        ],
        answer: 1,
        explanation: "addEventListener('click', function) is the standard way to handle clicks.",
      },
      {
        question: "What does count++ do?",
        options: [
          "Adds 2",
          "Adds 1 to count",
          "Multiplies by 2",
          "Resets to zero",
        ],
        answer: 1,
        explanation: "++ is shorthand for adding 1: count++ means count = count + 1.",
      },
    ],
  },
];
