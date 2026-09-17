import type { Lesson } from "../types";

/** Mathematics — number, fractions, algebra, geometry and statistics. */
export const mathLessons: Lesson[] = [
  {
    id: "fractions-compare",
    title: "Fractions: Compare, Order and Simplify",
    subjectId: "math",
    unitId: "fractions",
    track: "math",
    summary:
      "Use bars and number lines to see why 3/4 is bigger than 5/8 — and simplify any fraction with confidence.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 130,
    tags: ["Fractions", "Number", "Visual maths"],
    objectives: [
      "Represent fractions visually as part of a whole",
      "Compare fractions using common denominators",
      "Simplify fractions to their lowest terms",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A fraction is a way of writing **a part of something**. The bottom number (the denominator) says how many equal pieces the whole was cut into. The top number (the numerator) says how many of those pieces you have.",
          "So `3/4` means: cut the whole into 4 equal pieces, and take 3 of them. Equal pieces matter — that is why a pizza cut badly is a maths error, not just a disappointment.",
        ],
      },
      {
        type: "figure",
        title: "Same value, different numbers",
        caption:
          "1/2 = 2/4 = 4/8 = 50%. The pieces get smaller while the count gets bigger, so the amount stays the same.",
        visual: "formula",
        items: ["1/2", "2/4", "4/8", "5/10", "0.5", "50%"],
      },
      {
        type: "widget",
        widget: "fractionLab",
        title: "Fraction lab",
        caption:
          "Cut the bar into pieces, build fractions, and compare them side by side. Watch how different fractions line up.",
        config: {},
      },
      {
        type: "steps",
        title: "Method: comparing two fractions",
        steps: [
          {
            title: "Look for a quick signal",
            body: "If the denominators are the same, just compare numerators: `3/7 < 5/7`. If one numerator is bigger and its denominator smaller, it wins immediately: `3/4 > 2/5`.",
          },
          {
            title: "Find a common denominator",
            body: "To compare `5/8` and `3/4`, convert both to eighths. Multiply the top and bottom of `3/4` by 2 → `6/8`.",
            code: "3/4 = (3 × 2) / (4 × 2) = 6/8",
          },
          {
            title: "Compare the numerators",
            body: "Now `5/8 < 6/8`, so `5/8 < 3/4`. Multiplying top and bottom by the same number never changes the value — that is the whole trick.",
          },
          {
            title: "Simplify the answer",
            body: "Divide top and bottom by their **highest common factor**. For `18/24`, both divide by 6 → `3/4`. Check: does anything else divide into 3 and 4? No — so it is in lowest terms.",
            code: "18/24 ÷ 6 = 3/4\n24/36 ÷ 12 = 2/3",
          },
          {
            title: "Add and subtract",
            body: "Same denominator: add the tops only. Different denominators: convert first. `1/3 + 1/4 = 4/12 + 3/12 = 7/12`.",
            hint: "Never add denominators. 1/3 + 1/4 is not 2/7.",
          },
        ],
      },
      {
        type: "compare",
        title: "Two ways to compare",
        columns: [
          {
            title: "Common denominator",
            tone: "good",
            items: [
              "Works for every pair of fractions",
              "Shows the reasoning clearly",
              "Best when numbers are small",
            ],
          },
          {
            title: "Cross-multiplication",
            tone: "neutral",
            items: [
              "Fast: 5 × 4 = 20 vs 3 × 8 = 24",
              "Great for a quick check",
              "Explain it as a shortcut, not magic",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Three classic fraction errors",
        body: "**Adding denominators** (1/2 + 1/3 ≠ 2/5), **simplifying by subtracting** (18/24 − 6 is not 'simplify'), and **forgetting to scale both parts** when finding a common denominator.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Fractions in real life",
        body: "Cooking (3/4 cup), music (quarter notes), sports statistics (batting averages), and screw sizes (3/8 inch) all run on fractions. Decimals often hide a fraction in plain sight: 0.25 is 1/4.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which fraction is the largest?",
        options: ["3/5", "5/8", "1/2", "7/12"],
        answer: 1,
        explanation:
          "Convert to fortieths: 24/40, 25/40, 20/40 and ~23.3/40. 5/8 = 25/40 is the largest.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "18/24 simplified to lowest terms is _______.",
        answer: ["3/4", "0.75"],
        explanation: "Both 18 and 24 divide by their highest common factor, 6, giving 3/4.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "1/2 + 1/3 = 2/5.",
        answer: false,
        explanation:
          "You must use a common denominator: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Denominators are never added.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which number is equivalent to 0.75?",
        options: ["1/3", "2/3", "3/4", "4/5"],
        answer: 2,
        explanation: "0.75 = 75/100, which simplifies by 25 to 3/4.",
        points: 20,
      },
      {
        id: "q5",
        type: "matching",
        prompt: "Match each fraction to its percentage.",
        pairs: [
          { left: "1/4", right: "25%" },
          { left: "1/2", right: "50%" },
          { left: "3/4", right: "75%" },
          { left: "1/5", right: "20%" },
        ],
        explanation:
          "To convert a fraction to a percentage, divide the numerator by the denominator and multiply by 100.",
        points: 25,
      },
    ],
    updatedAt: "2026-08-27",
    author: "Ms. Dewi Anggraini · Mathematics",
  },
  {
    id: "algebra-patterns",
    title: "Algebra: From Patterns to Equations",
    subjectId: "math",
    unitId: "algebra",
    track: "math",
    summary:
      "Why letters appear in maths — and how to solve for x with a balance model instead of memorised rules.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 165,
    tags: ["Algebra", "Equations", "Patterns"],
    objectives: [
      "Describe a pattern with a general rule using a letter",
      "Solve one-step and two-step equations",
      "Check a solution by substitution",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Algebra is not 'maths with letters'. It is maths about **relationships that stay true for any number**. If a taxi costs 5,000 to start plus 4,000 per kilometre, that rule works for 1 km or 100 km — and we write it once as `c = 5000 + 4000k`.",
          "An **equation** is a balanced scale. Whatever you do to one side, you must do to the other. Every step in solving is just keeping the scale level.",
        ],
      },
      {
        type: "table",
        title: "Pattern → rule → prediction",
        headers: ["Step (n)", "Matchsticks", "Working", "Rule check"],
        rows: [
          ["1", "5", "5", "4(1) + 1 = 5"],
          ["2", "9", "5 + 4", "4(2) + 1 = 9"],
          ["3", "13", "5 + 4 + 4", "4(3) + 1 = 13"],
          ["10", "41", "not counting by hand!", "4(10) + 1 = 41"],
          ["100", "401", "impossible by hand", "4(100) + 1 = 401"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Two letters, two different jobs",
        body: "In `4n + 1`, the **n** is the input you choose. In `4x = 20`, the **x** is the unknown you are solving for. Same alphabet, different question.",
      },
      {
        type: "steps",
        title: "Method: solve 3x + 4 = 19",
        steps: [
          {
            title: "Identify what is being done to x",
            body: "x is multiplied by 3, then 4 is added. To free x, undo those in reverse order.",
          },
          {
            title: "Undo the addition",
            body: "Subtract 4 from both sides, keeping the balance.",
            code: "3x + 4 = 19\n3x + 4 − 4 = 19 − 4\n3x = 15",
          },
          {
            title: "Undo the multiplication",
            body: "Divide both sides by 3.",
            code: "3x ÷ 3 = 15 ÷ 3\nx = 5",
          },
          {
            title: "Check by substitution",
            body: "Put the answer back into the original equation: 3(5) + 4 = 15 + 4 = 19 ✓. Checking takes ten seconds and catches almost every mistake.",
          },
          {
            title: "Handle x on both sides",
            body: "Subtract the smaller x term from both sides so the letter ends up on one side only: `5x − 2 = 2x + 7` → `3x − 2 = 7` → `3x = 9` → `x = 3`.",
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Check any answer instantly with code",
        code: 'def check(x):\n    return 3 * x + 4\n\nfor guess in range(0, 10):\n    if check(guess) == 19:\n        print(f"x = {guess} works!")\n\n# Or solve it directly:\n# 3x + 4 = 19  ->  x = (19 - 4) / 3\nx = (19 - 4) / 3\nprint(f"Solved algebraically: x = {x}")',
        output: "x = 5 works!\nSolved algebraically: x = 5.0",
      },
      {
        type: "list",
        title: "Rearranging as a recipe",
        items: [
          "**Subject** — the letter you are isolating (usually x).",
          "**Inverse operations** — addition undoes subtraction, multiplication undoes division.",
          "**Reverse order** — undo the last operation first (like taking off shoes before socks).",
          "**Keep the balance** — always do the same thing to both sides.",
          "**Check** — substitute your answer back in.",
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Why the letter x?",
        body: "When algebra travelled from Arabic to Spanish in the 1100s, the Arabic word for 'thing' (*shay*) was transliterated with a Greek chi, which printers later set as x. A translation accident became the most famous letter in maths.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Solve: 2x + 7 = 25",
        options: ["x = 9", "x = 11", "x = 16", "x = 5"],
        answer: 0,
        explanation: "Subtract 7 → 2x = 18, then divide by 2 → x = 9. Check: 2(9) + 7 = 25 ✓",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "In the pattern 5, 8, 11, 14 … the rule is 3n + ______.",
        answer: ["2"],
        explanation: "The values increase by 3 each time, and the first term (n = 1) is 5, so 3(1) + 2 = 5.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "You can add 4 to one side of an equation without changing the other side.",
        answer: false,
        explanation:
          "An equation is a balanced scale — anything you do to one side must be done to the other.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "A taxi charges 5,000 to start plus 4,000 per km. Which formula gives the cost for k kilometres?",
        options: ["c = 4000k", "c = 5000 + 4000k", "c = 5000k + 4000", "c = 9000k"],
        answer: 1,
        explanation:
          "The starting fare is paid once, so it is the constant term; 4,000 is multiplied by the distance.",
        points: 25,
      },
      {
        id: "q5",
        type: "multipleChoice",
        prompt: "Which is the best first step for 5x − 2 = 2x + 7?",
        options: [
          "Divide both sides by 5",
          "Subtract 2x from both sides",
          "Add 7 to both sides",
          "Multiply both sides by 2",
        ],
        answer: 1,
        explanation:
          "Removing the smaller x term collects all the x values on one side: 3x − 2 = 7.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-04",
    author: "Ms. Dewi Anggraini · Mathematics",
  },
  {
    id: "geometry-area-perimeter",
    title: "Geometry: Perimeter, Area and Volume",
    subjectId: "math",
    unitId: "geometry",
    track: "math",
    summary:
      "Why a shape can have the same perimeter but different areas — and how designers use that fact.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Geometry", "Area", "Perimeter", "Measurement"],
    objectives: [
      "Calculate perimeter and area of rectangles, triangles and circles",
      "Use and substitute into formulae",
      "Compare shapes with equal perimeter but different area",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "**Perimeter** is the distance around a shape (a fence). **Area** is the amount of surface inside it (the grass). They are measured in different units — metres versus square metres — which is why they cannot be added together.",
          "The classic puzzle: a square and a long thin rectangle can have the same perimeter but very different areas. Farmers, package designers and phone manufacturers all use this fact to pack more performance into the same boundary.",
        ],
      },
      {
        type: "table",
        title: "The formulae you need",
        headers: ["Shape", "Perimeter", "Area", "Remember it as"],
        rows: [
          ["Rectangle", "2(l + w)", "l × w", "Length times width"],
          ["Triangle", "a + b + c", "½ × b × h", "Half of a rectangle"],
          ["Circle", "2πr", "πr²", "Pi times radius squared"],
          ["Parallelogram", "2(a + b)", "b × h", "Base × perpendicular height"],
          ["Cube (volume)", "—", "V = s³", "Side cubed"],
          ["Cuboid (volume)", "—", "V = l × w × h", "Three dimensions"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Units matter",
        body: "Perimeter uses units (cm), area uses squared units (cm²), volume uses cubed units (cm³). If your answer to an area question ends in 'cm', you have made a units mistake — and this is exactly the kind of error that fails exams.",
      },
      {
        type: "steps",
        title: "Method: a real design problem",
        steps: [
          {
            title: "Read the constraint",
            body: "A school has 36 m of fencing for a vegetable patch. What is the largest rectangular area it can enclose?",
          },
          {
            title: "Write what you know",
            body: "Perimeter 36 = 2(l + w), so l + w = 18. We want the largest possible l × w.",
          },
          {
            title: "Make a table",
            body: "Try values systematically — this is how mathematicians explore before generalising.",
            code: "l  w   area\n1  17   17 m²\n5  13   65 m²\n9   9   81 m²\n12  6   72 m²",
          },
          {
            title: "Spot the pattern",
            body: "The closer the two sides get to each other, the larger the area. The maximum happens when l = w — a square.",
          },
          {
            title: "Use the formula",
            body: "Area of a triangle is ½ × base × height, but only when height is perpendicular to the base. A slanted side is not the height.",
            code: "A = ½ × b × h\n  = ½ × 8 × 5\n  = 20 cm²",
          },
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Explore all the possibilities with code",
        code: 'best_area = 0\nbest_sides = (0, 0)\n\nfor length in range(1, 18):\n    width = 18 - length\n    area = length * width\n    if area > best_area:\n        best_area = area\n        best_sides = (length, width)\n\nprint(f"Best rectangle: {best_sides[0]} m x {best_sides[1]} m")\nprint(f"Area: {best_area} m²")',
        output: "Best rectangle: 9 m x 9 m\nArea: 81 m²",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "π is hiding in bridges",
        body: "The ancient Greek engineer Archimedes found π by drawing polygons inside and outside a circle and squeezing the answer. That same constant appears in every arch, dome, pipe and wheel ever built.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Estimate before you calculate",
        body: "Round the numbers first: a 4.8 × 10.2 rectangle is roughly 5 × 10 = 50 m². If your precise answer is 480 m², you know immediately that a decimal point slipped.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "A rectangle is 7 cm by 4 cm. What is its perimeter?",
        options: ["11 cm", "22 cm", "28 cm", "14 cm"],
        answer: 1,
        explanation: "Perimeter = 2(7 + 4) = 22 cm. Area would be 28 cm².",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The area of a triangle with base 10 cm and perpendicular height 6 cm is _______ cm².",
        answer: ["30"],
        explanation: "A = ½ × b × h = ½ × 10 × 6 = 30 cm².",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Two rectangles with the same perimeter must have the same area.",
        answer: false,
        explanation:
          "A 1 × 17 and a 9 × 9 rectangle both have perimeter 36 but areas of 17 m² and 81 m².",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which unit would you use for the volume of a water tank?",
        options: ["cm", "cm²", "cm³", "kg"],
        answer: 2,
        explanation: "Volume is three-dimensional, so the unit is cubed: cm³ (which equals 1 millilitre).",
        points: 20,
      },
      {
        id: "q5",
        type: "multipleChoice",
        prompt: "Which shape encloses the largest area for a fixed perimeter?",
        options: ["A very long thin rectangle", "A square", "A triangle", "A star"],
        answer: 1,
        explanation:
          "For a fixed perimeter the areas of regular shapes grow as the shape becomes more 'circular'; among rectangles, the square wins.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-06",
    author: "Mr. Hendra Saputra · Mathematics",
  },
  {
    id: "statistics-averages",
    title: "Statistics: Mean, Median and Not Being Fooled",
    subjectId: "math",
    unitId: "statistics",
    track: "math",
    summary:
      "Calculate the three averages — then learn why newspapers choose a particular one to tell a particular story.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 160,
    tags: ["Statistics", "Data", "Averages", "Critical thinking"],
    objectives: [
      "Calculate mean, median, mode and range",
      "Explain how outliers affect each average",
      "Choose the most honest average for a data set",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Averages are how we summarise a lot of numbers in one. But there are **three** common averages — mean, median and mode — and each one answers a slightly different question. Choosing between them changes the story you tell.",
          "A famous example: in a small company of 10 people, the owner earns 1 billion rupiah and the nine employees earn 5 million each. The *mean* salary is 104.5 million. The *median* is 5 million. Both numbers are correct; only one describes what a typical employee earns.",
        ],
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Mean", definition: "Add all values, divide by how many there are. Sensitive to extreme values." },
          { term: "Median", definition: "The middle value once the data is in order. Resistant to outliers." },
          { term: "Mode", definition: "The value that appears most often. Best for categories (shoe size, favourite colour)." },
          { term: "Range", definition: "Largest minus smallest — a quick measure of spread." },
          { term: "Outlier", definition: "A value far from the rest, which can drag the mean dramatically." },
        ],
      },
      {
        type: "table",
        title: "Same data, three answers",
        headers: ["Data set", "Mean", "Median", "Mode"],
        rows: [
          ["3, 5, 5, 7, 10", "6.0", "5", "5"],
          ["1, 2, 3, 4, 100", "22.0", "3", "none (all appear once)"],
          ["12, 12, 13, 14, 99", "30.0", "13", "12"],
          ["Exam scores 68, 72, 74, 80, 96", "78.0", "74", "none"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The outlier effect",
        body: "A single 100 in the second data set pulls the mean from 3 to 22 — more than seven times higher. Whenever you see an average, ask: could one extreme value be doing all the work?",
      },
      {
        type: "code",
        language: "python",
        title: "Compute all three in Python",
        code: "scores = [68, 72, 74, 80, 96]\n\nmean = sum(scores) / len(scores)\nsorted_scores = sorted(scores)\nmiddle = len(scores) // 2\nmedian = sorted_scores[middle]\n\nprint(f\"Mean:   {mean:.1f}\")\nprint(f\"Median: {median}\")\nprint(f\"Range:  {max(scores) - min(scores)}\")\n\n# Add one extreme score and watch what happens\nextreme = scores + [1000]\nprint(f\"New mean: {sum(extreme) / len(extreme):.1f}  <- outlier effect\")",
        output: "Mean:   78.0\nMedian: 74\nRange:  28\nNew mean: 231.7  <- outlier effect",
      },
      {
        type: "steps",
        title: "Method: analyse a survey properly",
        steps: [
          {
            title: "Order the data first",
            body: "Median and range both need sorted data. Write the values in ascending order before doing anything else.",
          },
          {
            title: "Handle an even count",
            body: "With 8 values there is no single middle one — the median is the mean of the 4th and 5th values.",
            code: "4, 6, 7, 8, 9, 10\nMedian = (8 + 9) ÷ 2 = 8.5",
          },
          {
            title: "Check for outliers before reporting the mean",
            body: "If the smallest and largest values are far from everything else, report the median as well — or explain why the mean is misleading.",
          },
          {
            title: "Report the spread, not just the centre",
            body: "Two classes can both average 75 while one has every student between 70 and 80 and the other ranges from 40 to 100. The range tells you how consistent the results are.",
          },
          {
            title: "Visualise it",
            body: "A dot plot or bar chart shows shape instantly: is it symmetrical, skewed, or clustered in two groups? Numbers hide this, pictures do not.",
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "How to read a headline",
        body: "House prices are almost always reported as a median because a few mansions distort the mean. Average income usually uses the mean — which is exactly why median income figures appear in serious economic reporting.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What is the median of 4, 9, 2, 7, 10?",
        options: ["2", "7", "9", "6.4"],
        answer: 1,
        explanation:
          "In order: 2, 4, 7, 9, 10. The middle value is 7. The mean would be 6.4.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The mean of 5, 8, 8, 11, 18 is _______.",
        answer: ["10"],
        explanation: "Sum = 50, and 50 ÷ 5 = 10.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "The median is less affected by an extreme outlier than the mean.",
        answer: true,
        explanation:
          "The median depends only on position in the ordered list, so one huge value barely moves it.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which average is best for finding the most common shoe size sold?",
        options: ["Mean", "Median", "Mode", "Range"],
        answer: 2,
        explanation:
          "The mode finds the most frequent value, which is exactly what a shop needs to know for stock.",
        points: 20,
      },
      {
        id: "q5",
        type: "multipleChoice",
        prompt: "A company reports a mean salary of 104 million where one person earns 1 billion. The best advice is to…",
        options: [
          "Trust the mean — it uses all the data",
          "Also report the median, which shows what a typical worker earns",
          "Report the mode instead",
          "Ignore the outlier and delete the data",
        ],
        answer: 1,
        explanation:
          "Reporting both gives an honest picture: the mean shows the total payroll spread, the median shows the typical worker's experience. Deleting data is never the answer.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-11",
    author: "Mr. Hendra Saputra · Mathematics",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "mental-maths-strategies",
    title: "Mental Maths Strategies That Actually Work",
    subjectId: "math",
    unitId: "number",
    track: "math",
    summary: "Partitioning, compensation and doubling — calculate faster in your head than on paper.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 130,
    tags: ["Arithmetic", "Mental maths"],
    objectives: ["Use compensation to add quickly", "Break numbers into friendly parts"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Ms. Dewi Anggraini · Mathematics",
  },
  {
    id: "probability-basics",
    title: "Probability: Chance, Odds and Risk",
    subjectId: "math",
    unitId: "statistics",
    track: "math",
    summary: "From dice to weather forecasts — quantify uncertainty with fractions and trees.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 165,
    tags: ["Probability", "Chance"],
    objectives: ["Calculate simple probabilities", "Use tree diagrams for two events"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Hendra Saputra · Mathematics",
  },
];
