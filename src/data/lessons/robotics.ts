import type { Lesson } from "../types";

/** Robotics — Micro:bit, sensors, motors and build projects. */
export const roboticsLessons: Lesson[] = [
  {
    id: "microbit-led-basics",
    title: "Micro:bit: Make Your First LED Project",
    subjectId: "robotics",
    unitId: "microbit-basics",
    track: "robotics",
    summary:
      "Meet the 5×5 LED matrix and program your first animation — a beating heart you build block by block.",
    difficulty: "Beginner",
    minutes: 15,
    xp: 120,
    tags: ["Micro:bit", "MakeCode", "LED matrix", "Beginner project"],
    objectives: [
      "Understand how the Micro:bit 5×5 LED matrix works",
      "Display text and shapes on the LED grid",
      "Create and loop a simple animation",
    ],
    materials: ["Micro:bit board (or the EduTech simulator)", "USB cable", "MakeCode editor"],
    blocks: [
      {
        type: "text",
        body: [
          "The **Micro:bit** is a pocket-sized computer with a **5×5 grid of LEDs** on the front. That is 25 lights, each of which you can switch on or off individually. 25 tiny lights do not sound like much — until you realise they can show numbers, letters, animations and even simple games.",
          "Every pattern you display is just a list of 25 on/off decisions. You describe the pattern once, and the board does the boring part: turning each light on at exactly the right moment.",
        ],
      },
      {
        type: "figure",
        title: "What you are working with",
        caption:
          "The Micro:bit packs a display, two buttons, sensors and radio into a board the size of a credit card.",
        visual: "microbit",
        items: ["5×5 LED matrix", "Button A", "Button B", "Motion sensor", "Radio & Bluetooth"],
      },
      {
        type: "keyTerms",
        terms: [
          {
            term: "LED matrix",
            definition: "A grid of LEDs addressed by row and column, so one program can control all 25 lights.",
          },
          {
            term: "Pixels",
            definition: "In MakeCode, each LED in the grid is called a pixel and can be addressed from (0,0) to (4,4).",
          },
          {
            term: "Loop",
            definition: "A block that repeats. `forever` on the Micro:bit restarts itself constantly, thousands of times a second.",
          },
          {
            term: "Animation",
            definition: "A sequence of frames shown one after another. Show frames fast enough and the eye sees movement.",
          },
        ],
      },
      {
        type: "steps",
        title: "Build it: beating heart",
        steps: [
          {
            title: "Open a new MakeCode project",
            body: "Go to makecode.microbit.org, choose **New Project** and name it 'Heart'. You are now in the block editor with an empty canvas.",
            hint: "Prefer typing? The EduTech simulator below runs the same program with the 'MakeCode text' tab.",
          },
          {
            title: "Add the forever loop blocks",
            body: "Drag `show icon` from the Basic category inside `forever`. This is the block that draws a picture on the 25 LEDs.",
            code: "forever {\n    show icon (♥)\n    pause (500)\n    show icon (small heart)\n    pause (500)\n}",
          },
          {
            title: "Pick the heart icons",
            body: "Click the icon selector and choose the big **heart**, then add a pause of `500 ms`, then the **small heart** with another pause. The two frames together create the beat.",
          },
          {
            title: "Download to your board",
            body: "Press **Download**, plug in your Micro:bit with USB and drag the .hex file onto the MICROBIT drive. It installs instantly and the heart starts beating.",
          },
          {
            title: "Experiment",
            body: "Try `pause (100)` — the heart beats fast. Try `pause (1000)` — it beats slowly. You are now tuning animation speed, which is exactly what real game animators do.",
            hint: "Change the order of the frames to make the heart beat backwards.",
          },
        ],
      },
      {
        type: "widget",
        widget: "microbit",
        title: "Try it live",
        caption:
          "This is the EduTech Micro:bit simulator. Press Run, then swap the program for one of the examples.",
        config: {
          programId: "heart",
          height: 300,
        },
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "25 lights beat a screen",
        body: "Because the Micro:bit has so few pixels, programmers learn to say a lot with a little. That skill — designing for constraints — is exactly what makes a great app designer or game developer.",
      },
      {
        type: "code",
        language: "makecode",
        title: "Your complete program (text view)",
        code: "forever {\n    show icon (♥)\n    pause (400)\n    show icon (small heart)\n    pause (400)\n}\n\non button A pressed {\n    show string (\"HELLO\")\n}",
        output: "LED matrix: heart, small heart, heart, small heart …",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Debugging tip",
        body: "If nothing appears, check that your blocks are *inside* the `forever` loop. Blocks dragged outside it run only once — often before you have had a chance to look.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "How many LEDs are on the Micro:bit display?",
        options: ["9 (3×3)", "16 (4×4)", "25 (5×5)", "64 (8×8)"],
        answer: 2,
        explanation:
          "The Micro:bit has a 5×5 grid, which means 5 × 5 = 25 individually programmable LEDs.",
        points: 20,
      },
      {
        id: "q2",
        type: "trueFalse",
        prompt: "The `forever` loop runs your blocks only one time.",
        answer: false,
        explanation:
          "`forever` restarts continuously, which is why animations keep playing without any extra code.",
        points: 20,
      },
      {
        id: "q3",
        type: "fillBlank",
        prompt: "To make an animation beat faster you reduce the _______ between frames.",
        answer: ["pause", "pauses", "delay"],
        placeholder: "Type the block name",
        explanation:
          "The `pause` block controls how long each frame is shown. Shorter pauses mean a faster animation.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "What makes two frames look like movement?",
        options: [
          "Showing them at different brightness levels",
          "Showing them one after another quickly enough",
          "Using two Micro:bits at the same time",
          "Adding a sound between them",
        ],
        answer: 1,
        explanation:
          "Animation is a trick of the eye: show frames fast enough and your brain fills in the motion.",
        points: 20,
      },
      {
        id: "q5",
        type: "multipleChoice",
        prompt: "Which block does NOT belong in a Micro:bit LED project?",
        options: ["show icon", "show string", "pause", "play tone"],
        answer: 3,
        explanation:
          "`play tone` comes from the Music blocks — it makes sound, not light. The other three all control what the LED matrix shows.",
        points: 20,
      },
    ],
    updatedAt: "2026-08-28",
    author: "Ms. Rani Kusuma · Robotics Lead",
  },
  {
    id: "microbit-button-input",
    title: "Micro:bit: Button Input & Interactions",
    subjectId: "robotics",
    unitId: "sensors-input",
    track: "robotics",
    summary:
      "Buttons turn a display into a device. Build an interactive greeting card that responds to A, B and A+B.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 150,
    tags: ["Micro:bit", "Buttons", "Events", "MakeCode"],
    objectives: [
      "Read input from Button A, Button B and A+B together",
      "Understand event-driven programming",
      "Build a program that changes behaviour based on user input",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Every game controller, keypad and remote control in the world works the same way: it waits for **input**, then runs the matching **event**. On the Micro:bit, the simplest inputs are Button A and Button B.",
          "So far your programs ran immediately and looped forever. Now the program becomes **interactive** — it decides what to do based on what the person holding the board does.",
        ],
      },
      {
        type: "compare",
        title: "Two styles of programming",
        columns: [
          {
            title: "Sequential (you already know this)",
            tone: "neutral",
            items: [
              "Blocks run top to bottom",
              "The board does everything on its own",
              "Great for tutorials, animations and timers",
            ],
          },
          {
            title: "Event-driven (today)",
            tone: "good",
            items: [
              "Code waits for something to happen",
              "Runs only when the event fires",
              "Great for games, controllers and devices",
            ],
          },
        ],
      },
      {
        type: "widget",
        widget: "microbit",
        title: "Explore the events",
        caption:
          "Press the A and B buttons on the simulator to see which events fire. Watch the event log as you play.",
        config: { programId: "greeting", showEventLog: true, height: 320 },
      },
      {
        type: "steps",
        title: "Build it: interactive greeting card",
        steps: [
          {
            title: "Add a button event",
            body: "From the Input category drag `on button A pressed` onto the canvas. Notice it is a *hat* block: it sits on its own, not inside `forever`.",
            code: 'on button A pressed {\n    show string ("HI!")\n}',
          },
          {
            title: "Show a different message on B",
            body: "Duplicate the event and change the button to B, and the string to something else — for example 'BYE'.",
            code: 'on button B pressed {\n    show string ("BYE")\n}',
          },
          {
            title: "Handle both buttons at once",
            body: "Change the dropdown on a third event to `A+B`. This fires only when both buttons are held at the same time — perfect for a 'secret' mode.",
            code: 'on button A+B pressed {\n    show icon (surprised)\n    play tone (Middle C, 1 beat)\n}',
          },
          {
            title: "Add a score with a variable",
            body: "Create a variable called `score`, set it to `0` on start, and add `1` to it inside the A event. Then `show number (score)` so players can see progress.",
            code: "on start {\n    set score to 0\n}\non button A pressed {\n    change score by 1\n    show number (score)\n}",
          },
          {
            title: "Test before you download",
            body: "Run it in the MakeCode simulator (or the EduTech simulator above). Clicking the virtual buttons is much faster than flashing the board 20 times.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Do not block the loop",
        body: "Never put a long `pause` inside a button event if you need the board to stay responsive. A 5-second pause inside `on button A pressed` makes the Micro:bit appear frozen to your player.",
      },
      {
        type: "code",
        language: "makecode",
        title: "Complete greeting-card program",
        code: 'on start {\n    set score to 0\n    show icon (smiley face)\n}\n\non button A pressed {\n    change score by 1\n    show string ("HI!")\n}\n\non button B pressed {\n    show string ("BYE")\n}\n\non button A+B pressed {\n    show number (score)\n    play tone (Middle C, 1 beat)\n}',
        output: "Smiley → HI! on A → BYE on B → score + tone when both are held",
      },
      { 
        type: "keyTerms",
        terms: [
          {
            term: "Event",
            definition: "Something that happens which your program can react to, like a button press or a shake.",
          },
          {
            term: "Event handler",
            definition: "The block of code attached to an event. It runs only when that event fires.",
          },
          {
            term: "Variable",
            definition: "A named box that stores a value — your board's memory.",
          },
          {
            term: "Input vs output",
            definition: "Input is information coming in (buttons, sensors). Output is information going out (LEDs, sound, motors).",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which event fires when both buttons are held at the same time?",
        options: ["`on button A pressed`", "`on button B pressed`", "`on button A+B pressed`", "`on shake`"],
        answer: 2,
        explanation:
          "The `A+B` event fires only while both buttons are held together — useful for hidden or advanced actions.",
        points: 20,
      },
      {
        id: "q2",
        type: "matching",
        prompt: "Match each event to the right block type.",
        pairs: [
          { left: "on button A pressed", right: "Event handler (hat block)" },
          { left: "forever", right: "Repeating loop" },
          { left: "on start", right: "Runs once at power-up" },
          { left: "set score to 0", right: "Variable assignment" },
        ],
        explanation:
          "Event handlers react to input, `forever` repeats constantly, `on start` runs once, and variables store values.",
        points: 25,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "You should put a 5-second pause inside a button event to slow the program down.",
        answer: false,
        explanation:
          "Long pauses inside event handlers make the board feel frozen. Keep event handlers fast and responsive.",
        points: 20,
      },
      {
        id: "q4",
        type: "fillBlank",
        prompt: "A named container that stores a value in your program is called a _______.",
        answer: ["variable", "variables"],
        explanation:
          "Variables give your program memory — they hold numbers, text or true/false values while it runs.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-02",
    author: "Ms. Rani Kusuma · Robotics Lead",
  },
  {
    id: "microbit-sensors",
    title: "Sensors: Make Your Micro:bit Feel the World",
    subjectId: "robotics",
    unitId: "sensors-input",
    track: "robotics",
    summary:
      "Use the accelerometer, light sensor and temperature sensor to build a step counter and a night light.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 180,
    tags: ["Micro:bit", "Sensors", "Accelerometer", "Data"],
    objectives: [
      "Explain what an accelerometer measures",
      "Read live sensor values and convert them into decisions",
      "Build a step counter and an automatic night light",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A sensor is a translator: it converts something physical (movement, light, heat) into a **number your program can read**. The Micro:bit carries several sensors on one tiny board.",
          "Once a physical quantity becomes a number, everything you know about code applies — compare it, count it, average it, chart it.",
        ],
      },
      {
        type: "table",
        title: "Sensors on the Micro:bit v2",
        headers: ["Sensor", "Measures", "Typical project"],
        rows: [
          ["Accelerometer", "Movement & tilt on 3 axes", "Step counter, tilt maze, shake dice"],
          ["Light sensor", "Brightness (via the LEDs)", "Night light, plant-light monitor"],
          ["Temperature sensor", "Chip temperature in °C", "Weather station, room monitor"],
          ["Magnetometer", "Magnetic fields & compass heading", "Compass, metal detector"],
          ["Microphone", "Sound level", "Clap switch, noise-o-meter"],
        ],
      },
      {
        type: "diagram",
        title: "How a sensor becomes an action",
        loop: true,
        nodes: [
          { emoji: "🖐️", title: "Physical world", detail: "You shake the board" },
          { emoji: "📈", title: "Sensor", detail: "Accelerometer outputs a number" },
          { emoji: "🧠", title: "Your code", detail: "Compare: is it above 1500?" },
          { emoji: "💡", title: "Output", detail: "LEDs light up, sound plays" },
        ],
        caption:
          "Robots are loops of sensing → thinking → acting. Master this pattern and you can build almost anything.",
      },
      {
        type: "widget",
        widget: "microbit",
        title: "Live sensor dashboard",
        caption:
          "The simulator shows accelerometer, light and temperature readings. Tilt the board with the slider, or press Shake.",
        config: { programId: "stepCounter", showSensors: true, height: 360 },
      },
      {
        type: "steps",
        title: "Build it: step counter",
        steps: [
          {
            title: "Create two variables",
            body: "Make a variable `steps` (starts at 0) and a second variable `wasMoving` set to `false`. The second one remembers whether the board was already moving.",
            code: "on start {\n    set steps to 0\n    set wasMoving to false\n}",
          },
          {
            title: "Measure total movement",
            body: "In `forever`, compute the strength of movement using `input.acceleration` on x, y and z. Add them together to get a rough 'movement score'.",
            code: "let total = Math.abs(input.acceleration(Dimension.X)) + Math.abs(input.acceleration(Dimension.Y)) + Math.abs(input.acceleration(Dimension.Z))",
          },
          {
            title: "Detect a step",
            body: "If total movement is greater than `1500` *and* we were not already moving, count one step. The `wasMoving` flag stops a single shake counting 40 times.",
            code: "if (total > 1500 && !wasMoving) {\n    change steps by 1\n    set wasMoving to true\n} else if (total <= 1200) {\n    set wasMoving to false\n}",
          },
          {
            title: "Show progress",
            body: "Add an event: when `steps` reaches 10, show a big heart and play a tone. Small rewards keep people moving.",
          },
          {
            title: "Turn it into a night light",
            body: "Swap the sensor: read `input.lightLevel()`. If it drops below `50`, turn on every LED; otherwise clear the screen. Congratulations — you have built a product used in real homes.",
            code: "if (input.lightLevel() < 50) {\n    basic.showIcon(IconNames.Square)\n} else {\n    basic.clearScreen()\n}",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Noise in real data",
        body: "Real sensor readings wobble. Engineers fix that with **thresholds** (only react above a value) and **smoothing** (average the last few readings). Both tricks are in your step counter already.",
      },
      {
        type: "code",
        language: "python",
        title: "Same idea, written in MicroPython",
        code: "from microbit import *\n\nsteps = 0\nwas_moving = False\n\nwhile True:\n    total = abs(accelerometer.get_x()) + abs(accelerometer.get_y()) + abs(accelerometer.get_z())\n    if total > 1500 and not was_moving:\n        steps += 1\n        was_moving = True\n    elif total <= 1200:\n        was_moving = False\n\n    if button_a.was_pressed():\n        display.scroll(str(steps))",
        output: "Displays your step count whenever Button A is pressed.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What does an accelerometer measure?",
        options: [
          "Brightness of light",
          "Movement and tilt",
          "Air pressure",
          "Sound level",
        ],
        answer: 1,
        explanation:
          "The accelerometer detects acceleration on the x, y and z axes — that is how it knows tilt, shake and free-fall.",
        points: 20,
      },
      {
        id: "q2",
        type: "trueFalse",
        prompt: "The `wasMoving` variable prevents a single shake from counting many steps.",
        answer: true,
        explanation:
          "It acts as a flag so a step is counted once per movement, then resets when the board is still.",
        points: 20,
      },
      {
        id: "q3",
        type: "fillBlank",
        prompt: "To ignore small readings, engineers set a _______ value that must be exceeded before the code reacts.",
        answer: ["threshold", "thresholds", "limit"],
        explanation:
          "Thresholds filter out sensor noise so your device reacts to real events, not random wobble.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match each sensor to its best beginner project.",
        pairs: [
          { left: "Accelerometer", right: "Tilt maze game" },
          { left: "Light sensor", right: "Automatic night light" },
          { left: "Temperature sensor", right: "Room thermometer" },
          { left: "Microphone", right: "Clap-activated switch" },
        ],
        explanation:
          "Each sensor converts a different physical signal into data, which decides which project fits best.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-06",
    author: "Mr. Bagas Prasetyo · Robotics",
  },
  {
    id: "motors-and-servos",
    title: "Motors & Servos: Making Robots Move",
    subjectId: "robotics",
    unitId: "motors-motion",
    track: "robotics",
    summary:
      "Drive DC motors and position servos with the motor:bit board, then build your first moving robot chassis.",
    difficulty: "Intermediate",
    minutes: 30,
    xp: 200,
    tags: ["Motors", "Servo", "motor:bit", "Robotics"],
    objectives: [
      "Tell the difference between DC motors and servos",
      "Control motor speed and direction from Micro:bit code",
      "Assemble a two-wheeled robot base and drive it remotely",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "An LED shows information. A **motor creates movement** — and movement is what separates a gadget from a robot.",
          "There are two families you will use constantly. A **DC motor** spins continuously and fast: wheels, fans, propellers. A **servo** moves to a specific angle you choose: robot arms, grippers, robotic legs, steering.",
        ],
      },
      {
        type: "compare",
        title: "DC motor vs servo",
        columns: [
          {
            title: "DC motor",
            tone: "neutral",
            items: [
              "Spins continuously while powered",
              "Control: on/off + speed + direction",
              "Best for wheels, fans, conveyors",
            ],
          },
          {
            title: "Servo motor",
            tone: "good",
            items: [
              "Moves to a target angle (usually 0–180°)",
              "Control: exact position",
              "Best for arms, grippers, steering",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Never wire a motor straight to the Micro:bit",
        body: "Motors pull far more current than the board can safely supply and reverse voltage spikes can destroy it. Always use a driver board such as **motor:bit**, which has its own power supply and protection.",
      },
      {
        type: "table",
        title: "motor:bit pin cheat sheet",
        headers: ["Component", "Pin", "What it does"],
        rows: [
          ["Left motor", "M1", "Forward / backward with PWM speed"],
          ["Right motor", "M2", "Forward / backward with PWM speed"],
          ["Servo 1", "S1", "Angle 0–180°"],
          ["Servo 2", "S2", "Angle 0–180°"],
          ["Battery pack", "VIN", "6–12 V motor power (separate from logic)"],
        ],
      },
      {
        type: "steps",
        title: "Build it: remote-controlled rover",
        steps: [
          {
            title: "Assemble the chassis",
            body: "Mount two motors on the base plate with zip ties, press the wheels on, add a caster wheel at the front for balance, then secure the battery pack and the Micro:bit on top.",
          },
          {
            title: "Test one motor alone",
            body: "Before building anything clever, confirm each motor spins. Upload this and check the left wheel turns forward.",
            code: "motorbit.motorRun(motorbit.M1, 80)  # 80% forward\nbasic.pause(2000)\nmotorbit.motorStop(motorbit.M1)",
          },
          {
            title: "Add steering",
            body: "Give each button a job: A turns left, B turns right, A+B goes straight, and shake stops the rover.",
            code: 'input.onButtonPressed(Button.A, () => {\n    motorbit.motorRun(motorbit.M1, 0)\n    motorbit.motorRun(motorbit.M2, 70)\n})',
          },
          {
            title: "Balance the speed",
            body: "If your rover curves instead of driving straight, one motor is slightly slower than the other. Fix it in code: hand the left motor 82% and the right 78% until it tracks straight.",
          },
          {
            title: "Upgrade to radio control",
            body: "Flash a second Micro:bit with a sender program using `radio.sendString`, and drive the rover from across the room. That is teleoperation — the same principle used by Mars rovers, 225 million km away.",
            hint: "Keep both boards on the same radio group (e.g. group 1) and use a different group for other teams.",
          },
        ],
      },
      {
        type: "widget",
        widget: "microbit",
        title: "Simulate the driver",
        caption:
          "In the simulator, switch to the 'Rover' program to test motor commands, button mapping and stop logic before you touch hardware.",
        config: { programId: "rover", height: 340, showSensors: true },
      },
      {
        type: "code",
        language: "python",
        title: "MicroPython: exact servo angles",
        code: "from microbit import *\nimport motorbit\n\nwhile True:\n    motorbit.servo(motorbit.S1, 0)    # gripper open\n    sleep(1500)\n    motorbit.servo(motorbit.S1, 90)   # half closed\n    sleep(1500)\n    motorbit.servo(motorbit.S1, 180)  # firmly closed\n    sleep(1500)",
        output: "The arm sweeps open → half → closed, over and over.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Safety and battery habits",
        body: "Always switch the battery pack off before rewiring, keep wires clear of the wheels, and charge packs at a steady 1 A. A robot that eats its own cables is a classic first-day failure.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which actuator is best for a robot gripper that must stop at an exact angle?",
        options: ["DC motor", "Servo motor", "LED", "Buzzer"],
        answer: 1,
        explanation:
          "Servos hold a commanded position between 0° and 180°, which is exactly what a gripper needs.",
        points: 25,
      },
      {
        id: "q2",
        type: "trueFalse",
        prompt: "You can connect a DC motor directly to the Micro:bit's pins without a driver board.",
        answer: false,
        explanation:
          "Motors need more current and cause voltage spikes — always use a driver board like motor:bit.",
        points: 20,
      },
      {
        id: "q3",
        type: "fillBlank",
        prompt: "The technique of changing a motor's speed by switching it on and off rapidly is called _______.",
        answer: ["pwm", "pulse width modulation"],
        hint: "Three letters, or its full name.",
        explanation:
          "PWM (pulse width modulation) switches power on and off many times per second to simulate intermediate speeds.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Your rover curves to the left when both motors are set to 70%. What is the best fix?",
        options: [
          "Increase the battery voltage",
          "Add a caster wheel",
          "Trim the motor speeds in code until it drives straight",
          "Remove one motor",
        ],
        answer: 2,
        explanation:
          "Real motors are never perfectly matched. Compensating with slightly different speed values is standard robotics practice.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-10",
    author: "Mr. Bagas Prasetyo · Robotics",
  },
  {
    id: "line-follower-robot",
    title: "Build a Line-Following Robot",
    subjectId: "robotics",
    unitId: "robotics-projects",
    track: "robotics",
    summary:
      "Combine sensors, logic and motors into a robot that steers itself along a black line.",
    difficulty: "Advanced",
    minutes: 45,
    xp: 260,
    tags: ["Robotics project", "Sensors", "Control"],
    objectives: [
      "Wire and calibrate a two-channel line sensor",
      "Write decision logic for left, right and straight",
      "Tune sensor thresholds for different surfaces",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A line-following robot is the classic first 'real' robot: two light sensors stare at the floor, two motors steer, and the program makes one tiny decision thousands of times per second.",
          "Why it matters: this is a feedback loop. The robot measures its own error and corrects it continuously — the same idea behind cruise control, drone stabilisation and self-driving cars.",
        ],
      },
      { 
        type: "diagram",
        title: "The control loop",
        loop: true,
        nodes: [
          { emoji: "👁️", title: "Sense", detail: "Left & right sensors read the floor" },
          { emoji: "⚖️", title: "Compare", detail: "Which sensor sees black?" },
          { emoji: "🔀", title: "Decide", detail: "Steer left, right or straight" },
          { emoji: "⚙️", title: "Act", detail: "Motor speeds change" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Black line, white floor",
        body: "A light sensor returns a bright number (~700–1000) on white paper and a low number (~50–200) on black tape. One threshold in between splits the two worlds.",
      },
      {
        type: "steps",
        title: "Build it",
        steps: [
          {
            title: "Mount the sensors close to the ground",
            body: "Fix the two sensors to a bracket at the front, about 5 mm above the floor, 20 mm apart, with the line running between them.",
          },
          {
            title: "Calibrate your threshold",
            body: "Write a calibration program that shows the raw reading of each sensor on the LED display. Note the white value and the black value on your actual floor, then choose the midpoint.",
            code: "while True:\n    display.show(str(pin0.read_analog()))\n    sleep(200)",
            hint: "Surfaces differ. A value of 400 on a classroom floor may be 250 on a shiny hall floor — always calibrate on the track you will race on.",
          },
          {
            title: "Write the decision logic",
            body: "Four cases cover everything: both sensors on white → go straight; left sees black → turn left; right sees black → turn right; both black → stop at a crossing or junction.",
            code: "let left = pins.analogReadPin(AnalogPin.P0)\nlet right = pins.analogReadPin(AnalogPin.P1)\nlet threshold = 400\n\nif (left > threshold && right > threshold) {\n    // both on white: straight\n} else if (left < threshold) {\n    // line is under the left sensor: steer left\n} else if (right < threshold) {\n    // steer right\n}",
          },
          {
            title: "Tune the turning speed",
            body: "Use a gentle difference at first (left 0%, right 70%). If the robot overshoots corners, increase the difference; if it wobbles, decrease it.",
          },
          {
            title: "Test, then race",
            body: "Lay electrical tape in a figure-eight and time five laps. Log your best lap time, change one value, and repeat. This is engineering: change one thing at a time.",
          },
        ],
      },
      {
        type: "code",
        language: "makecode",
        title: "Complete line follower",
        code: "let threshold = 400\nforever {\n    let left = pins.analogReadPin(AnalogPin.P0)\n    let right = pins.analogReadPin(AnalogPin.P1)\n\n    if (left > threshold && right > threshold) {\n        motorbit.motorRun(motorbit.M1, 70)\n        motorbit.motorRun(motorbit.M2, 70)\n    } else if (left < threshold) {\n        motorbit.motorRun(motorbit.M1, 20)\n        motorbit.motorRun(motorbit.M2, 80)\n    } else {\n        motorbit.motorRun(motorbit.M1, 80)\n        motorbit.motorRun(motorbit.M2, 20)\n    }\n}",
        output: "The rover tracks the tape, correcting its own steering continuously.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Going further",
        body: "Add a third sensor in the middle to follow dashed lines, or average the last five readings to smooth out bumps in the floor.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Both sensors read a high number. The robot is on…",
        options: ["Black tape", "White floor", "A junction", "A wall"],
        answer: 1,
        explanation:
          "High readings mean light is bouncing back — that is the white floor, so the robot drives straight.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The value that separates 'white' from 'black' readings is called the _______.",
        answer: ["threshold", "limit"],
        explanation:
          "Everything below the threshold counts as black, everything above counts as white.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "A line-following robot is an example of a feedback loop.",
        answer: true,
        explanation:
          "It senses its own position relative to the line and continuously corrects — textbook feedback control.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Your robot wobbles violently along a straight line. The best first change is to…",
        options: [
          "Make the turn difference smaller",
          "Make the turn difference bigger",
          "Remove one sensor",
          "Drive faster",
        ],
        answer: 0,
        explanation:
          "Wobbling means over-correction. Reduce the steering difference to smooth the path.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-11",
    author: "Mr. Bagas Prasetyo · Robotics",
  },
  {
    id: "reaction-game-microbit",
    title: "Reaction Game: Micro:bit vs Your Friends",
    subjectId: "robotics",
    unitId: "robotics-projects",
    track: "robotics",
    summary:
      "Measure human reaction time to the millisecond and settle who has the fastest reflexes.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 190,
    tags: ["Game", "Micro:bit", "Timing", "Random"],
    objectives: [
      "Use timers and random numbers in a real game",
      "Design fair rules that stop players cheating",
      "Display and compare results",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Average human reaction time is about **250 milliseconds**. This project turns the Micro:bit into a referee that measures it exactly and refuses to be fooled.",
          "Game design means thinking about fairness. If a player presses too early, what happens? If two people play, whose turn is it? Write the rules clearly, then make the code enforce them.",
        ],
      },
      {
        type: "widget",
        widget: "microbit",
        title: "Play the reaction game",
        caption:
          "Press Run, then wait for the LEDs to light up and hit Button A as fast as you can. Try to beat 250 ms.",
        config: { programId: "reaction", height: 340, showEventLog: true },
      },
      {
        type: "steps",
        title: "Build it",
        steps: [
          {
            title: "Wait quietly",
            body: "Show a dot and clear the screen so the player knows the game has started but must not press yet.",
          },
          {
            title: "Random delay",
            body: "Wait a random time between 2 and 5 seconds. A random delay stops players from guessing the moment and cheating.",
            code: "let wait = Math.randomRange(2000, 5000)\nbasic.pause(wait)",
          },
          {
            title: "Give the signal",
            body: "Light the whole screen and start a timer at the same moment, so the measurement begins exactly when the player can see the signal.",
            code: "basic.showIcon(IconNames.Square)\nlet start = input.runningTime()",
          },
          {
            title: "Measure the press",
            body: "When Button A is pressed, subtract the start time from the current time. That is your reaction time in milliseconds.",
            code: "let reaction = input.runningTime() - start\nbasic.showNumber(reaction)",
          },
          {
            title: "Handle the cheater",
            body: "If the player presses before the signal, show a sad face and say 'Too early!'. Detecting wrong input is a real part of game design.",
          },
          {
            title: "Score a round",
            body: "Store the best time in a variable and compare: if the new reaction is lower, it becomes the new record and the board plays a happy tone.",
          },
        ],
      },
      {
        type: "code",
        language: "makecode",
        title: "Complete reaction game",
        code: 'let best = 9999\non start {\n    basic.showIcon(IconNames.SmallDiamond)\n    basic.pause(Math.randomRange(2000, 5000))\n    basic.showIcon(IconNames.Square)\n    let start = input.runningTime()\n\n    while (!(input.buttonIsPressed(Button.A))) {\n        if (input.runningTime() - start > 3000) {\n            basic.showString("SLEEPY?")\n            control.reset()\n        }\n    }\n\n    let reaction = input.runningTime() - start\n    basic.showNumber(reaction)\n    if (reaction < best) {\n        best = reaction\n        basic.showIcon(IconNames.Happy)\n        music.playTone(880, 200)\n    }\n}',
        output: "Signal → press → reaction time in ms → new record sound",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Why athletes train this",
        body: "Formula 1 drivers react in around 200 ms, and esports players often beat 180 ms. Reaction time improves with practice and sleep — try measuring yourself before and after a good night's rest.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Why use a random delay before the signal?",
        options: [
          "To make the game slower",
          "To stop players guessing and pressing early",
          "To save battery",
          "Because the Micro:bit cannot count",
        ],
        answer: 1,
        explanation:
          "Random timing makes the game fair — players must actually react to the signal.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The block `input.runningTime()` returns the number of _______ since the board started.",
        answer: ["milliseconds", "millisecond", "ms"],
        explanation:
          "`runningTime()` counts milliseconds, which is the unit that makes reaction times meaningful.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Averaging about 250 ms is a typical human reaction time.",
        answer: true,
        explanation:
          "Most people react in 200–300 ms. Trained athletes and gamers can get under 200 ms.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "A player presses the button before the signal appears. Good game design says you should…",
        options: [
          "Ignore it and continue",
          "Tell them they were too early and penalise the round",
          "End the game forever",
          "Add 5 seconds to their time silently",
        ],
        answer: 1,
        explanation:
          "Clear, immediate feedback is fair. Punishing early presses keeps the measurement honest.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-12",
    author: "Ms. Rani Kusuma · Robotics Lead",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "microbit-radio-messages",
    title: "Radio Messages Between Micro:bits",
    subjectId: "robotics",
    unitId: "sensors-input",
    track: "robotics",
    summary: "Send messages between boards to build a two-way walkie-talkie.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["Radio", "Micro:bit", "Communication"],
    objectives: ["Send and receive radio strings", "Use groups to avoid interference"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Mr. Bagas Prasetyo · Robotics",
  },
  {
    id: "smart-plant-monitor",
    title: "Smart Plant Monitor",
    subjectId: "robotics",
    unitId: "robotics-projects",
    track: "robotics",
    summary: "Measure soil moisture and alert you when your plant needs water.",
    difficulty: "Intermediate",
    minutes: 35,
    xp: 210,
    tags: ["Sensors", "IoT", "Project"],
    objectives: ["Read an analogue soil sensor", "Set alert thresholds"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Ms. Rani Kusuma · Robotics Lead",
  },
  {
    id: "walking-robot-servos",
    title: "Walking Robot with Four Servos",
    subjectId: "robotics",
    unitId: "robotics-projects",
    track: "robotics",
    summary: "Coordinate eight servo movements into a walking gait.",
    difficulty: "Advanced",
    minutes: 60,
    xp: 320,
    tags: ["Servo", "Gait", "Advanced"],
    objectives: ["Sequence servo phases", "Debug mechanical timing"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Bagas Prasetyo · Robotics",
  },
];
