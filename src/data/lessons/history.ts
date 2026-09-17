import type { Lesson } from "../types";

/** History — Indonesian history, world history, ancient civilisations and figures. */
export const historyLessons: Lesson[] = [
  {
    id: "indonesian-independence",
    title: "Indonesian Independence: From Proclamation to Recognition",
    subjectId: "history",
    unitId: "indonesian-history",
    track: "humanities",
    summary:
      "Follow the road from colonial rule to 17 August 1945 and the four-year struggle for international recognition.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["Indonesian history", "1945", "Independence"],
    objectives: [
      "Explain the events that led to the Proclamation of Independence",
      "Identify the roles of Sukarno, Hatta and the youth groups",
      "Describe how independence was finally recognised",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "On the morning of **17 August 1945**, in a modest house at Jalan Pegangsaan Timur 56 in Jakarta, Sukarno read a short statement that took less than two minutes to deliver. It began with three words that reshaped the nation: *Kami bangsa Indonesia dengan ini menjatakan kemerdekaan Indonesia* — We, the people of Indonesia, hereby declare the independence of Indonesia.",
          "The text was brief; the road to it was not. Understanding how it happened means understanding three groups pulling in different directions: the older politicians who wanted a peaceful path, the impatient youth (*pemuda*), and an empire collapsing at the end of World War II.",
        ],
      },
      {
        type: "widget",
        widget: "timeline",
        title: "The road to freedom",
        caption: "Click any milestone on the timeline to read what happened and why it mattered.",
        config: { events: [
          {
            year: "1942",
            title: "Japan occupies the archipelago",
            detail:
              "The Dutch colonial administration collapses in days. Japan promises to help Indonesia 'prepare for freedom', a promise designed to secure oil, rubber and labour for the war effort.",
          },
          {
            year: "1943",
            title: "PETA is formed",
            detail:
              "The Japanese train Indonesian officers in the Volunteer Army of Defenders of the Fatherland. Thousands of young men learn military discipline — later a huge advantage in 1945.",
          },
          {
            year: "1945 (Mar–Aug)",
            title: "Japan's position collapses",
            detail:
              "On 15 August Japan surrenders after Hiroshima and Nagasaki. Indonesia enters a power vacuum: the colonial army has not returned and Japan can no longer hold the islands.",
          },
          {
            year: "15 Aug 1945",
            title: "The Rengasdengklok abduction",
            detail:
              "Youth leaders take Sukarno and Hatta to Rengasdengklok, insisting they declare independence immediately rather than wait for instructions from a defeated Japan.",
          },
          {
            year: "17 Aug 1945",
            title: "The Proclamation",
            detail:
              "At 10:00 the declaration is read at Pegangsaan Timur 56, the flag is raised, and the news spreads by radio and word of mouth across the archipelago.",
          },
          {
            year: "18 Aug 1945",
            title: "The Constitution and the President",
            detail:
              "PPKI adopts the 1945 Constitution and elects Sukarno and Hatta as President and Vice-President. The state now has a legal skeleton.",
          },
          {
            year: "1945–1949",
            title: "The diplomatic and military struggle",
            detail:
              "Revolution: war against returning Dutch forces, the Linggarjati and Renville agreements, the Madiun affair, two *politionele acties*, and the Round Table Conference in The Hague.",
          },
          {
            year: "27 Dec 1949",
            title: "Sovereignty transferred",
            detail:
              "The Dutch transfer sovereignty to the United States of Indonesia. Formal recognition arrives four years after the words were spoken.",
          },
        ] },
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Proklamasi", definition: "The Proclamation — the short text declaring Indonesian independence, 17 August 1945." },
          { term: "Pemuda", definition: "Young activists whose pressure forced a faster path to independence." },
          { term: "PPKI", definition: "The Preparatory Committee for Indonesian Independence, which met the day after the proclamation." },
          { term: "Politionele acties", definition: "Dutch 'police actions' — two large military offensives in 1947 and 1948." },
        ],
      },
      {
        type: "compare",
        title: "Two paths to independence",
        columns: [
          {
            title: "Diplomacy (Sjahrir, Hatta)",
            tone: "neutral",
            items: [
              "Negotiate internationally for recognition",
              "Avoid total destruction by a superior army",
              "Linggarjati, Renville, Round Table Conference",
            ],
          },
          {
            title: "Struggle (pemuda, PETA veterans)",
            tone: "neutral",
            items: [
              "Armed resistance and guerrilla warfare",
              "10 November 1945 Surabaya; Bandung' sea of fire",
              "Keeps the world's attention on Indonesia",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "One word, two nations, ten years",
        body: "Indonesia declared independence in 1945 but the Netherlands recognised it only in 1949 — and fully accepted the transfer of Papua in 1963. Recognition is often slower than reality.",
      },
      {
        type: "quote",
        quote:
          "Freedom is the right of all nations, therefore colonialism must be abolished from the face of the earth.",
        author: "Sukarno",
        role: "Preamble of the 1945 Constitution",
      },
      {
        type: "widget",
        widget: "timeline",
        title: "Explore the timeline yourself",
        caption:
          "Drag the slider or use the arrow keys to move through the events. Great for revision: cover the description and try to recall it.",
        config: {
          events: [
            { year: "1908", title: "Budi Utomo", detail: "The first modern nationalist organisation, 20 May 1908 — now celebrated as National Awakening Day." },
            { year: "1928", title: "Youth Pledge", detail: "One motherland, one nation, one language: Indonesian. A single language choice made a single nation possible." },
            { year: "1942", title: "Japanese occupation", detail: "Three years that destroyed Dutch authority and trained a generation of Indonesian officers." },
            { year: "1945", title: "Proclamation", detail: "17 August 1945, 10:00, Jakarta." },
            { year: "1949", title: "Sovereignty transfer", detail: "27 December 1949: the Netherlands formally transfers sovereignty." },
          ],
        },
      },
      {
        type: "callout",
        variant: "info",
        title: "How historians work",
        body: "Compare a school textbook, a newspaper from 1945 and a personal memoir. Where they agree you have strong evidence; where they disagree you have found the interesting question.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "On what date was Indonesian independence proclaimed?",
        options: ["17 August 1945", "27 December 1949", "20 May 1908", "28 October 1928"],
        answer: 0,
        explanation:
          "The Proclamation was read on 17 August 1945 at Jalan Pegangsaan Timur 56, Jakarta.",
        points: 20,
      },
      {
        id: "q2",
        type: "matching",
        prompt: "Match each date to its event.",
        pairs: [
          { left: "1908", right: "Budi Utomo founded" },
          { left: "1928", right: "Youth Pledge" },
          { left: "1945", right: "Proclamation of Independence" },
          { left: "1949", right: "Transfer of sovereignty" },
        ],
        explanation:
          "1908 marks the national awakening, 1928 unity, 1945 the declaration and 1949 international recognition.",
        points: 25,
      },
      {
        id: "q3",
        type: "fillBlank",
        prompt: "Youth leaders took Sukarno and Hatta to _______ to push for an immediate declaration.",
        answer: ["rengasdengklok", "Rengasdengklok"],
        explanation:
          "The Rengasdengklok incident (15–16 August 1945) forced the timing of the proclamation.",
        points: 20,
      },
      {
        id: "q4",
        type: "trueFalse",
        prompt: "The Netherlands recognised Indonesian sovereignty in the same year as the proclamation.",
        answer: false,
        explanation:
          "It took four more years of fighting and negotiation; sovereignty was transferred on 27 December 1949.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-02",
    author: "Mr. Yusuf Maulana · History",
  },
  {
    id: "majapahit-empire",
    title: "Majapahit: The Archipelago Empire",
    subjectId: "history",
    unitId: "ancient-civilizations",
    track: "humanities",
    summary:
      "How a rice kingdom in East Java became the largest empire in Southeast Asian history — and why the Sumpah Palapa still matters.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 165,
    tags: ["Majapahit", "Ancient civilization", "Nusantara"],
    objectives: [
      "Describe how Majapahit grew through trade and naval power",
      "Explain the role of Gajah Mada and the Sumpah Palapa",
      "Assess why the empire declined",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "In 1293 a new kingdom appeared near the Brantas river in East Java, founded by Raden Wijaya after defeating a Mongol invasion force. Its capital, Trowulan, became one of the largest cities in the region: brick temples, water channels, warehouses and markets, all fed by the rice fields of the Brantas delta.",
          "Majapahit's power did not come from a huge standing army. It came from **control of the sea routes** along which spices, sandalwood, cotton and ceramics travelled. Whoever kept those routes safe could tax them.",
        ],
      },
      {
        type: "diagram",
        title: "Why Majapahit grew",
        nodes: [
          { emoji: "🌾", title: "Rice surplus", detail: "Fertile Brantas delta feeds soldiers and workers" },
          { emoji: "⛵", title: "Sea control", detail: "Safe harbours, taxed trade routes" },
          { emoji: "🤝", title: "Alliances", detail: "Local rulers keep power but accept Majapahit's overlordship" },
          { emoji: "🏛️", title: "Legitimacy", detail: "Hindu-Buddhist temples and ritual prove divine right" },
        ],
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Sumpah Palapa", definition: "Gajah Mada's oath not to rest until the archipelago was united under Majapahit." },
          { term: "Negarakertagama", definition: "A 1365 poem by Mpu Prapanca — our main source on Majapahit's court and reach." },
          { term: "Trowulan", definition: "The capital city, whose brick remains lie near modern Mojokerto." },
          { term: "Mandala state", definition: "A system where the centre rules many semi-independent regions rather than a single territory." },
        ],
      },
      {
        type: "text",
        title: "The golden age: Hayam Wuruk and Gajah Mada",
        body: [
          "The peak came in 1350–1389 under King **Hayam Wuruk** and his *patih* (prime minister) **Gajah Mada**. Their partnership combined ceremonial authority with ruthless maritime organisation.",
          "Majapahit's influence reached Sumatra, Bali, Borneo, Sulawesi and parts of the Philippines — not as colonies in the modern sense, but as a network of tributary relationships sealed by marriage, trade and occasional naval expeditions.",
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "A poem saved a city",
        body: "Most of what we know about Majapahit comes from a single epic poem, the Negarakertagama, rediscovered in Bali in 1894. One copy, carried across the strait, preserved an empire's story.",
      },
      {
        type: "list",
        title: "Decline: the same reasons as many empires",
        items: [
          "Succession disputes after Hayam Wuruk's death (1389) split the court",
          "The Paregreg civil war (1401–1406) drained the treasury and the army",
          "Islamic trading states on Java's north coast grew wealthy and independent",
          "The rise of Malacca pulled trade away from Javanese harbours",
        ],
      },
      {
        type: "table",
        title: "Majapahit in numbers",
        headers: ["Aspect", "Evidence", "What it tells us"],
        rows: [
          ["Capital area", "~100 km² of brick remains at Trowulan", "A genuinely large urban centre"],
          ["Population", "Estimates of 100,000+ in the capital region", "Complex food and water management"],
          ["Reach", "Tributes recorded from Sumatra to Maluku", "Influence spread by sea, not by annexation"],
          ["Craft", "Terracotta, gold jewellery, bronze casting", "Wealth concentrated in the capital"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Legacy in modern Indonesia",
        body: "The phrase *Nusantara*, the national motto *Bhinneka Tunggal Ika* (from the Kakawin Sutasoma written in the Majapahit era), and the emblem of the Garuda all borrow from this period. History is rarely only about the past.",
      },
      {
        type: "quote",
        quote:
          "Bhinneka Tunggal Ika — different, yet one.",
        author: "Mpu Tantular",
        role: "Kakawin Sutasoma, 14th century",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What was the Sumpah Palapa?",
        options: [
          "A Majapahit tax on spices",
          "Gajah Mada's oath to unite the archipelago",
          "A treaty with China",
          "A temple in Trowulan",
        ],
        answer: 1,
        explanation:
          "Gajah Mada swore not to rest until the whole archipelago was brought under Majapahit's influence.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The 1365 poem that is our main source on Majapahit's court is the _______.",
        answer: ["negarakertagama", "nagarakretagama", "Negarakertagama"],
        explanation:
          "Mpu Prapanca's Negarakertagama describes the court, its rituals and Majapahit's reach.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Majapahit controlled its empire mainly with a large permanent standing army.",
        answer: false,
        explanation:
          "Sea routes, alliances and tribute relationships mattered far more than a large army.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which two factors contributed most to Majapahit's decline?",
        options: [
          "Drought and volcanic eruption",
          "Civil war and the rise of Islamic coastal trading states",
          "A Mongol invasion and famine",
          "The arrival of the Portuguese in 1400",
        ],
        answer: 1,
        explanation:
          "The Paregreg civil war weakened the centre while wealthy Islamic port cities shifted the balance of power.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-05",
    author: "Mr. Yusuf Maulana · History",
  },
  {
    id: "world-war-two",
    title: "World War II: Causes and Turning Points",
    subjectId: "history",
    unitId: "world-history",
    track: "humanities",
    summary:
      "Why the world went to war twice in twenty years, and the five moments that decided the outcome.",
    difficulty: "Intermediate",
    minutes: 30,
    xp: 195,
    tags: ["World War II", "World history", "20th century"],
    objectives: [
      "Explain the causes of the war, including the legacy of the Treaty of Versailles",
      "Locate the major turning points of the conflict",
      "Understand the war's impact on Indonesia and the wider world",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "World War I ended in 1918 with a peace that punished Germany heavily: lost territory, an army capped at 100,000, and **reparations** of 132 billion gold marks. Twenty-one years later Europe was at war again. Understanding *why* is the central question of twentieth-century history.",
          "Historians usually point to four interacting causes: a harsh peace settlement, a global economic collapse, the rise of aggressive expansionist regimes, and a policy of appeasement from powers that desperately wanted to avoid another war.",
        ],
      },
      {
        type: "widget",
        widget: "timeline",
        title: "Five turning points",
        caption: "Not every year mattered equally. These five moments changed who was winning.",
        config: { events: [
          {
            year: "1939",
            title: "Invasion of Poland",
            detail:
              "1 September: Germany invades Poland. Britain and France declare war two days later. Blitzkrieg — fast tanks and aircraft working together — makes the attack devastatingly quick.",
          },
          {
            year: "1940",
            title: "Fall of France and the Battle of Britain",
            detail:
              "France surrenders in June. The Luftwaffe then fails to gain air superiority over Britain, the first major German defeat and proof that air power alone could not force a surrender.",
          },
          {
            year: "1941",
            title: "Operation Barbarossa and Pearl Harbor",
            detail:
              "Germany invades the Soviet Union in June; Japan attacks Pearl Harbor in December, bringing the United States fully into the war. The conflict becomes genuinely global.",
          },
          {
            year: "1942",
            title: "Stalingrad begins",
            detail:
              "The battle for Stalingrad (August 1942 – February 1943) ends with the encirclement of the German 6th Army. From this point Germany is retreating on the eastern front.",
          },
          {
            year: "1944–45",
            title: "D-Day and the end",
            detail:
              "Allied landings in Normandy on 6 June 1944 open the western front. Germany surrenders in May 1945; Japan surrenders on 2 September 1945 after Hiroshima and Nagasaki.",
          },
        ] },
      },
      {
        type: "callout",
        variant: "warning",
        title: "The war that must not be normalised",
        body: "Between 70 and 85 million people died, most of them civilians. The Holocaust murdered six million Jews, alongside Roma, disabled people and political prisoners. Studying the machinery that made this possible is a responsibility, not an optional topic.",
      },
      {
        type: "compare",
        title: "Allies vs Axis",
        columns: [
          {
            title: "Allied Powers",
            tone: "neutral",
            items: [
              "United Kingdom and Commonwealth",
              "Soviet Union (from June 1941)",
              "United States (from December 1941)",
              "China, Free France and many more",
            ],
          },
          {
            title: "Axis Powers",
            tone: "neutral",
            items: [
              "Germany",
              "Japan",
              "Italy",
              "Hungary, Romania, Bulgaria and others",
            ],
          },
        ],
      },
      {
        type: "text",
        title: "Impact on Indonesia",
        body: [
          "The Netherlands Indies fell to Japan in three months in early 1942, ending 300 years of Dutch rule with startling speed. The occupation that followed was brutal — forced labour, famine and internment — yet it also dismantled colonial authority permanently.",
          "For Indonesian nationalists, the war created the vacuum in which independence became possible: Japan trained young officers, gave organisers platforms, and then on 15 August 1945 surrendered. Two days later, independence was proclaimed.",
        ],
      },
      {
        type: "table",
        title: "Scale of the conflict",
        headers: ["Measure", "World War I", "World War II"],
        rows: [
          ["Deaths", "~17 million", "70–85 million"],
          ["Countries involved", "~32", "70+"],
          ["Civilians as share of deaths", "~40%", "~60–65%"],
          ["Duration", "4 years", "6 years"],
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "The UN was a war product",
        body: "The United Nations was founded in October 1945 by the victorious powers, with one central aim: to make a third world war structurally harder to start.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "How did the Treaty of Versailles (1919) contribute to World War II?",
        options: [
          "It created the League of Nations, which caused the war",
          "It imposed harsh terms on Germany, fuelling resentment and instability",
          "It gave Germany control of Austria",
          "It established the United Nations",
        ],
        answer: 1,
        explanation:
          "Territorial losses, military limits and huge reparations deepened the crisis that extreme political movements exploited.",
        points: 20,
      },
      {
        id: "q2",
        type: "matching",
        prompt: "Match each year to the event.",
        pairs: [
          { left: "1939", right: "Invasion of Poland" },
          { left: "1940", right: "Battle of Britain" },
          { left: "1942", right: "Stalingrad begins" },
          { left: "1944", right: "D-Day landings in Normandy" },
        ],
        explanation:
          "These four dates trace the war's expansion, its first German setbacks, and the Allied counter-attack.",
        points: 25,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "The Japanese occupation of Indonesia ended Dutch colonial rule permanently.",
        answer: true,
        explanation:
          "After the occupation and the surrender in 1945, the colonial system could not be restored — independence was proclaimed two days after Japan's surrender.",
        points: 20,
      },
      {
        id: "q4",
        type: "fillBlank",
        prompt: "The policy of giving in to aggressive demands in order to avoid war is called _______.",
        answer: ["appeasement"],
        explanation:
          "The Munich Agreement of 1938 — ceding the Sudetenland — is the clearest example of appeasement.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-09",
    author: "Ms. Anisa Fitri · History",
  },
  {
    id: "ancient-egypt-nile",
    title: "Ancient Egypt: Life on the Nile",
    subjectId: "history",
    unitId: "ancient-civilizations",
    track: "humanities",
    summary:
      "A civilisation built on one river: farming, writing, pyramids and the world's first government paperwork.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Ancient Egypt", "Civilizations", "Archaeology"],
    objectives: [
      "Explain how the Nile's flood cycle shaped Egyptian life",
      "Describe the purpose and construction of the pyramids",
      "Identify what hieroglyphs were used for",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Every July, the Nile rose. By September it flooded the fields, and by October it withdrew, leaving behind a layer of dark, fertile silt. Farmers planted in November and harvested in April. Year after year for thousands of years the pattern held — and because it held, an entire civilisation could be planned around it.",
          "Egypt's calendar had three seasons named after that cycle: *Akhet* (flood), *Peret* (growth), *Shemu* (harvest). Even time obeyed the river.",
        ],
      },
      {
        type: "figure",
        title: "The river that made a nation",
        caption:
          "A narrow strip of green beside the longest river in Africa, protected by desert on both sides and the Mediterranean to the north.",
        visual: "artifact",
        items: ["Nile flood", "Fertile silt", "Wheat & barley", "Taxes in grain", "Pharaoh's authority"],
      },
      {
        type: "table",
        title: "Egyptian society from top to bottom",
        headers: ["Group", "Who they were", "What they did"],
        rows: [
          ["Pharaoh", "Believed to be a living god-king", "Ruled, owned the land, led rituals"],
          ["Vizier & officials", "Administrators", "Collected grain taxes, ran courts, organised building"],
          ["Scribes", "Fewer than 1% of the population", "Read and wrote hieroglyphs, kept records"],
          ["Priests", "Temple staff", "Maintained rituals and managed temple wealth"],
          ["Artisans & farmers", "The majority", "Farmed, built, wove, made pottery and jewellery"],
          ["Enslaved people", "Prisoners of war, debtors", "Domestic and building labour"],
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Pyramids were built by paid workers",
        body: "Excavations at Giza found bakeries, breweries and housing for organised work crews. The builders were skilled, fed labourers — not the popular myth of enslaved people under a whip.",
      },
      {
        type: "list",
        title: "Four inventions we still use today",
        items: [
          "**Writing** — hieroglyphs around 3200 BCE, later a faster script called hieratic",
          "**A 365-day calendar** — 12 months of 30 days plus 5 extra days",
          "**Paper** — papyrus sheets made from river reeds",
          "**Surveying** — geometry used to re-draw field boundaries after each flood",
        ],
      },
      {
        type: "steps",
        title: "Think like an archaeologist",
        steps: [
          {
            title: "Start with an ordinary object",
            body: "A loaf of bread found in a tomb tells you about farming, ovens, nutrition and ritual. Ordinary objects are often more informative than treasures.",
          },
          {
            title: "Read the context",
            body: "Where was it found — a house, a tomb, a rubbish heap? Position tells you more than the object's beauty.",
          },
          {
            title: "Check the source type",
            body: "Is this a primary source (made at the time) or a secondary source (written later about it)? The Rosetta Stone, found in 1799, was the key that finally let scholars read hieroglyphs.",
          },
          {
            title: "Ask who is missing",
            body: "Temples and tombs were built for the wealthy. Finding evidence of farmers and workers requires digging for villages, seeds and tools.",
          },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Compare civilisations",
        body: "Put ancient Egypt beside Mesopotamia and the Indus Valley. All three grew beside rivers, invented writing, and developed irrigation — the same problems produce similar solutions.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Why was the Nile's yearly flood so important?",
        options: [
          "It provided fishing boats",
          "It left fertile silt that made farming possible",
          "It kept invaders away",
          "It powered water mills",
        ],
        answer: 1,
        explanation:
          "The flood deposited fresh, nutrient-rich soil each year, allowing large harvests and a large population.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Egyptian writing made from picture symbols is called _______.",
        answer: ["hieroglyphics", "hieroglyphs", "hieroglyphic"],
        explanation:
          "Hieroglyphs were used for temples and monuments; a quicker cursive form (hieratic) was used for everyday records.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "The Great Pyramid at Giza was built by unpaid enslaved people.",
        answer: false,
        explanation:
          "Evidence from workers' villages and bakeries shows organised, fed and paid labour crews.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which artefact allowed historians to finally translate hieroglyphs?",
        options: ["The Code of Hammurabi", "The Rosetta Stone", "The Dead Sea Scrolls", "The Book of the Dead"],
        answer: 1,
        explanation:
          "The Rosetta Stone carried the same text in three scripts, giving scholars their decoding key.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-10",
    author: "Ms. Anisa Fitri · History",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "spice-trade-voc",
    title: "The Spice Trade & the VOC",
    subjectId: "history",
    unitId: "indonesian-history",
    track: "humanities",
    summary: "How nutmeg, cloves and monopoly shaped 200 years of Indonesian history.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 170,
    tags: ["VOC", "Trade", "Colonialism"],
    objectives: ["Explain why the spice islands mattered", "Describe the VOC's monopoly system"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Mr. Yusuf Maulana · History",
  },
  {
    id: "industrial-revolution",
    title: "The Industrial Revolution",
    subjectId: "history",
    unitId: "world-history",
    track: "humanities",
    summary: "Steam, factories and cities: how machines rebuilt society in 100 years.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 175,
    tags: ["Industrial Revolution", "Technology", "Society"],
    objectives: ["List key inventions and their effects", "Evaluate costs and benefits"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Ms. Anisa Fitri · History",
  },
  {
    id: "figures-who-changed-things",
    title: "Figures Who Changed Things: Kartini to Hatta",
    subjectId: "history",
    unitId: "historical-figures",
    track: "humanities",
    summary: "Biographies as evidence: what letters and speeches reveal about change.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 145,
    tags: ["Historical figures", "Biography"],
    objectives: ["Read primary sources critically", "Connect individuals to wider movements"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Yusuf Maulana · History",
  },
];
