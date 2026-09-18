import type { Lesson } from "./types";

export const stemLessons: Lesson[] = [
  // ─── MATHEMATICS ─────────────────────────────────────────────
  {
    id: "m-algebra",
    subjectId: "mathematics",
    title: "Algebra: Solve for X Like a Detective",
    description:
      "Equations are mysteries and x is the suspect. Learn to isolate it with inverse operations.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["algebra", "equations"],
    objectives: [
      "Solve one-step and two-step equations",
      "Use inverse operations correctly",
      "Check answers by substitution",
    ],
    sections: [
      {
        heading: "Equations are balanced scales",
        body: [
          "Think of  x + 7 = 15  as a perfectly balanced scale. To find x, remove 7 from the left — but the golden rule says whatever you do to one side, you must do to the other, or the scale tips.",
          "So subtract 7 from both sides: x = 8. Every equation in history surrenders to this one idea: keep both sides balanced while isolating x.",
        ],
      },
      {
        heading: "Inverse operations undo each other",
        body: [
          "Addition undoes subtraction; multiplication undoes division. To solve 3x = 24, divide both sides by 3: x = 8. To solve x/4 = 5, multiply both sides by 4: x = 20.",
          "For two-step equations like 2x + 5 = 17, undo in reverse order of operations: first subtract 5 (both sides), then divide by 2. x = 6. Work backwards through PEMDAS!",
        ],
      },
      {
        heading: "Always check by substitution",
        body: [
          "Detectives verify alibis; mathematicians verify answers. Plug x = 6 back in: 2(6) + 5 = 17. ✓ True! Checking takes 10 seconds and catches most mistakes.",
          "If the check fails, retrace your steps — the error is usually a sign slip (+/−) or doing an operation on only one side.",
        ],
      },
    ],
    keyTerms: [
      { term: "Variable", definition: "A letter (like x) representing an unknown number." },
      { term: "Inverse operation", definition: "An operation that undoes another (+/−, ×/÷)." },
      { term: "Solution", definition: "The value of the variable that makes the equation true." },
    ],
    examples: [
      {
        title: "Two-step equation, solved",
        language: "text",
        code: "Solve: 4x − 9 = 19\n\nStep 1: undo −9 → add 9 both sides\n  4x = 28\nStep 2: undo ×4 → divide both sides by 4\n  x = 7\n\nCheck: 4(7) − 9 = 28 − 9 = 19 ✓",
        explanation:
          "Undo addition/subtraction first, then multiplication/division — the reverse of PEMDAS order.",
      },
    ],
    activity: {
      title: "Equation escape room",
      description: "Solve 4 equations to crack the 4-digit escape code.",
      steps: [
        "Solve: x + 12 = 25 → first digit of code.",
        "Solve: 3y = 21 → second digit.",
        "Solve: 2z − 4 = 10 → third digit.",
        "Solve: a/5 + 3 = 8 → fourth digit. Enter the code: _ _ _ _",
      ],
      hints: [
        "Show each check: substitute your answer back in.",
        "Expected code ends in 5 — use that to verify your last answer.",
      ],
    },
    quiz: [
      {
        question: "Solve: x + 9 = 21",
        options: ["x = 30", "x = 12", "x = 3", "x = 9"],
        answer: 1,
        explanation: "Subtract 9 from both sides: x = 21 − 9 = 12.",
      },
      {
        question: "First step to solve 5x − 2 = 18?",
        options: [
          "Divide by 5",
          "Add 2 to both sides",
          "Multiply by 5",
          "Subtract 18",
        ],
        answer: 1,
        explanation: "Undo addition/subtraction first: add 2 to both sides → 5x = 20.",
      },
      {
        question: "Solve: x/3 = 7",
        options: ["x = 10", "x = 4", "x = 21", "x = 3"],
        answer: 2,
        explanation: "Multiply both sides by 3: x = 21.",
      },
    ],
    popular: true,
  },
  {
    id: "m-geometry",
    subjectId: "mathematics",
    title: "Geometry: Angles, Shapes & Space",
    description:
      "From triangle angles to circle area — see the geometry hiding in buildings, art and games.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["geometry", "shapes"],
    objectives: [
      "Classify angles and triangles",
      "Use the 180° triangle rule",
      "Calculate area of key shapes",
    ],
    sections: [
      {
        heading: "Angles are everywhere",
        body: [
          "An angle measures a turn in degrees. Acute (< 90°), right (= 90°), obtuse (> 90°), straight (= 180°). Skateboarders, architects and game developers all think in angles daily.",
          "Complementary angles sum to 90°; supplementary sum to 180°. If one angle is 35°, its complement is 55° — no protractor needed.",
        ],
      },
      {
        heading: "The magic of 180°",
        body: [
          "Every triangle's angles sum to exactly 180° — always. Know two angles? Subtract from 180 to find the third. This single fact solves hundreds of exam problems.",
          "Triangles are classified by sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse). A right triangle with legs 3 and 4 has hypotenuse 5 — the famous 3-4-5 triple.",
        ],
      },
      {
        heading: "Area: covering surfaces",
        body: [
          "Area measures covering in square units. Rectangle: length × width. Triangle: ½ × base × height. Circle: πr² (pi ≈ 3.14).",
          "Real check: a 3m × 4m bedroom needs 12 m² of flooring. Geometry literally builds the rooms you're sitting in.",
        ],
      },
    ],
    keyTerms: [
      { term: "Acute angle", definition: "An angle smaller than 90°." },
      { term: "Hypotenuse", definition: "The longest side of a right triangle, opposite the right angle." },
      { term: "Pi (π)", definition: "≈ 3.14, the ratio of a circle's circumference to its diameter." },
    ],
    examples: [
      {
        title: "Find the missing angle",
        language: "text",
        code: "Triangle angles: 50° and 70°. Find the third.\n\nSum rule: a + b + c = 180°\n50 + 70 + c = 180\nc = 180 − 120 = 60°\n\nAnswer: 60° (an acute triangle!)",
        explanation: "Two known angles are subtracted from 180° to reveal the third.",
      },
      {
        title: "Circle area",
        language: "text",
        code: "Pizza radius r = 10 cm. Area?\n\nA = πr² = 3.14 × 10²\n  = 3.14 × 100 = 314 cm²\n\nA 20 cm pizza (r=10) has 314 cm² of\ncheesy goodness. 🍕",
        explanation: "Square the radius first, then multiply by π. Units become squared (cm²).",
      },
    ],
    activity: {
      title: "Geometry scavenger hunt",
      description: "Find and measure real geometry around your home.",
      steps: [
        "Find one acute, one right and one obtuse angle — photograph or sketch each.",
        "Measure a rectangular table: compute its area in cm².",
        "Find a circle (plate, clock): measure diameter, compute area with πr².",
        "Bonus: verify a triangle's angles sum to 180° using a protractor app.",
      ],
      hints: [
        "Radius = diameter ÷ 2. Don't forget!",
        "Door frames and book corners are perfect right angles.",
      ],
    },
    quiz: [
      {
        question: "Angles 40° and 90° — what is the third angle?",
        options: ["40°", "50°", "90°", "130°"],
        answer: 1,
        explanation: "180 − 40 − 90 = 50°.",
      },
      {
        question: "Area of a triangle with base 10 and height 6?",
        options: ["60", "30", "16", "32"],
        answer: 1,
        explanation: "½ × 10 × 6 = 30 square units.",
      },
      {
        question: "Which is an obtuse angle?",
        options: ["45°", "90°", "120°", "180°"],
        answer: 2,
        explanation: "Obtuse means strictly between 90° and 180°.",
      },
    ],
  },
  {
    id: "m-fractions",
    subjectId: "mathematics",
    title: "Fractions, Decimals & Percentages",
    description:
      "Slice pizzas, split bills and ace discounts by mastering the three faces of numbers.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["fractions", "percentages"],
    objectives: [
      "Convert between fractions, decimals and %",
      "Add and multiply fractions",
      "Solve discount and percentage problems",
    ],
    sections: [
      {
        heading: "Same value, three costumes",
        body: [
          "½ = 0.5 = 50% — one value wearing three outfits. Fractions show parts (3 of 4 slices), decimals show place value (0.75), percentages show 'per hundred' (75%).",
          "Conversions: fraction → decimal by dividing (3÷4 = 0.75); decimal → % by ×100 (0.75 → 75%). Memorize the classics: ¼=25%, ⅓≈33%, ½=50%, ¾=75%.",
        ],
      },
      {
        heading: "Operating on fractions",
        body: [
          "Adding? Same denominator required: 1/4 + 2/4 = 3/4. Different denominators? Find a common one: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Always simplify at the end!",
          "Multiplying is easier — no common denominator needed: 2/3 × 3/5 = 6/15 = 2/5. Just multiply tops, multiply bottoms, simplify.",
        ],
      },
      {
        heading: "Percentages run the real world",
        body: [
          "Discounts, taxes, phone battery, exam scores — all percentages. A Rp200.000 jacket at 25% off? Discount = 0.25 × 200.000 = Rp50.000, so you pay Rp150.000.",
          "Going backwards: scored 27/30? That's 27÷30 = 0.9 = 90%. Percentages turn any score into a universal scale.",
        ],
      },
    ],
    keyTerms: [
      { term: "Numerator", definition: "The top number: how many parts you have." },
      { term: "Denominator", definition: "The bottom number: how many equal parts make a whole." },
      { term: "Percent", definition: "'Per hundred' — 25% means 25 out of 100." },
    ],
    examples: [
      {
        title: "Sale price math",
        language: "text",
        code: "Shoes Rp450.000, discount 30%.\n\nDiscount = 30% × 450.000\n         = 0.30 × 450.000\n         = Rp135.000\nPay = 450.000 − 135.000\n    = Rp315.000 ✓",
        explanation: "Convert % to decimal (÷100), multiply for the discount, subtract from the price.",
      },
    ],
    activity: {
      title: "Mall mathematician",
      description: "Compute final prices for 3 sale items and find the best deal.",
      steps: [
        "Item A: Rp120.000 at 20% off — final price?",
        "Item B: Rp200.000 at 35% off — final price?",
        "Item C: 'Buy 2 get 1 free' at Rp80.000 each — effective discount %?",
        "Decide: which saves the most rupiah? Which saves the highest %?",
      ],
      hints: [
        "Buy-2-get-1-free = pay 160.000 for 240.000 value → 33.3% off.",
        "Highest % off isn't always the biggest rupiah saving!",
      ],
    },
    quiz: [
      {
        question: "0.6 as a percentage is...",
        options: ["6%", "60%", "600%", "0.6%"],
        answer: 1,
        explanation: "Multiply by 100: 0.6 × 100 = 60%.",
      },
      {
        question: "1/2 + 1/4 = ?",
        options: ["2/6", "3/4", "1/6", "2/4"],
        answer: 1,
        explanation: "Common denominator 4: 2/4 + 1/4 = 3/4.",
      },
      {
        question: "Rp100.000 with 15% discount costs...",
        options: ["Rp115.000", "Rp85.000", "Rp15.000", "Rp90.000"],
        answer: 1,
        explanation: "Discount Rp15.000 → pay 100.000 − 15.000 = Rp85.000.",
      },
    ],
  },
  {
    id: "m-statistics",
    subjectId: "mathematics",
    title: "Statistics: Data Tells Stories",
    description:
      "Mean, median, mode and charts — learn to read data and spot misleading graphs.",
    level: "Intermediate",
    durationMin: 30,
    xp: 75,
    tags: ["statistics", "data"],
    objectives: [
      "Compute mean, median and mode",
      "Choose the right chart for data",
      "Detect misleading statistics",
    ],
    sections: [
      {
        heading: "Three kinds of 'average'",
        body: [
          "Mean = sum ÷ count (balances all values). Median = middle value when sorted (ignores extremes). Mode = most frequent value (bests for categories like favorite color).",
          "Salaries example: nine people earn Rp5jt, the boss earns Rp100jt. Mean = Rp14.5jt (misleading!), median = Rp5jt (honest). Always ask which average is quoted — and why.",
        ],
      },
      {
        heading: "Charts that clarify",
        body: [
          "Bar charts compare categories (scores per subject). Line charts show change over time (temperature by month). Pie charts show parts of a whole (budget splits) — but only with few slices!",
          "Every honest chart needs labeled axes, units and a zero baseline on bar charts. Truncated axes exaggerate tiny differences into fake drama.",
        ],
      },
      {
        heading: "Lie detection for numbers",
        body: [
          "Classic tricks: cherry-picked time ranges, confusing correlation with causation ('ice cream sales and drownings both rise in summer' — the hidden cause is heat), and tiny biased samples.",
          "Your defense kit: check the sample size, look for the source, ask 'compared to what?' and 'what's missing?'. Data literacy is a superpower in the age of viral charts.",
        ],
      },
    ],
    keyTerms: [
      { term: "Mean", definition: "Sum of values divided by count." },
      { term: "Median", definition: "The middle value of sorted data." },
      { term: "Correlation", definition: "Two things changing together — not proof one causes the other." },
    ],
    examples: [
      {
        title: "Class scores analysis",
        language: "text",
        code: "Scores: 70, 75, 80, 80, 85, 90, 95\n\nMean   = 575 ÷ 7 = 82.1\nMedian = 80 (middle of 7 values)\nMode   = 80 (appears twice)\n\nAll three agree ≈ 80s → a healthy,\nconsistent class performance.",
        explanation: "When mean ≈ median, data is balanced with no wild outliers pulling the average.",
      },
    ],
    activity: {
      title: "Survey your world",
      description: "Collect real data from 10 people and present it like a data journalist.",
      steps: [
        "Ask 10 friends: daily screen time in hours (whole numbers).",
        "Compute mean, median and mode of your data.",
        "Draw a bar chart grouping hours (0–2, 3–4, 5+).",
        "Write 2 honest sentences + deliberately create 1 misleading version. Spot the trick!",
      ],
      hints: [
        "Sort values first — medians need order.",
        "A misleading trick: start your bar axis at 3 instead of 0 and watch gaps explode.",
      ],
    },
    quiz: [
      {
        question: "Data: 2, 3, 3, 5, 9. The median is...",
        options: ["3", "4.4", "5", "9"],
        answer: 0,
        explanation: "Sorted already; the middle (3rd of 5) value is 3.",
      },
      {
        question: "Best chart for monthly rainfall over a year?",
        options: ["Pie chart", "Line chart", "Venn diagram", "Scatter only"],
        answer: 1,
        explanation: "Line charts show change over time beautifully.",
      },
      {
        question: "Ice cream sales correlate with drownings. Why?",
        options: [
          "Ice cream causes drowning",
          "A hidden factor (summer heat) drives both",
          "The data is fake",
          "Swimmers love ice cream too much",
        ],
        answer: 1,
        explanation: "Correlation ≠ causation. Summer heat increases both independently.",
      },
    ],
  },

  // ─── SCIENCE ─────────────────────────────────────────────────
  {
    id: "s-cells",
    subjectId: "science",
    title: "Cells: The Building Blocks of Life",
    description:
      "Tour the cell's organelles and discover how trillions of tiny units build you.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["biology", "cells"],
    objectives: [
      "Name major organelles and their jobs",
      "Compare plant vs animal cells",
      "Explain cells → tissues → organs",
    ],
    sections: [
      {
        heading: "You are 30 trillion cells",
        body: [
          "Every living thing is made of cells — you have about 30,000,000,000,000 of them. Each one is a microscopic factory with departments (organelles) doing specialized jobs.",
          "Cell theory, proven by 1855: all living things are made of cells, the cell is life's basic unit, and all cells come from existing cells. Three sentences that anchor all of biology.",
        ],
      },
      {
        heading: "Meet the organelles",
        body: [
          "Nucleus = control center holding DNA instructions. Mitochondria = power plants burning food into energy (ATP). Ribosomes = builders assembling proteins. Cell membrane = security gate deciding what enters and exits.",
          "Plant cells add three extras: a rigid cell wall, chloroplasts that photosynthesize sunlight into food, and a giant vacuole storing water. That's why plants stand tall and make their own meals.",
        ],
      },
      {
        heading: "From cells to you",
        body: [
          "Organization goes: cells → tissues (muscle) → organs (heart) → organ systems (circulatory) → organism (you). Specialization lets complex life exist — a nerve cell and a blood cell share DNA but do totally different jobs.",
          "Your body replaces about 330 billion cells daily. In roughly 7–10 years nearly every atom of you has been recycled. You are literally rebuilt, constantly.",
        ],
      },
    ],
    keyTerms: [
      { term: "Organelle", definition: "A specialized structure inside a cell doing one job." },
      { term: "DNA", definition: "Instruction molecule stored in the nucleus." },
      { term: "Photosynthesis", definition: "How plants turn sunlight + CO₂ + water into food." },
    ],
    examples: [
      {
        title: "Cell city analogy",
        language: "text",
        code: "🏙️  If the cell were a city:\nNucleus      → City hall (orders)\nMitochondria → Power plant (energy)\nRibosomes    → Factories (proteins)\nMembrane     → City wall + gates\nVacuole      → Warehouse (storage)\nChloroplast  → Solar farm (plants only!)",
        explanation: "Analogies stick: energy, control, building and storage exist in every working system.",
      },
    ],
    activity: {
      title: "Build an edible cell",
      description: "Model a plant or animal cell using food or craft materials.",
      steps: [
        "Choose plant or animal cell and list its required organelles.",
        "Pick a material per organelle (jelly = cytoplasm, plum = nucleus...).",
        "Assemble and label every part with toothpick flags.",
        "Explain each part's job in a 1-minute video or voice note.",
      ],
      hints: [
        "Plant cells must show wall, chloroplasts and large vacuole.",
        "Keep scale silly but labels serious — that's the fun balance.",
      ],
    },
    quiz: [
      {
        question: "Which organelle produces energy (ATP)?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"],
        answer: 2,
        explanation: "Mitochondria are the cell's power plants.",
      },
      {
        question: "Which structure is found ONLY in plant cells?",
        options: ["Nucleus", "Cell membrane", "Chloroplast", "Ribosome"],
        answer: 2,
        explanation: "Chloroplasts (plus wall and large vacuole) are plant-only.",
      },
      {
        question: "Correct order from smallest to largest?",
        options: [
          "Organ → cell → tissue → system",
          "Cell → tissue → organ → system",
          "Tissue → cell → organ → system",
          "System → organ → tissue → cell",
        ],
        answer: 1,
        explanation: "Cells form tissues, tissues form organs, organs form systems.",
      },
    ],
    popular: true,
  },
  {
    id: "s-forces",
    subjectId: "science",
    title: "Forces & Motion: Why Things Move",
    description:
      "Gravity, friction and Newton's three laws explained with sports, space and skateboards.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["physics", "forces"],
    objectives: [
      "State Newton's three laws with examples",
      "Explain gravity, friction and air resistance",
      "Calculate speed from distance and time",
    ],
    sections: [
      {
        heading: "Newton's three laws",
        body: [
          "Law 1 (inertia): objects keep doing what they're doing unless pushed. That's why you lurch forward when a bus brakes — your body wants to keep moving.",
          "Law 2 (F = m × a): bigger force or smaller mass = bigger acceleration. Double the push, double the speedup. Law 3 (action–reaction): every push has an equal opposite push — rockets throw gas down to go up.",
        ],
      },
      {
        heading: "The forces around you",
        body: [
          "Gravity pulls everything toward Earth at 9.8 m/s² — a feather and hammer fall equally fast on the Moon (no air!). Friction opposes sliding: great for shoes, terrible for engines. Air resistance grows with speed — that's why cyclists crouch.",
          "Weight is gravity's pull on your mass: same mass on the Moon weighs 1/6th. Mass never changes; weight depends on gravity.",
        ],
      },
      {
        heading: "Measuring motion",
        body: [
          "Speed = distance ÷ time. A sprinter running 100 m in 12.5 s averages 8 m/s. Velocity adds direction — 8 m/s north is velocity; 8 m/s alone is just speed.",
          "Acceleration is how fast velocity changes. A car going 0 → 100 km/h in 10 s accelerates at 10 km/h every second. Slowing down is negative acceleration.",
        ],
      },
    ],
    keyTerms: [
      { term: "Inertia", definition: "Resistance to changes in motion (Newton's 1st law)." },
      { term: "Friction", definition: "Force opposing motion between touching surfaces." },
      { term: "Acceleration", definition: "Rate of change of velocity." },
    ],
    examples: [
      {
        title: "Laws in football",
        language: "text",
        code: "⚽ A free kick shows all 3 laws:\nLaw 1: Ball sits still until kicked (inertia).\nLaw 2: Harder kick → faster ball (F = m·a).\nLaw 3: Foot pushes ball; ball pushes foot\n       back (that's why it stings!).\nBonus: Air + grass friction slow the ball;\nspin bends it (Magnus effect).",
        explanation: "One kick, three laws plus friction — physics is literally every sport.",
      },
    ],
    activity: {
      title: "Paper airplane physics lab",
      description: "Test how design changes flight distance and explain with forces.",
      steps: [
        "Fold 2 different airplane designs (dart vs glider).",
        "Throw each 3 times from the same spot; record distances.",
        "Compute each design's average distance.",
        "Explain results using lift, gravity, thrust and drag.",
      ],
      hints: [
        "Control variables: same thrower, same paper size, same effort.",
        "Darts fly fast and far; gliders float slowly — why?",
      ],
    },
    quiz: [
      {
        question: "Why do passengers lurch forward when a bus brakes?",
        options: ["Gravity increases", "Inertia — bodies keep moving", "Friction pushes them", "The engine pulls"],
        answer: 1,
        explanation: "Newton's 1st law: moving bodies resist stopping.",
      },
      {
        question: "A car travels 120 km in 2 hours. Its speed?",
        options: ["240 km/h", "60 km/h", "30 km/h", "12 km/h"],
        answer: 1,
        explanation: "Speed = 120 ÷ 2 = 60 km/h.",
      },
      {
        question: "Which is an action–reaction pair?",
        options: [
          "Rocket pushes gas down; gas pushes rocket up",
          "Gravity pulls; friction pushes",
          "Speed and velocity",
          "Mass and weight",
        ],
        answer: 0,
        explanation: "Newton's 3rd law: the gas and rocket push each other equally and oppositely.",
      },
    ],
  },
  {
    id: "s-states-matter",
    subjectId: "science",
    title: "States of Matter & Chemical Reactions",
    description:
      "Solids, liquids, gases, plasma — plus the reaction clues (fizz, color, heat) around you.",
    level: "Intermediate",
    durationMin: 30,
    xp: 70,
    tags: ["chemistry", "matter"],
    objectives: [
      "Compare particle behavior in 4 states",
      "Identify signs of chemical reactions",
      "Balance simple equations",
    ],
    sections: [
      {
        heading: "Matter's four moods",
        body: [
          "Everything is particles in motion. Solids: locked in formation, vibrating in place (ice). Liquids: sliding past each other, taking the container's shape (water). Gases: flying free, filling everything (steam). Plasma: superheated charged gas — lightning and stars!",
          "Heat is just particles moving faster. Melt, freeze, boil and condense are all the same particles switching formations as energy changes.",
        ],
      },
      {
        heading: "Physical vs chemical change",
        body: [
          "Crushing a can is physical — still aluminum. Burning paper is chemical — new substances (ash, smoke, CO₂) appear. Chemical clues: fizzing/bubbles, color change, heat or light release, new smell, precipitate forming.",
          "Cooking an egg is irreversible chemistry (proteins denature). Melting chocolate is reversible physics. Ask: 'Could I get the original back easily?' If no — probably chemical.",
        ],
      },
      {
        heading: "Equations must balance",
        body: [
          "Atoms can't vanish (conservation of mass), so equations balance: H₂ + O₂ → H₂O is wrong (oxygen mismatch); 2H₂ + O₂ → 2H₂O is right — 4 H and 2 O on both sides.",
          "Balance metals first, then non-metals, then hydrogen and oxygen last. Coefficients multiply whole molecules; never change the little subscripts — that creates different substances!",
        ],
      },
    ],
    keyTerms: [
      { term: "Plasma", definition: "Ionized superheated gas — the 4th state of matter." },
      { term: "Precipitate", definition: "A solid that forms from liquids during a reaction." },
      { term: "Conservation of mass", definition: "Atoms are rearranged, never created or destroyed." },
    ],
    examples: [
      {
        title: "Baking soda volcano chemistry",
        language: "text",
        code: "Vinegar (acid) + Baking soda (base)\n  → CO₂ gas + water + salt\n\nThe fizz = carbon dioxide escaping!\nSame reaction (slower) makes cakes rise:\nCO₂ bubbles puff up the batter. 🎂",
        explanation: "Gas production is the giveaway clue — a brand-new substance (CO₂) left the mixture.",
      },
    ],
    activity: {
      title: "Kitchen chemistry detective",
      description: "Classify 5 kitchen changes as physical or chemical with evidence.",
      steps: [
        "Test 1: melt ice — observe and reverse it (refreeze).",
        "Test 2: mix vinegar + baking soda — record all observations.",
        "Test 3: toast bread — compare before/after color and smell.",
        "Classify each with the clue list, then balance: Mg + O₂ → MgO.",
      ],
      hints: [
        "Balanced: 2Mg + O₂ → 2MgO (check: 2 Mg, 2 O each side).",
        "Adult supervision for anything involving heat!",
      ],
    },
    quiz: [
      {
        question: "Which is a chemical change?",
        options: ["Melting ice", "Cutting paper", "Rusting iron", "Dissolving sugar"],
        answer: 2,
        explanation: "Rusting creates a new substance (iron oxide); the others stay the same material.",
      },
      {
        question: "In which state do particles slide past each other?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        answer: 1,
        explanation: "Liquids flow: particles are close but mobile.",
      },
      {
        question: "Balance: __H₂ + O₂ → __H₂O. Coefficients?",
        options: ["1, 1", "2, 2", "2, 1", "1, 2"],
        answer: 1,
        explanation: "2H₂ + O₂ → 2H₂O gives 4 H and 2 O on both sides.",
      },
    ],
  },
  {
    id: "s-solar-system",
    subjectId: "science",
    title: "The Solar System & Beyond",
    description:
      "Tour the 8 planets, grasp light-years, and wonder at galaxies, black holes and exoplanets.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["astronomy", "space"],
    objectives: [
      "Order the 8 planets with one fact each",
      "Explain day/night, seasons and moon phases",
      "Grasp cosmic scale: AU and light-years",
    ],
    sections: [
      {
        heading: "Meet the neighborhood",
        body: [
          "My Very Excellent Mother Just Served Us Noodles: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Four rocky inner planets, four gas/ice giants outside.",
          "Greatest hits: Venus spins backwards; Mars hosts Olympus Mons (3× Everest); Jupiter's Great Red Spot is a storm wider than Earth; Saturn would float in a giant bathtub.",
        ],
      },
      {
        heading: "Why days, seasons and phases?",
        body: [
          "Day/night = Earth spins (24 h). A year = Earth orbits the Sun (365.25 days). Seasons = Earth's 23.5° tilt aims hemispheres toward/away from the Sun — NOT distance (Earth is closest to the Sun in January!).",
          "Moon phases = we see different sunlit portions as the Moon orbits us every 29.5 days. Eclipses need perfect Sun–Earth–Moon alignment — rare and spectacular.",
        ],
      },
      {
        heading: "Cosmic scale check",
        body: [
          "The Sun holds 99.86% of the system's mass — 1.3 million Earths fit inside it. Light takes 8 minutes from the Sun, but 4.2 years from the next star. A light-year ≈ 9.5 trillion km.",
          "Beyond: 200 billion stars in our Milky Way, 200 billion+ galaxies beyond that, 5,000+ confirmed exoplanets. And we've mapped it all from one pale blue dot.",
        ],
      },
    ],
    keyTerms: [
      { term: "AU", definition: "Astronomical Unit — Earth-Sun distance (~150 million km)." },
      { term: "Light-year", definition: "Distance light travels in one year (~9.5 trillion km)." },
      { term: "Exoplanet", definition: "A planet orbiting a star other than our Sun." },
    ],
    examples: [
      {
        title: "Solar system walk scale",
        language: "text",
        code: "If the Sun were a basketball (24 cm):\nEarth = peppercorn, 26 m away\nJupiter = golf ball, 135 m away\nNeptune = marble, 780 m away!\nNearest star = another basketball in...\nHAWAII (if you're in Jakarta). 🌌",
        explanation: "Space is overwhelmingly empty — that's why it's called space. Models reveal the truth.",
      },
    ],
    activity: {
      title: "Moon journal",
      description: "Observe and sketch the Moon for 7 nights.",
      steps: [
        "Each clear night, sketch the Moon's shape and note the time.",
        "Label each sketch: crescent, half, gibbous or full.",
        "After 7 days, arrange sketches in order — see the pattern?",
        "Predict the phase for night 10, then verify with a moon-phase app.",
      ],
      hints: [
        "Cloudy night? Note 'clouded out' like real astronomers do.",
        "The lit side always faces the Sun — use it to find west at sunset.",
      ],
    },
    quiz: [
      {
        question: "What causes Earth's seasons?",
        options: [
          "Distance from the Sun",
          "The 23.5° axial tilt",
          "The Moon's gravity",
          "Solar flares",
        ],
        answer: 1,
        explanation: "Tilt aims each hemisphere toward/away from the Sun through the year.",
      },
      {
        question: "Which planet has the Great Red Spot?",
        options: ["Mars", "Saturn", "Jupiter", "Venus"],
        answer: 2,
        explanation: "Jupiter's storm has raged for centuries and exceeds Earth's width.",
      },
      {
        question: "A light-year measures...",
        options: ["Time", "Brightness", "Distance", "Speed"],
        answer: 2,
        explanation: "Despite 'year' in the name, it's the distance light travels in a year.",
      },
    ],
  },
];
