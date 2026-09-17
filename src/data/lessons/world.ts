import type { Lesson } from "../types";

/** Geography and General Knowledge lessons. */
export const worldLessons: Lesson[] = [
  {
    id: "geography-maps-coordinates",
    title: "Geography: Read Any Map with Confidence",
    subjectId: "geography",
    unitId: "maps",
    track: "humanities",
    summary:
      "Latitude, longitude, scale and contour lines — the four skills that turn a map into information.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 135,
    tags: ["Geography", "Maps", "Coordinates", "Scale"],
    objectives: [
      "Find a location using latitude and longitude",
      "Use a map scale to calculate real distance",
      "Interpret contour lines to describe terrain",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A map is a set of decisions. Someone chose the centre, the scale, the colours — and those choices change what you notice. Reading a map well means understanding both what it shows and what it hides.",
          "Indonesia sits between **6° N and 11° S** latitude and **95° E to 141° E** longitude, which is why it has three time zones and the second-longest coastline in the world.",
        ],
      },
      {
        type: "table",
        title: "The map-reading toolkit",
        headers: ["Tool", "What it does", "How to use it"],
        rows: [
          ["Latitude", "Distance north/south of the Equator", "Written first: 6°S"],
          ["Longitude", "Distance east/west of Greenwich", "Written second: 106°E"],
          ["Scale", "Ratio between map and reality", "1:50,000 means 1 cm = 500 m"],
          ["Contour lines", "Height above sea level", "Close lines = steep slope"],
          ["Grid reference", "Exact square on a map", "Eastings first, then northings"],
          ["Compass", "Direction", "16 points from N to NNW"],
        ],
      },
      {
        type: "steps",
        title: "Method: work out a real distance",
        steps: [
          {
            title: "Read the scale",
            body: "A map scale of 1:25,000 means every 1 cm on paper equals 25,000 cm in reality — that is 250 metres.",
            code: "1:25,000\n1 cm on map = 25,000 cm = 250 m = 0.25 km",
          },
          {
            title: "Measure on paper",
            body: "Measure the distance between two points with a ruler. Use a piece of paper and a pencil for curved roads: mark the curve, then flatten the paper against the ruler.",
          },
          {
            title: "Convert",
            body: "6.4 cm × 250 m = 1,600 m = 1.6 km. Always check that the answer is sensible against what you know about the area.",
          },
          {
            title: "Read contours for terrain",
            body: "Contours that are far apart mean gentle ground; contours packed close together mean a cliff-like slope. The contour interval (often 10 m or 50 m) tells you the height difference between lines.",
          },
          {
            title: "Add direction",
            body: "Grid north on a map is not always true north or magnetic north. For hiking, note the magnetic variation so your compass heading matches reality.",
            hint: "In Indonesia, magnetic variation is small but not zero — check the map margin.",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Why 1° of longitude is not a fixed distance",
        body: "One degree of latitude is always about 111 km, because lines of latitude are parallel. One degree of longitude shrinks as you move away from the Equator — 111 km at the Equator but only about 109 km in Jakarta and 78 km in London. This is why flat maps always distort something.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Every flat map lies about something",
        body: "It is mathematically impossible to flatten a sphere without distorting area, shape, distance or direction. Mercator maps preserve direction (great for sailing) but exaggerate Greenland to look bigger than Africa. Choosing a projection means choosing which truth matters for your task.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Practise with your own route",
        body: "Open a satellite map of your journey to school, then compare it with a paper map of the same area. Mark three landmarks and estimate the total distance — you will learn scale faster from your own neighbourhood.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "On a 1:50,000 map, 3 cm represents what real distance?",
        options: ["150 m", "1.5 km", "15 km", "500 m"],
        answer: 1,
        explanation: "1 cm = 50,000 cm = 500 m, so 3 cm = 1.5 km.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Contour lines that are very close together show a _______ slope.",
        answer: ["steep", "steep slope"],
        explanation: "A large height change over a short distance is steep ground — useful for planning routes and avoiding cliffs.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "One degree of longitude is the same distance everywhere on Earth.",
        answer: false,
        explanation:
          "Longitude lines converge at the poles, so the distance per degree shrinks as you move away from the Equator.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match each map feature to its meaning.",
        pairs: [
          { left: "Latitude", right: "North–south position" },
          { left: "Longitude", right: "East–west position" },
          { left: "Scale", right: "Ratio of map to reality" },
          { left: "Grid reference", right: "Exact square on the map" },
        ],
        explanation: "Coordinates give position, scale gives distance, and grid references let you pinpoint a square precisely.",
        points: 25,
      },
    ],
    updatedAt: "2026-08-31",
    author: "Mr. Reza Kurniawan · Geography",
  },
  {
    id: "geography-climate-zones",
    title: "Geography: Climate Zones and Why It Rains Here",
    subjectId: "geography",
    unitId: "climate",
    track: "humanities",
    summary:
      "Why Indonesia has a wet and dry season, how monsoons work, and how altitude changes temperature.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 160,
    tags: ["Geography", "Climate", "Monsoon", "Weather"],
    objectives: [
      "Identify the main climate zones on Earth",
      "Explain the mechanism of monsoon winds",
      "Describe how altitude affects temperature",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Climate is the **long-term pattern** of weather in a place; weather is what happens today. A country can have unpredictable weather and a very predictable climate.",
          "Indonesia sits in the **tropics** (between the Tropics of Cancer and Capricorn), where the Sun is high all year. That is why temperatures stay warm and why the seasons are defined by rain rather than heat.",
        ],
      },
      {
        type: "table",
        title: "The main climate zones",
        headers: ["Zone", "Location", "Temperature", "Rainfall"],
        rows: [
          ["Tropical", "0°–23.5° from Equator", "Warm all year (25–30 °C)", "Heavy, seasonal"],
          ["Arid", "~15°–35° latitude", "Extremely hot days, cold nights", "Very low"],
          ["Temperate", "35°–60°", "Four clear seasons", "Moderate, year-round"],
          ["Polar", "60°+", "Very cold", "Low, mostly snow"],
          ["Highland", "Any latitude with altitude", "Decreases ~6.5 °C per km", "Varies"],
        ],
      },
      {
        type: "diagram",
        title: "Why the monsoon reverses twice a year",
        loop: true,
        nodes: [
          { emoji: "☀️", title: "Summer: Asia heats up", detail: "Hot air rises, creating low pressure" },
          { emoji: "💨", title: "Air flows in from Australia", detail: "Cool, dry high pressure moves north-west" },
          { emoji: "🌧️", title: "Rainy season", detail: "Moist winds from the ocean drop heavy rain" },
          { emoji: "❄️", title: "Winter: Asia cools", detail: "Dry winds blow from Asia toward Australia" },
        ],
      },
      {
        type: "steps",
        title: "Method: explain any local climate",
        steps: [
          {
            title: "Locate it by latitude",
            body: "Latitude decides how much solar energy a place receives. Start there before anything else.",
          },
          {
            title: "Check distance from the sea",
            body: "The ocean heats and cools slowly, so coastal areas have smaller temperature ranges than inland areas at the same latitude.",
            code: "Jakarta: 26–31 °C (coastal)\nYogyakarta: 23–30 °C (inland, slightly higher altitude)",
          },
          {
            title: "Add altitude",
            body: "Temperature falls about 6.5 °C for every 1,000 m you climb. That is why Bandung (768 m) is noticeably cooler than Surabaya at sea level.",
          },
          {
            title: "Look at wind and ocean currents",
            body: "The monsoon drives Indonesia's wet and dry seasons, and El Niño/La Niña shift rainfall patterns across the whole region.",
          },
          {
            title: "Check the data",
            body: "Find 30 years of rainfall and temperature records for your location. One hot year is weather; a 30-year trend is climate.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Weather is not climate",
        body: "A cold week does not disprove global warming. Climate is the average of decades; single events are noise on top of the trend. This distinction matters in every discussion about climate change.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Jakarta is sinking",
        body: "Some parts of north Jakarta have subsided more than 2.5 metres in two decades — mostly from groundwater extraction. Combined with rising sea levels, this makes adaptation a live engineering and policy issue, not a distant threat.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Build your own data set",
        body: "Record the temperature, rainfall and cloud cover at your school every day for a month. Graph it, compare with the official records, and see how local microclimates differ from the regional average.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What mainly causes Indonesia's wet and dry seasons?",
        options: [
          "Distance from the Equator",
          "The reversing monsoon winds",
          "Ocean salinity",
          "Volcanic activity",
        ],
        answer: 1,
        explanation:
          "The monsoon reverses twice a year: moist ocean winds bring the wet season, dry continental winds bring the dry season.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Temperature falls about 6.5 °C for every _______ metres of altitude.",
        answer: ["1000", "1,000", "1000 m"],
        explanation: "This is the environmental lapse rate, which is why highland towns are much cooler.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "A single cold week proves that the climate is not warming.",
        answer: false,
        explanation:
          "Weather is short-term; climate is the long-term average. One cold week is noise, not a trend.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which two factors make Bandung cooler than Surabaya?",
        options: [
          "Latitude and ocean currents",
          "Altitude and inland location",
          "Longitude and rainfall",
          "Wind speed and soil type",
        ],
        answer: 1,
        explanation: "Bandung sits ~768 m above sea level and inland, both of which lower daytime temperatures.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-04",
    author: "Mr. Reza Kurniawan · Geography",
  },
  {
    id: "geography-urbanisation",
    title: "Geography: Cities, People and Resources",
    subjectId: "geography",
    unitId: "human",
    track: "humanities",
    summary:
      "Why more than half the world lives in cities, what urbanisation costs, and how cities can work for people.",
    difficulty: "Intermediate",
    minutes: 20,
    xp: 150,
    tags: ["Geography", "Urbanisation", "Population", "Sustainability"],
    objectives: [
      "Define urbanisation and describe push and pull factors",
      "Explain the benefits and problems of rapid urban growth",
      "Suggest sustainable solutions using real examples",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "In 1950 fewer than one in three people lived in cities. Since 2007 more than **half the world's population** has lived in urban areas, and the UN expects that to reach about 68% by 2050.",
          "**Urbanisation** is the rising share of a population living in towns and cities. It happens for two reasons: **push factors** that drive people out of rural areas, and **pull factors** that attract them to cities.",
        ],
      },
      {
        type: "compare",
        title: "Push and pull",
        columns: [
          {
            title: "Push — leaving the countryside",
            tone: "bad",
            items: [
              "Farm work is seasonal and low-paid",
              "Few schools and hospitals nearby",
              "Land shortage and soil exhaustion",
              "Flooding and drought damage crops",
            ],
          },
          {
            title: "Pull — attracting to the city",
            tone: "good",
            items: [
              "More jobs and higher wages",
              "Universities and training centres",
              "Better hospitals and transport",
              "Entertainment, markets and services",
            ],
          },
        ],
      },
      {
        type: "table",
        title: "Urban growth: gains and costs",
        headers: ["Aspect", "Benefit", "Cost"],
        rows: [
          ["Economy", "Concentrated jobs, business growth", "Informal work, low job security"],
          ["Housing", "Modern apartments and services", "Slums, overcrowding, high rents"],
          ["Transport", "Public networks, more choices", "Congestion, air pollution"],
          ["Environment", "Efficient land use per person", "Waste, flooding, loss of farmland"],
          ["Society", "Schools, culture, diversity", "Inequality, pressure on services"],
        ],
      },
      {
        type: "steps",
        title: "Method: investigate your own city",
        steps: [
          {
            title: "Collect the data",
            body: "Find population figures for your city at five-year intervals (statistics offices publish these openly). Calculate the percentage growth each period.",
          },
          {
            title: "Map the growth",
            body: "Plot the growth on a line graph. Look for sudden jumps — they usually follow migration events, new industries or infrastructure projects.",
          },
          {
            title: "Identify the pressure points",
            body: "Walk or cycle through an older district and a newer one. Note flooding, traffic density, waste collection and green space. Photographs are evidence.",
          },
          {
            title: "Compare cities",
            body: "Compare your city with a planned city (Singapore) and a rapidly growing one (Jakarta). All three face different versions of the same problems.",
          },
          {
            title: "Propose one realistic solution",
            body: "Choose one problem and design a specific intervention with a cost, a responsible body and a way to measure success. Vague ideas like 'make it greener' are not solutions.",
            code: "Problem: 80% of students in our area are driven to school.\nSolution: protected bicycle lane on 2 feeder streets + bike parking at 3 schools\nMeasure: count cyclists each Monday for 8 weeks",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "The densest city is also one of the greenest",
        body: "High-density living and efficient public transport reduce emissions per person. Cities such as Tokyo and Copenhagen show that density plus transit can be better for the climate than sprawling low-density suburbs.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Why are cities warmer?",
        body: "Asphalt and concrete absorb heat, buildings block wind, and vehicles add warmth — the **urban heat island** effect can make city centres 3–5 °C hotter than surrounding countryside. Trees are one of the cheapest fixes.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Use satellite imagery for free",
        body: "Compare satellite images of your city from 2000 and today on an open mapping platform. Measure how much green space has become built-up area — the change is often startling.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which of these is a PULL factor encouraging migration to cities?",
        options: [
          "Crop failure in rural areas",
          "Low rural wages",
          "Better hospitals and universities in the city",
          "Land shortage on farms",
        ],
        answer: 2,
        explanation:
          "Better services attract people to cities. Crop failure, low pay and land shortage push people away from the countryside.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The rising share of a population living in towns and cities is called _______.",
        answer: ["urbanisation", "urbanization"],
        explanation: "Urbanisation measures the proportion, not just the total number, of city dwellers.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "High-density cities always have higher emissions per person than low-density suburbs.",
        answer: false,
        explanation:
          "Dense settlements with good public transport usually have *lower* emissions per person because travel distances and heating needs are smaller.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match the urban problem to a suitable solution.",
        pairs: [
          { left: "Traffic congestion", right: "Rapid transit and protected bike lanes" },
          { left: "Urban heat island", right: "Street trees and green roofs" },
          { left: "Flooding", right: "Permeable surfaces and retention ponds" },
          { left: "Overcrowded housing", right: "Affordable mid-rise apartments near transit" },
        ],
        explanation: "Each solution targets the specific mechanism of the problem — that is what makes it realistic.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-09",
    author: "Mr. Reza Kurniawan · Geography",
  },
  {
    id: "general-logic-puzzles",
    title: "Logic Puzzles: Train Your Brain to Think Clearly",
    subjectId: "general",
    unitId: "logic",
    track: "humanities",
    summary:
      "Deduction, sequences and lateral thinking — with a method you can apply to any puzzle.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Logic", "Puzzles", "Problem solving"],
    objectives: [
      "Use a grid to solve deduction puzzles",
      "Recognise common number and letter patterns",
      "Apply the elimination method systematically",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Logic puzzles are not about being clever. They are about being **organised**: listing possibilities, eliminating what is impossible, and repeating until only one answer survives.",
          "Anyone can learn this. It is the same method used in programming, science and medicine.",
        ],
      },
      {
        type: "steps",
        title: "Method: the four-step grid technique",
        steps: [
          {
            title: "List the categories",
            body: "Write down everything you are trying to match: names, subjects, times. Each category becomes a row and a column in your grid.",
          },
          {
            title: "Mark impossibility first",
            body: "Read each clue and cross out what it rules out. Negative information is more powerful than positive information because it shrinks the space of possibilities.",
          },
          {
            title: "Count the options",
            body: "If a row has only one possible cell left, tick it — then remove that option from the whole column and row.",
            code: "Rani: robotics ✓ | coding ✗ | design ✗\n→ Rani cannot be in any other column",
          },
          {
            title: "Repeat until solved",
            body: "Every tick creates four crosses. Keep cycling: crosses create ticks, ticks create crosses. Puzzles are solved by patience, not by insight.",
          },
          {
            title: "Verify against every clue",
            body: "Read all clues again with your solution in place. One clue that fails means an earlier step went wrong — go back and check.",
          },
        ],
      },
      {
        type: "table",
        title: "Three puzzle types worth practising",
        headers: ["Type", "How to attack it", "Example"],
        rows: [
          ["Number sequence", "Find the difference or ratio between terms", "2, 6, 12, 20, 30 → +4, +6, +8, +10"],
          ["Deduction grid", "Cross-sections, elimination, count options", "'Rani is not the coder; Dimas is not the designer…'"],
          ["Lateral thinking", "Question your assumptions first", "'How many months have 28 days?' → all twelve"],
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Search every possibility with code",
        code: '# Classic puzzle: A, B, C and D each like a different subject.\nsubjects = ["robotics", "coding", "design", "science"]\n\nfor a in subjects:\n    for b in subjects:\n        for c in subjects:\n            for d in subjects:\n                used = [a, b, c, d]\n                if len(used) != len(list(dict.fromkeys(used))):\n                    continue\n                if a == "robotics" or b != "design":\n                    continue\n                if c == "science" and d == "coding":\n                    print(f"A={a}, B={b}, C={c}, D={d}")',
        output: "A=coding, B=design, C=robotics, D=science",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Write things down, always",
        body: "Holding four possibilities in your head is impossible for everyone. The grid is not a beginner's crutch — it is how professionals solve sudoku, sudoku variants and real scheduling problems every day.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Your brain is a pattern machine",
        body: "The faster you find a pattern, the more likely you are to invent one that is not there. Always ask: could this pattern be coincidence? With only three numbers, any rule can be invented — that is the difference between guessing and proving.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Logic is the base of computing",
        body: "Every `if` statement you write is a logical test. Computers run billions of them per second, and all of it comes down to two values: true and false.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What comes next: 2, 6, 12, 20, 30, …?",
        options: ["36", "40", "42", "44"],
        answer: 2,
        explanation: "The differences are 4, 6, 8, 10, so the next difference is 12 → 30 + 12 = 42.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "A statement that is either true or false is called a ______ value.",
        answer: ["boolean", "bool", "logical"],
        explanation: "Booleans are the two-value foundation of logic and of all computing.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "In a deduction puzzle, ruling out impossibilities is an efficient way to find the answer.",
        answer: true,
        explanation: "Elimination shrinks the possibilities until only one option survives — the core technique.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "How many months have 28 days?",
        options: ["1", "2", "12", "6"],
        answer: 2,
        explanation:
          "All twelve months contain at least 28 days. The question tests an assumption rather than knowledge — classic lateral thinking.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-02",
    author: "Mr. Dimas Halim · Coding",
  },
  {
    id: "general-tech-today",
    title: "Technology Now: AI, Space and Your Future",
    subjectId: "general",
    unitId: "tech-now",
    track: "humanities",
    summary:
      "How machine learning actually works, what is happening in space, and the skills that will matter in 2035.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 145,
    tags: ["Technology", "AI", "Space", "Future skills"],
    objectives: [
      "Explain in simple terms how machine learning models learn",
      "Describe recent milestones in space exploration",
      "Identify skills that remain valuable in an AI-assisted world",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Artificial intelligence has become the most-discussed technology of the decade, yet the core idea is simple enough to explain in one sentence: instead of writing rules, we show a program thousands of examples and let it find the patterns itself.",
          "That is **machine learning**. Nobody programs a face recognition model with the rule 'eyes are this far apart'. Instead the model adjusts millions of internal numbers until its answers match the examples it was trained on.",
        ],
      },
      {
        type: "diagram",
        title: "How a model learns",
        loop: true,
        nodes: [
          { emoji: "📦", title: "Data", detail: "Thousands of labelled examples" },
          { emoji: "🎯", title: "Prediction", detail: "The model makes a guess" },
          { emoji: "📏", title: "Error", detail: "Compared with the correct answer" },
          { emoji: "🔧", title: "Adjustment", detail: "Internal weights are tweaked, and repeat" },
        ],
        caption:
          "Training means repeating this loop millions of times until the error stops falling.",
      },
      {
        type: "table",
        title: "What AI is good at — and what it is not",
        headers: ["Task", "AI today", "Why"],
        rows: [
          ["Translating text", "Very strong", "Millions of parallel sentence pairs to learn from"],
          ["Spotting patterns in scans", "Very strong", "Enormous labelled medical image sets"],
          ["Writing a first draft", "Useful, needs checking", "Fluent but can invent facts confidently"],
          ["Judging what is fair", "Weak", "Values depend on humans, not statistics"],
          ["Understanding a new situation", "Limited", "Models interpolate from training data"],
          ["Explaining its own reasoning", "Limited", "Internals are hard to interpret"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Hallucination is not lying",
        body: "A language model predicts plausible next words. Plausible is not always true, so it can state a convincing but invented fact. Always verify names, dates, numbers and quotes — especially in schoolwork.",
      },
      {
        type: "list",
        title: "Space in the last few years",
        items: [
          "**Reusable rockets** cut the cost of reaching orbit by more than 90%, changing who can afford to launch.",
          "**James Webb Space Telescope** detected water vapour, CO₂ and complex molecules in exoplanet atmospheres.",
          "**Mars rovers** are identifying organic molecules and testing oxygen production from the Martian atmosphere.",
          "**Indonesia's satellites** (Palapa, Nusantara Satu and others) support communications and disaster monitoring across 17,000 islands.",
          "**Small satellites** the size of a shoebox let universities run real missions — some student-built CubeSats are in orbit now.",
        ],
      },
      {
        type: "compare",
        title: "Skills in an AI-assisted world",
        columns: [
          {
            title: "Losing value",
            tone: "bad",
            items: [
              "Recalling facts you can look up instantly",
              "Copying standard formats by hand",
              "Producing volume without judgement",
            ],
          },
          {
            title: "Gaining value",
            tone: "good",
            items: [
              "Framing a good question precisely",
              "Judging whether an answer is correct",
              "Combining ideas across subjects",
              "Building and testing real things",
              "Communicating clearly to humans",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "The best prompt is a clear brief",
        body: "Writing a great AI prompt is the same skill as writing a great project brief: state the goal, the audience, the constraints and the format. Students who can brief well get dramatically better results — and that skill transfers directly to teamwork.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Keep learning out loud",
        body: "Build in public: post your projects, explain your code to a friend, enter a competition. The people who thrive in a fast-changing field are the ones who can explain what they are making and why.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "In one sentence, what is machine learning?",
        options: [
          "A program that follows rules written by a human",
          "A program that finds patterns in examples and improves by measuring its own error",
          "A database of facts",
          "A type of fast computer",
        ],
        answer: 1,
        explanation:
          "Machine learning learns from examples rather than following hand-written rules, improving as it reduces error.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "When an AI confidently states something untrue, this is called a _______.",
        answer: ["hallucination", "hallucinations"],
        explanation:
          "Models predict plausible text, and plausible is not the same as true — so verify important facts.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Reusable rockets have significantly reduced the cost of reaching orbit.",
        answer: true,
        explanation:
          "Landing and reusing the first stage removed the need to build a new rocket for every launch, cutting costs dramatically.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which skill is likely to matter MORE as AI tools improve?",
        options: [
          "Memorising dates and definitions",
          "Judging whether an answer is correct",
          "Typing quickly",
          "Copying standard formats",
        ],
        answer: 1,
        explanation:
          "When answers are instant, the scarce skill is evaluating them — verification, judgement and clear communication.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-13",
    author: "Ms. Sinta Wijaya · Technology",
  },
];
