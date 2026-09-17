import type { Lesson } from "../types";

/** Science — biology, physics, chemistry, earth & space, human body. */
export const scienceLessons: Lesson[] = [
  {
    id: "cells-building-blocks",
    title: "Cells: The Building Blocks of Life",
    subjectId: "science",
    unitId: "biology",
    track: "science",
    summary:
      "Look inside a cell, compare plant and animal cells, and learn how microscopes reveal a hidden world.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 135,
    tags: ["Biology", "Cells", "Microscopes"],
    objectives: [
      "Name the main parts of a cell and their jobs",
      "Compare plant and animal cells",
      "Explain why cells are usually small",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "You are made of roughly **37 trillion cells**. Each one is a tiny factory with walls, power plants, control centres and a logistics department — all packed into a space far thinner than a human hair.",
          "The idea that living things are built from cells was proposed by Robert Hooke in 1665, after he looked at a slice of cork under a microscope and saw empty boxes that reminded him of monks' rooms — *cellula* in Latin.",
        ],
      },
      {
        type: "diagram",
        title: "A cell factory",
        nodes: [
          { emoji: "🧱", title: "Cell membrane", detail: "Controls what enters and leaves" },
          { emoji: "🧠", title: "Nucleus", detail: "Stores the DNA instructions" },
          { emoji: "⚡", title: "Mitochondria", detail: "Release energy from food (respiration)" },
          { emoji: "🏭", title: "Ribosomes", detail: "Build proteins, the cell's machines" },
        ],
      },
      {
        type: "table",
        title: "Plant cell vs animal cell",
        headers: ["Feature", "Plant cell", "Animal cell", "Job"],
        rows: [
          ["Cell wall", "✅ cellulose", "❌", "Rigid support and shape"],
          ["Chloroplasts", "✅", "❌", "Capture light for photosynthesis"],
          ["Large vacuole", "✅ one big", "small / many", "Stores water and keeps the cell firm"],
          ["Nucleus", "✅", "✅", "Contains DNA instructions"],
          ["Mitochondria", "✅", "✅", "Releases energy by respiration"],
          ["Cell membrane", "✅", "✅", "Controls movement in and out"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Why are cells so small?",
        body: "As a cell grows, its volume increases faster than its surface area. A cell that is too big cannot absorb nutrients or remove waste fast enough through its membrane, so it divides instead. Surface area to volume ratio is one of the great organising ideas in biology.",
      },
      {
        type: "steps",
        title: "Practical: observe onion cells",
        steps: [
          {
            title: "Prepare the slide",
            body: "Peel a thin layer of epidermis from an onion, place it flat on a slide, and add a drop of iodine solution — the stain makes the nucleus visible.",
          },
          {
            title: "Lower the coverslip",
            body: "Touch one edge of the coverslip to the liquid and lower it slowly at an angle. This pushes air out and avoids trapping bubbles, which look like fat black circles.",
            hint: "Never press down on the coverslip — you will break the glass.",
          },
          {
            title: "Start on the lowest power",
            body: "Always focus on low power first, find your cells, then move to high power. Starting at high power is the most common beginner mistake.",
          },
          {
            title: "Draw what you see, not what you expect",
            body: "Use a sharp pencil, draw single unbroken lines, and label: cell wall, cell membrane, cytoplasm, nucleus, vacuole. Include the magnification as a caption.",
            code: "Magnification = eyepiece × objective\nExample: 10 × 40 = ×400",
          },
          {
            title: "Calculate real size",
            body: "Divide the measured image size by the magnification to find the actual size of a cell. A cell measuring 40 mm at ×400 is 0.1 mm — that is 100 µm.",
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Some cells are gigantic",
        body: "Most cells are 10–30 µm wide, but a single ostrich egg — the largest cell in the world — is about 15 cm across. A human nerve cell can be over a metre long, with its cell body in your spine and its tip in your toe.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Learn the '-plast' and '-some' clues",
        body: "Word roots do half the memorising for you: *chloro* = green, *plast* = formed, *mito* = thread, *some* = body. Recognising roots makes new scientific words readable instead of random.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which structure is found in plant cells but NOT animal cells?",
        options: ["Nucleus", "Cell membrane", "Cell wall", "Mitochondria"],
        answer: 2,
        explanation:
          "The cellulose cell wall gives plants their rigid shape. Both cell types share the nucleus, membrane and mitochondria.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The _______ controls what enters and leaves the cell.",
        answer: ["cell membrane", "membrane"],
        explanation:
          "The cell membrane is selectively permeable — a carefully controlled doorway, not just a bag.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Mitochondria are the site of energy release in the cell.",
        answer: true,
        explanation:
          "Mitochondria carry out aerobic respiration, releasing energy from glucose for the cell to use.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "At ×400 magnification, a cell appears 8 mm wide on the drawing. What is its actual width?",
        options: ["0.02 mm", "0.2 mm", "2 mm", "32 mm"],
        answer: 0,
        explanation: "Actual size = image size ÷ magnification = 8 ÷ 400 = 0.02 mm (20 µm).",
        points: 25,
      },
    ],
    updatedAt: "2026-08-29",
    author: "Ms. Nadia Pratama · Science",
  },
  {
    id: "forces-and-motion",
    title: "Forces & Motion: Newton's Laws in Real Life",
    subjectId: "science",
    unitId: "physics",
    track: "science",
    summary:
      "Push, pull, accelerate, brake. Learn the three laws that explain a skateboard, a seatbelt and a rocket launch.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["Physics", "Forces", "Newton", "Motion"],
    objectives: [
      "State and apply Newton's three laws of motion",
      "Calculate force using F = m × a",
      "Explain balanced vs unbalanced forces",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A **force** is a push or a pull, measured in newtons (N). Forces are vectors: they have size *and* direction. This matters more than it seems, because forces in opposite directions partly cancel out.",
          "When forces on an object are **balanced**, its motion does not change. When they are **unbalanced**, the object speeds up, slows down or changes direction. That single idea is the foundation of all mechanics.",
        ],
      },
      {
        type: "table",
        title: "Newton's three laws",
        headers: ["Law", "Statement", "Everyday example"],
        rows: [
          ["1st — Inertia", "An object stays still or moves at constant velocity unless a resultant force acts", "You lurch forward when a bus brakes"],
          ["2nd — F = m × a", "Force equals mass times acceleration", "A trolley full of books needs more push than an empty one"],
          ["3rd — Action & reaction", "Every action has an equal and opposite reaction", "A rocket pushes gas down; the gas pushes the rocket up"],
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Calculate forces in Python",
        code: "# A 1200 kg car accelerates from 0 to 20 m/s in 8 seconds\ndef acceleration(start_speed, end_speed, time):\n    return (end_speed - start_speed) / time\n\na = acceleration(0, 20, 8)\nprint(f\"Acceleration: {a} m/s²\")\n\nforce = 1200 * a\nprint(f\"Force needed: {force} N\")\n\n# What about the friction acting against it?\nfriction = 400\nnet_force = force + friction\nprint(f\"Engine force must overcome friction: {net_force} N\")",
        output: "Acceleration: 2.5 m/s²\nForce needed: 3000.0 N\nEngine force must overcome friction: 3400 N",
      },
      {
        type: "diagram",
        title: "Balanced vs unbalanced",
        nodes: [
          { emoji: "➡️", title: "Push 50 N", detail: "Forward force from the engine" },
          { emoji: "⬅️", title: "Friction 50 N", detail: "Air and road resistance" },
          { emoji: "⚖️", title: "Resultant = 0", detail: "Constant speed, not at rest" },
          { emoji: "🚀", title: "Unbalance it", detail: "Push harder and the car accelerates" },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Constant speed still needs a force",
        body: "Moving at a constant speed on a road is *not* the same as balanced forces being unnecessary — the engine must keep pushing to cancel out friction. Students often assume 'constant speed = no forces'. It means no **resultant** force.",
      },
      {
        type: "steps",
        title: "Practical: measure acceleration with a ramp",
        steps: [
          {
            title: "Set up the ramp and light gate",
            body: "Raise one end of a ramp to 20 cm. Place light gates 60 cm apart down the slope so the trolley interrupts each beam in turn.",
          },
          {
            title: "Measure and calculate",
            body: "Each gate gives a speed. Acceleration = change in speed ÷ time taken between gates.",
            code: "a = (v − u) / t\n   = (2.4 − 0.9) / 0.8\n   = 1.875 m/s²",
          },
          {
            title: "Change one variable",
            body: "Add 200 g to the trolley and repeat. Same force, greater mass, smaller acceleration — Newton's second law in a single experiment.",
          },
          {
            title: "Control the variables",
            body: "Keep the ramp angle, starting position and release method identical every time. Changing two things at once makes results meaningless.",
          },
          {
            title: "Plot a graph",
            body: "Plot acceleration on the y-axis against mass on the x-axis. You should see a curve like 1/x — which is exactly what F = ma predicts.",
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Why you feel heavy in a lift",
        body: "Your weight is the force of gravity on your mass (W = m × g, where g ≈ 9.8 N/kg). When a lift accelerates upward, the floor pushes on you harder than gravity pulls — the resultant upward force accelerates you, and you *feel* heavier.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Always draw the arrows first",
        body: "Before touching a formula, sketch the object and draw every force arrow with a label and value. Most physics mistakes are direction mistakes, and a diagram catches them before they become arithmetic.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "A 4 kg ball is pushed with a net force of 12 N. What is its acceleration?",
        options: ["48 m/s²", "3 m/s²", "0.33 m/s²", "16 m/s²"],
        answer: 1,
        explanation: "a = F ÷ m = 12 ÷ 4 = 3 m/s².",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Forces are measured in _______ (symbol N).",
        answer: ["newtons", "newton", "N"],
        explanation: "The unit is named after Isaac Newton, whose laws describe how forces change motion.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "An object moving at a constant speed has no forces acting on it.",
        answer: false,
        explanation:
          "It has **balanced** forces — the resultant is zero. Friction still exists and must be cancelled by another force.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match each situation to the law it best demonstrates.",
        pairs: [
          { left: "A passenger lurching forward when a bus brakes", right: "First law (inertia)" },
          { left: "A heavier trolley needing a bigger push", right: "Second law (F = ma)" },
          { left: "A rocket pushing gas downward", right: "Third law (action–reaction)" },
        ],
        explanation:
          "Inertia explains why you keep moving, F = ma explains how much force you need, and action–reaction explains pushed-back motion.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-03",
    author: "Mr. Fajar Ramadhan · Physics",
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions: Atoms Rearranging",
    subjectId: "science",
    unitId: "chemistry",
    track: "science",
    summary:
      "Balance an equation, spot four reaction types, and see why mass is never lost in a reaction.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["Chemistry", "Reactions", "Equations", "Atoms"],
    objectives: [
      "Explain conservation of mass in reactions",
      "Balance simple chemical equations",
      "Identify combustion, decomposition, displacement and neutralisation",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "In a chemical reaction, atoms are **rearranged, never created or destroyed**. That is the law of conservation of mass, and it is why chemists count atoms so obsessively.",
          "If you burn 12 g of carbon completely, you get 44 g of carbon dioxide — because the extra 32 g comes from oxygen pulled out of the air. Nothing vanished; atoms simply changed partners.",
        ],
      },
      {
        type: "figure",
        title: "Balancing is counting",
        caption:
          "The number in front of a formula multiplies everything after it. Never change a subscript — that changes the substance itself.",
        visual: "molecule",
        items: ["CH₄", "2 O₂", "CO₂", "2 H₂O", "Balanced ✓"],
      },
      {
        type: "steps",
        title: "Method: balance CH₄ + O₂ → CO₂ + H₂O",
        steps: [
          {
            title: "Count each element on both sides",
            body: "Left: C=1, H=4, O=2. Right: C=1, H=2, O=3. The carbons already balance.",
          },
          {
            title: "Balance hydrogen first",
            body: "There are 4 hydrogen atoms on the left and only 2 on the right, so put a 2 in front of H₂O.",
            code: "CH₄ + O₂ → CO₂ + 2 H₂O",
          },
          {
            title: "Recount and fix oxygen",
            body: "Now the right side has 2 + 2 = 4 oxygen atoms, so oxygen needs a 2 in front of O₂.",
            code: "CH₄ + 2 O₂ → CO₂ + 2 H₂O",
          },
          {
            title: "Final check",
            body: "C: 1 = 1. H: 4 = 4. O: 4 = 4. Balanced — and the equation now tells you that one methane molecule needs two oxygen molecules.",
          },
          {
            title: "Never balance by changing subscripts",
            body: "Turning H₂O into H₂O₂ would balance the numbers but describe a completely different chemical (hydrogen peroxide). Only change the big numbers in front.",
          },
        ],
      },
      {
        type: "table",
        title: "Four reaction types",
        headers: ["Type", "Pattern", "Example", "Real-world use"],
        rows: [
          ["Combustion", "Fuel + O₂ → CO₂ + H₂O", "CH₄ + 2O₂ → CO₂ + 2H₂O", "Cooking, engines, power stations"],
          ["Decomposition", "One compound → two or more", "2H₂O₂ → 2H₂O + O₂", "Hydrogen peroxide as disinfectant"],
          ["Displacement", "A + BC → AC + B", "Zn + CuSO₄ → ZnSO₄ + Cu", "Extracting metals from ores"],
          ["Neutralisation", "Acid + base → salt + water", "HCl + NaOH → NaCl + H₂O", "Treating acid spills and heartburn"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Exothermic vs endothermic",
        body: "Reactions that release energy to the surroundings are **exothermic** (combustion, respiration). Reactions that absorb energy are **endothermic** (photosynthesis, thermal decomposition). Temperature change during a reaction is your clue.",
      },
      {
        type: "steps",
        title: "Practical: rate of reaction",
        steps: [
          {
            title: "Choose your reaction",
            body: "Marble chips + hydrochloric acid gives off carbon dioxide, which you can collect and measure.",
            code: "CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂",
          },
          {
            title: "Measure a change over time",
            body: "Record the volume of gas collected every 10 seconds for 2 minutes, or record the mass lost as the gas escapes.",
          },
          {
            title: "Change the surface area",
            body: "Repeat with the same mass of powdered marble instead of chips. Same atoms, more exposed surface, far faster reaction.",
          },
          {
            title: "Change the concentration",
            body: "Use 0.5 M instead of 1 M acid. Fewer acid particles in the same volume means fewer collisions per second, so the reaction slows.",
          },
          {
            title: "Explain with collision theory",
            body: "Reactions happen when particles collide with enough energy. Faster, more concentrated or hotter means more successful collisions per second — that is what 'rate' means.",
          },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Reading chemical formulae",
        body: "Numbers after a symbol are subscripts and apply to that atom only: in `Ca(OH)₂` the bracket multiplies, giving 1 calcium, 2 oxygen and 2 hydrogen atoms. Practise counting before you practise balancing.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which equation is correctly balanced?",
        options: [
          "H₂ + O₂ → H₂O",
          "2H₂ + O₂ → 2H₂O",
          "H₂ + O₂ → 2H₂O",
          "2H₂ + 2O₂ → 2H₂O",
        ],
        answer: 1,
        explanation:
          "2H₂ + O₂ → 2H₂O has 4 H and 2 O on each side. Option 1 has unequal oxygen, the others have unequal hydrogen or oxygen.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "In a chemical reaction, atoms are never created or destroyed — this is the law of conservation of _______.",
        answer: ["mass", "matter"],
        explanation:
          "Total mass stays the same because the same atoms are simply rearranged into new combinations.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Acid + base → salt + water is called neutralisation.",
        answer: true,
        explanation:
          "The acid and base cancel each other's properties, producing a salt and water (and energy).",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match the reaction to its type.",
        pairs: [
          { left: "Burning methane in a stove", right: "Combustion" },
          { left: "Hydrogen peroxide fizzing", right: "Decomposition" },
          { left: "Zinc in copper sulfate solution", right: "Displacement" },
          { left: "Treating heartburn with antacid", right: "Neutralisation" },
        ],
        explanation:
          "Spotting the pattern — fuel + oxygen, one → many, metal swapping places, acid + base — tells you the type instantly.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-07",
    author: "Ms. Nadia Pratama · Science",
  },
  {
    id: "solar-system-scale",
    title: "Earth & Space: The Solar System at Scale",
    subjectId: "science",
    unitId: "earth-space",
    track: "science",
    summary:
      "Compare planet sizes, orbital periods and distances — and discover why every diagram of the solar system lies.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Space", "Planets", "Scale", "Astronomy"],
    objectives: [
      "Order the planets and compare their sizes",
      "Relate orbital distance to orbital period",
      "Explain why scale models are usually distorted",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Every picture of the solar system you have seen is a compromise. If a poster showed the planets at the correct size *and* the correct distance, the planets would be specks of dust hundreds of metres apart.",
          "Real scale matters because it corrects our intuition. The Sun holds 99.86% of all the mass in the solar system. Jupiter is more massive than every other planet combined. And the distance from the Sun to Neptune is roughly thirty times the Earth–Sun distance.",
        ],
      },
      {
        type: "widget",
        widget: "solarSystem",
        title: "Interactive solar system",
        caption:
          "Press play to orbit the planets, adjust the speed, and tap any planet to read its data. Notice how the outer planets crawl while the inner ones race.",
        config: {},
      },
      {
        type: "table",
        title: "The eight planets",
        headers: ["Planet", "Distance from Sun", "Diameter", "Year length", "Moons"],
        rows: [
          ["Mercury", "58 million km", "4,879 km", "88 days", "0"],
          ["Venus", "108 million km", "12,104 km", "225 days", "0"],
          ["Earth", "150 million km", "12,742 km", "365 days", "1"],
          ["Mars", "228 million km", "6,779 km", "687 days", "2"],
          ["Jupiter", "778 million km", "139,820 km", "12 years", "95+"],
          ["Saturn", "1.4 billion km", "116,460 km", "29 years", "146+"],
          ["Uranus", "2.9 billion km", "50,724 km", "84 years", "28"],
          ["Neptune", "4.5 billion km", "49,244 km", "165 years", "16"],
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Light takes time to travel",
        body: "Sunlight takes about **8 minutes 20 seconds** to reach Earth. When you look at the Sun you are seeing it as it was eight minutes ago. Looking at Neptune through a telescope shows it as it was four hours ago — astronomy is time travel by distance.",
      },
      {
        type: "steps",
        title: "Build it: a true-scale model in the school corridor",
        steps: [
          {
            title: "Pick your scale",
            body: "Use 1 cm = 1 million km. The Sun becomes 139 cm wide (bigger than a beach ball) and Earth becomes a 1.27 cm marble.",
            code: "Scale: 1 cm = 1,000,000 km\nSun:    139 cm\nEarth:  1.27 cm\nJupiter: 14 cm",
          },
          {
            title: "Place the Sun at one end",
            body: "Put a 1.4 m ball at the start of a corridor. Everything else is placed along the length.",
          },
          {
            title: "Measure the distances",
            body: "Earth goes at 150 cm, Mars at 228 cm, Jupiter at 7.8 m, and Neptune at 45 m — which is why you need a long corridor or a playing field.",
            hint: "Measure with steps first, then check with a tape measure.",
          },
          {
            title: "Add scale labels",
            body: "Label distances in millions of km and compare with a real poster. Seeing the difference between 'artistic' and 'accurate' is the whole point of the experiment.",
          },
          {
            title: "Add the light-speed twist",
            body: "Mark on the floor how far light travels in one second, one minute and one hour (300,000 km per second, scaled down to 0.3 cm per second). At this scale light crosses your whole model in under three minutes.",
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "How long is a year on another planet?",
        code: 'planets = {\n    "Mercury": 88,\n    "Venus": 225,\n    "Earth": 365,\n    "Mars": 687,\n    "Jupiter": 4333,\n    "Saturn": 10759,\n}\n\nfor name, days in planets.items():\n    earth_years = days / 365\n    print(f"{name}: {days} days = {earth_years:.1f} Earth years")',
        output: "Mercury: 88 days = 0.2 Earth years\nVenus: 225 days = 0.6 Earth years\nEarth: 365 days = 1.0 Earth years\nMars: 687 days = 1.9 Earth years\nJupiter: 4333 days = 11.9 Earth years\nSaturn: 10759 days = 29.5 Earth years",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Kepler's pattern",
        body: "The further a planet is from the Sun, the longer its year — and the relationship is a clean mathematical curve (period² ∝ distance³). Patterns like this are how scientists move from observation to law.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which planet has the longest year?",
        options: ["Jupiter", "Saturn", "Neptune", "Mercury"],
        answer: 2,
        explanation:
          "Neptune takes about 165 Earth years to orbit the Sun. The further a planet is, the longer its orbit.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Sunlight takes about _______ minutes to reach the Earth.",
        answer: ["8", "8.3", "eight"],
        explanation:
          "At 300,000 km/s across 150 million km, light takes roughly 8 minutes and 20 seconds.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Jupiter is more massive than all the other planets in the solar system combined.",
        answer: true,
        explanation:
          "Jupiter's mass is about 2.5 times the total mass of every other planet combined.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Why do most solar system posters distort the distances?",
        options: [
          "Astronomers do not know the real distances",
          "Real distances are far too large to show next to correctly sized planets",
          "The planets move too fast to draw",
          "Posters always use artistic licence",
        ],
        answer: 1,
        explanation:
          "True scale makes planets microscopic. Designers shrink distances or exaggerate planet sizes to keep diagrams readable.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-09",
    author: "Mr. Fajar Ramadhan · Physics",
  },
  {
    id: "human-heart-circulation",
    title: "The Human Body: Your Heart Never Rests",
    subjectId: "science",
    unitId: "human-body",
    track: "science",
    summary:
      "Follow a single blood cell through the heart, lungs and body — and measure how your own heart responds to exercise.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 145,
    tags: ["Human body", "Circulation", "Heart", "Health"],
    objectives: [
      "Label the four chambers of the heart and their vessels",
      "Trace the double circulation of blood",
      "Explain how exercise changes heart rate and why",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Your heart beats about **100,000 times a day**, pushing 7,500 litres of blood through 100,000 km of vessels — a distance that would wrap around the Earth twice.",
          "It is a double pump. The right side sends blood to the lungs to pick up oxygen; the left side sends that oxygenated blood around the entire body. Separate circuits keep oxygen-rich and oxygen-poor blood from mixing.",
        ],
      },
      {
        type: "diagram",
        title: "Double circulation",
        loop: true,
        nodes: [
          { emoji: "🫀", title: "Right atrium", detail: "Receives oxygen-poor blood from the body" },
          { emoji: "🫁", title: "Lungs", detail: "Blood picks up oxygen, releases CO₂" },
          { emoji: "💪", title: "Body tissues", detail: "Oxygen and glucose delivered to cells" },
          { emoji: "🫀", title: "Left ventricle", detail: "Thickest wall — pumps to the whole body" },
        ],
      },
      {
        type: "table",
        title: "Blood vessels: three different jobs",
        headers: ["Vessel", "Direction", "Wall", "Speed / pressure"],
        rows: [
          ["Artery", "Away from the heart", "Thick, elastic, muscular", "Fast, high pressure"],
          ["Capillary", "Between artery and vein", "One cell thick", "Slow — allows exchange"],
          ["Vein", "Back to the heart", "Thin, valves prevent backflow", "Slow, low pressure"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Why the left ventricle is thickest",
        body: "The left ventricle must push blood to your brain, fingers and toes — all the way around the body. The right ventricle sends blood only a short distance to the lungs, so it needs far less muscle. Structure follows function, everywhere in biology.",
      },
      {
        type: "steps",
        title: "Practical: measure your own heart rate",
        steps: [
          {
            title: "Find your pulse",
            body: "Place two fingers (not your thumb) on the inside of your wrist below the thumb. You are feeling the radial artery.",
          },
          {
            title: "Count beats for 30 seconds",
            body: "Count the beats for 30 seconds and multiply by 2. A shorter count is easier but less accurate — a 60-second count is the reference standard.",
          },
          {
            title: "Record resting rate",
            body: "Sit still for two minutes first. A typical teenager's resting rate is 60–90 beats per minute.",
          },
          {
            title: "Exercise and re-measure",
            body: "Do 60 seconds of star jumps, then measure immediately. Then measure again at 1, 2 and 3 minutes afterwards to see recovery time.",
            code: "Resting:      72 bpm\nAfter exercise: 148 bpm\n1 min later:   112 bpm\n3 min later:    84 bpm",
          },
          {
            title: "Explain the data",
            body: "Working muscles need more oxygen and glucose and produce more carbon dioxide. The heart beats faster to deliver more oxygen and remove waste. Recovery time reflects fitness — trained athletes return to resting rate much faster.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Blood is not 'blue'",
        body: "Diagrams use blue for oxygen-poor blood, but deoxygenated blood is dark red, not blue. Colour coding is a teaching convention, not what surgeons see.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "The heart has its own power supply",
        body: "The coronary arteries feed the heart muscle itself. When one is blocked, the muscle downstream runs out of oxygen — that is a heart attack. This is why cardiologists talk about 'plumbing', not just pumping.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which chamber pumps blood to the whole body?",
        options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
        answer: 3,
        explanation:
          "The left ventricle has the thickest muscular wall because it must push blood around the entire body.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The vessels that carry blood AWAY from the heart are called _______.",
        answer: ["arteries", "artery"],
        explanation:
          "Arteries carry blood away from the heart (usually oxygenated), veins return it, and capillaries connect them.",
        points: 20,
      },
      {
        id: "q3",
        type: "matching",
        prompt: "Match each vessel to its property.",
        pairs: [
          { left: "Artery", right: "Thick elastic wall, high pressure" },
          { left: "Capillary", right: "One cell thick" },
          { left: "Vein", right: "Valves to stop backflow" },
          { left: "Left ventricle", right: "Thickest heart muscle" },
        ],
        explanation:
          "Each structure is shaped by the job it does — pressure, exchange or return.",
        points: 25,
      },
      {
        id: "q4",
        type: "trueFalse",
        prompt: "Deoxygenated blood is blue.",
        answer: false,
        explanation:
          "It is dark red. Diagrams use blue only to show that the blood is carrying less oxygen.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-12",
    author: "Ms. Nadia Pratama · Science",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "photosynthesis",
    title: "Photosynthesis: The Planet's Solar Panel",
    subjectId: "science",
    unitId: "biology",
    track: "science",
    summary: "How plants turn sunlight, water and CO₂ into food and oxygen.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Biology", "Plants", "Photosynthesis"],
    objectives: ["Write the word equation", "Test a leaf for starch"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Ms. Nadia Pratama · Science",
  },
  {
    id: "electric-circuits",
    title: "Electricity: Series, Parallel and Ohm's Law",
    subjectId: "science",
    unitId: "physics",
    track: "science",
    summary: "Build circuits in simulation, measure current and voltage, and apply V = IR.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 175,
    tags: ["Physics", "Electricity", "Circuits"],
    objectives: ["Compare series and parallel circuits", "Calculate using V = I × R"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Fajar Ramadhan · Physics",
  },
];
