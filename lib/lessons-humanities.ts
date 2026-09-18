import type { Lesson } from "./types";

export const humanitiesLessons: Lesson[] = [
  // ─── HISTORY ─────────────────────────────────────────────────
  {
    id: "h-ancient",
    subjectId: "history",
    title: "Ancient Civilizations: Mesopotamia to Majapahit",
    description:
      "How writing, cities and empires were born — from the Fertile Crescent to Java's golden age.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["ancient", "civilizations"],
    objectives: [
      "List traits shared by early civilizations",
      "Compare Mesopotamia, Egypt and Majapahit",
      "Read a historical timeline accurately",
    ],
    sections: [
      {
        heading: "Why civilizations bloomed",
        body: [
          "Around 3500 BCE, farming surpluses in river valleys (Tigris-Euphrates, Nile, Indus) freed people from daily food hunts. Surplus → specialists → cities → writing, laws and armies. Rivers were the original internet: transport, trade and ideas.",
          "Every civilization shares five traits: cities, organized government, complex religion, job specialization and writing. Check any ancient society against this list — it fits remarkably well.",
        ],
      },
      {
        heading: "Mesopotamia vs Egypt",
        body: [
          "Mesopotamia (modern Iraq) gave us writing (cuneiform), the wheel and the 60-minute hour — we still live on Sumerian time! Its rival city-states warred constantly on an open plain.",
          "Egypt, shielded by deserts, built 3,000 years of pharaoh stability: pyramids, hieroglyphs and calendar genius. Geography shaped destiny: open plains breed competition; natural barriers breed continuity.",
        ],
      },
      {
        heading: "Majapahit: the archipelago's golden age",
        body: [
          "From 1293–1527, Majapahit ruled from East Java across much of modern Indonesia. Under Hayam Wuruk and prime minister Gajah Mada (of the Sumpah Palapa oath), it commanded spice trade routes stretching to China and India.",
          "Its legacy lives on: the motto 'Bhinneka Tunggal Ika' comes from the Majapahit-era poem Kakawin Sutasoma. Indonesia's unity slogan is 700 years old!",
        ],
      },
    ],
    keyTerms: [
      { term: "Surplus", definition: "Extra food beyond survival needs, enabling specialists and cities." },
      { term: "Cuneiform", definition: "Wedge-shaped writing pressed into clay — humanity's first script." },
      { term: "Sumpah Palapa", definition: "Gajah Mada's oath to unite the archipelago." },
    ],
    examples: [
      {
        title: "Timeline snapshot",
        language: "text",
        code: "3500 BCE  Cuneiform writing (Sumer)\n3100 BCE  First Egyptian dynasty\n2560 BCE  Great Pyramid of Giza\n1293 CE   Majapahit founded (Raden Wijaya)\n1336 CE   Gajah Mada's Sumpah Palapa\n1344 CE   Majapahit golden age begins",
        explanation: "Timelines reveal patterns: writing appears ~3500 BCE everywhere farming matured — similar causes, similar inventions.",
      },
    ],
    activity: {
      title: "Civilization comparison chart",
      description: "Compare three civilizations across five traits.",
      steps: [
        "Draw a table: rows = Mesopotamia, Egypt, Majapahit; columns = the 5 traits.",
        "Fill each cell with one concrete fact (e.g. Writing: cuneiform).",
        "Highlight the most surprising similarity you found.",
        "Write 3 sentences: which civilization would you visit, and why?",
      ],
      hints: [
        "Use the lesson + one encyclopedia source per civilization.",
        "Geography column bonus: note each civ's river/sea advantage.",
      ],
    },
    quiz: [
      {
        question: "What freed people to become specialists in early cities?",
        options: ["Gold", "Farming surplus", "Horses", "The internet"],
        answer: 1,
        explanation: "Food surplus meant not everyone had to farm — specialists emerged.",
      },
      {
        question: "'Bhinneka Tunggal Ika' originates from...",
        options: [
          "A Dutch decree",
          "The Majapahit-era Kakawin Sutasoma",
          "The 1945 Constitution draft",
          "A 19th century newspaper",
        ],
        answer: 1,
        explanation: "The unity motto comes from Mpu Tantular's 14th-century poem.",
      },
      {
        question: "Cuneiform was written...",
        options: [
          "With ink on paper",
          "Pressed into clay tablets",
          "Carved only on pyramids",
          "On palm leaves",
        ],
        answer: 1,
        explanation: "Reed styluses pressed wedges into clay — baked tablets survive millennia.",
      },
    ],
    popular: true,
  },
  {
    id: "h-indonesia-independence",
    subjectId: "history",
    title: "Indonesia's Road to Independence",
    description:
      "From Budi Utomo to the Proclamation: the organizations, youth and moments that built a nation.",
    level: "Intermediate",
    durationMin: 30,
    xp: 75,
    tags: ["indonesia", "independence"],
    objectives: [
      "Sequence key events 1908–1945",
      "Explain the roles of key figures",
      "Analyze the Proclamation's significance",
    ],
    sections: [
      {
        heading: "Awakening: 1908–1928",
        body: [
          "Budi Utomo (1908) marks Indonesia's National Awakening — the first modern native organization. Sarekat Islam mass-mobilized traders; Indische Partij demanded independence outright.",
          "The Youth Pledge (Sumpah Pemuda, 28 October 1928) declared one motherland, one nation, one language: Indonesia. Teenagers and students literally named the nation into existence.",
        ],
      },
      {
        heading: "Occupation and opportunity: 1942–1945",
        body: [
          "Japan's 1942 invasion shattered Dutch prestige — Asians had defeated Europeans. Japan mobilized Indonesians (romusha labor, PETA army) while nationalists like Sukarno and Hatta prepared for freedom.",
          "After Hiroshima and Nagasaki (August 1945), youth kidnapped Sukarno-Hatta to Rengasdengklok to force an immediate proclamation — no waiting for Japanese permission.",
        ],
      },
      {
        heading: "17 August 1945 and beyond",
        body: [
          "At 10:00 on 17 August 1945, Sukarno read the Proclamation at Pegangsaan Timur 56, Jakarta. The flag was sewn by Fatmawati; the text drafted overnight by Sukarno, Hatta and Ahmad Soebardjo.",
          "Independence had to be defended: the physical revolution (1945–1949) saw Surabaya's 10 November battle, guerrilla war under Sudirman, and diplomacy — until Dutch recognition on 27 December 1949.",
        ],
      },
    ],
    keyTerms: [
      { term: "Sumpah Pemuda", definition: "1928 Youth Pledge declaring one Indonesian nation and language." },
      { term: "Proklamasi", definition: "The 17 August 1945 declaration of independence." },
      { term: "Diplomasi + gerilya", definition: "Twin strategy: negotiate abroad, resist at home." },
    ],
    examples: [
      {
        title: "Road to freedom timeline",
        language: "text",
        code: "1908  Budi Utomo → National Awakening\n1928  Sumpah Pemuda (Oct 28)\n1942  Japan invades; Dutch surrender\n1945  ┌ Aug 6/9: Hiroshima & Nagasaki\n      ├ Aug 16: Rengasdengklok incident\n      └ Aug 17: PROKLAMASI 10:00 WIB\n1945  Battle of Surabaya (Nov 10)\n1949  Dutch recognize sovereignty (Dec 27)",
        explanation: "37 years from awakening to recognition — independence was organized, not accidental.",
      },
    ],
    activity: {
      title: "Proclamation news report",
      description: "Write a 1945-style news article announcing the Proclamation.",
      steps: [
        "Research the Proclamation text and the Pegangsaan Timur 56 atmosphere.",
        "Write a headline + 3 paragraphs (what, who, why it matters).",
        "Add a 'witness quote' based on real attendee accounts.",
        "Design it as a vintage newspaper front page.",
      ],
      hints: [
        "Latief Hendraningrat raised the flag; Soehoed took the photos.",
        "Keep quotes plausible and grounded in documented facts.",
      ],
    },
    quiz: [
      {
        question: "Sumpah Pemuda was declared in...",
        options: ["1908", "1928", "1942", "1945"],
        answer: 1,
        explanation: "28 October 1928 — the Second Youth Congress in Batavia (Jakarta).",
      },
      {
        question: "Why did youth take Sukarno-Hatta to Rengasdengklok?",
        options: [
          "For a holiday",
          "To force an immediate proclamation",
          "To hide from the Dutch",
          "To meet Japanese generals",
        ],
        answer: 1,
        explanation: "Youth feared delay; they secured the leaders until independence was declared.",
      },
      {
        question: "The Netherlands recognized Indonesian sovereignty in...",
        options: ["1945", "1947", "1949", "1955"],
        answer: 2,
        explanation: "27 December 1949, after revolution and diplomacy (Round Table Conference).",
      },
    ],
  },
  {
    id: "h-world-wars",
    subjectId: "history",
    title: "World Wars: Causes & Consequences",
    description:
      "Why the world went to war twice in 30 years — and how it redrew every map.",
    level: "Advanced",
    durationMin: 35,
    xp: 90,
    tags: ["world war", "modern history"],
    objectives: [
      "Explain WWI's causes with the MAIN acronym",
      "Trace WWII's path from Versailles to 1939",
      "Evaluate consequences: UN, Cold War, decolonization",
    ],
    sections: [
      {
        heading: "WWI: the MAIN causes",
        body: [
          "Militarism (arms races), Alliances (entangled treaties), Imperialism (colonial rivalry), Nationalism (ethnic pride). Europe was a powder keg; the 28 June 1914 assassination of Archduke Franz Ferdinand in Sarajevo was the spark.",
          "Alliances turned a Balkan crisis into a world war within weeks. Trench warfare then froze the Western Front for 4 years — 10 million soldiers died, empires (Austro-Hungarian, Ottoman, Russian, German) collapsed.",
        ],
      },
      {
        heading: "From Versailles to WWII",
        body: [
          "The 1919 Treaty of Versailles blamed and punished Germany (reparations, territory loss). Humiliation + the Great Depression (1929) created fertile ground for Hitler's rise in 1933.",
          "Appeasement failed: Germany remilitarized, annexed Austria and Czechoslovakia, then invaded Poland on 1 September 1939 — Britain and France finally declared war. In Asia, Japan's expansion led to Pearl Harbor (7 Dec 1941), pulling in the USA.",
        ],
      },
      {
        heading: "Consequences that shape today",
        body: [
          "WWII killed 70–85 million people, including 6 million Jews in the Holocaust. It ended with nuclear bombs and a bipolar world: USA vs USSR Cold War (1947–1991).",
          "Positive legacies: the United Nations (1945), Universal Declaration of Human Rights (1948), and decolonization — including Indonesia's 1945–1949 revolution, made possible by the post-war collapse of European empires.",
        ],
      },
    ],
    keyTerms: [
      { term: "MAIN", definition: "Militarism, Alliances, Imperialism, Nationalism — WWI causes." },
      { term: "Appeasement", definition: "Giving aggressors concessions to avoid war — failed in the 1930s." },
      { term: "Decolonization", definition: "Post-1945 wave of Asian and African independence." },
    ],
    examples: [
      {
        title: "How WWI spread in 5 weeks",
        language: "text",
        code: "Jun 28  Archduke assassinated (Sarajevo)\nJul 28  Austria declares war on Serbia\nAug 1   Germany declares war on Russia\nAug 3   Germany declares war on France\nAug 4   Britain declares war on Germany\nAug 23  Japan joins against Germany\n\nOne bullet → world war in 37 days.",
        explanation: "Rigid alliances meant each mobilization triggered the next — nobody could stop the chain.",
      },
    ],
    activity: {
      title: "Treaty of Versailles debate",
      description: "Was Versailles fair? Argue both sides with evidence.",
      steps: [
        "List 3 Versailles terms punishing Germany.",
        "Argue FOR (France's view: security + justice) in 5 sentences.",
        "Argue AGAINST (future view: it fueled WWII) in 5 sentences.",
        "Deliver your verdict: what would YOU have changed in 1919?",
      ],
      hints: [
        "France lost 1.4 million soldiers — context for their anger.",
        "Consider: punished but intact Germany was the worst of both worlds.",
      ],
    },
    quiz: [
      {
        question: "What does MAIN stand for?",
        options: [
          "Money, Armies, Islands, Nations",
          "Militarism, Alliances, Imperialism, Nationalism",
          "Maps, Awards, Ideas, News",
          "Monarchs, Allies, Infantry, Navies",
        ],
        answer: 1,
        explanation: "The four long-term causes of World War I.",
      },
      {
        question: "WWII in Europe began with...",
        options: [
          "Pearl Harbor",
          "Germany's invasion of Poland",
          "The Russian Revolution",
          "D-Day",
        ],
        answer: 1,
        explanation: "1 September 1939 — Britain and France declared war two days later.",
      },
      {
        question: "Which was a post-WWII consequence?",
        options: [
          "The Ottoman Empire returned",
          "Founding of the United Nations",
          "End of all armies",
          "Germany kept its 1939 borders",
        ],
        answer: 1,
        explanation: "The UN was founded in 1945 to prevent future world wars.",
      },
    ],
  },

  // ─── ENGLISH ─────────────────────────────────────────────────
  {
    id: "e-grammar-tenses",
    subjectId: "english",
    title: "Master the Essential English Tenses",
    description:
      "Past, present, perfect — finally understand when to use each tense with real examples.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["grammar", "tenses"],
    objectives: [
      "Use simple present, past and future correctly",
      "Choose between past simple and present perfect",
      "Fix common tense errors",
    ],
    sections: [
      {
        heading: "The big three: simple tenses",
        body: [
          "Present simple = habits and facts: 'She codes every day.' Past simple = finished past: 'She coded yesterday.' Future with will = decisions and predictions: 'She will code tomorrow.'",
          "Signal words help: every day/always (present), yesterday/last night (past), tomorrow/next week (future). Match the signal to the tense and you're right 90% of the time.",
        ],
      },
      {
        heading: "The tricky one: present perfect",
        body: [
          "Present perfect (have/has + past participle) connects past to NOW: 'I have finished my homework' = done, and it matters now. Past simple cuts the link: 'I finished it yesterday' = just reporting.",
          "Use present perfect with ever, never, just, already, yet, since, for. 'Have you ever tried sushi?' — asking about life experience up to now, not a specific date.",
        ],
      },
      {
        heading: "Continuous: action in progress",
        body: [
          "Be + verb-ing shows ongoing action: 'I am studying' (right now), 'I was studying at 8pm' (in progress then). Great for setting scenes: 'While I was coding, my laptop died.'",
          "Stative verbs (know, like, want, belong) rarely take continuous: say 'I like pizza', never 'I am liking pizza'. State vs action — that's the rule.",
        ],
      },
    ],
    keyTerms: [
      { term: "Past participle", definition: "Verb form used in perfect tenses: eaten, written, gone." },
      { term: "Stative verb", definition: "A verb describing state (know, love), not action." },
      { term: "Signal word", definition: "Time words (yesterday, since) hinting the correct tense." },
    ],
    examples: [
      {
        title: "Past simple vs present perfect",
        language: "text",
        code: "✅ I lost my keys yesterday. (finished time → past simple)\n✅ I've lost my keys! (lost + still missing → present perfect)\n❌ I have lost my keys yesterday. (never mix!)\n❌ I lost my keys. Can you help me find? (weak link)\n\nRule: specific past time = past simple.\nNo time + present result = present perfect.",
        explanation: "The #1 tense mistake. Ask: 'Do I name when? Do I care about now?' Then choose.",
      },
    ],
    activity: {
      title: "Tense detective diary",
      description: "Write a 6-sentence diary using 6 different tenses correctly.",
      steps: [
        "Write 2 sentences: present simple (habit) + present continuous (right now).",
        "Write 2 sentences: past simple (yesterday) + present perfect (experience).",
        "Write 2 sentences: future will (plan) + going to (fixed plan).",
        "Underline signal words and swap with a friend to check.",
      ],
      hints: [
        "Will = spontaneous decision; going to = pre-decided plan.",
        "Every sentence needs a signal word or clear time context.",
      ],
    },
    quiz: [
      {
        question: "Choose: 'She ___ to school every day.'",
        options: ["go", "goes", "went", "gone"],
        answer: 1,
        explanation: "Present simple, third person singular adds -s: goes.",
      },
      {
        question: "Choose: 'I ___ my homework yet.'",
        options: [
          "didn't finish",
          "haven't finished",
          "don't finish",
          "won't finish",
        ],
        answer: 1,
        explanation: "'yet' signals present perfect: haven't finished.",
      },
      {
        question: "Which sentence is correct?",
        options: [
          "I am knowing the answer.",
          "I know the answer.",
          "I have know the answer.",
          "I knows the answer.",
        ],
        answer: 1,
        explanation: "Know is stative — no continuous; first person takes base form.",
      },
    ],
    popular: true,
  },
  {
    id: "e-writing",
    subjectId: "english",
    title: "Paragraph Writing: From Idea to Essay",
    description:
      "Topic sentences, supporting details and conclusions — build paragraphs that flow.",
    level: "Intermediate",
    durationMin: 30,
    xp: 70,
    tags: ["writing", "essay"],
    objectives: [
      "Write strong topic sentences",
      "Support ideas with details and examples",
      "Link paragraphs with transitions",
    ],
    sections: [
      {
        heading: "The paragraph burger",
        body: [
          "Top bun = topic sentence (one clear idea). Filling = 2–4 supporting sentences (reasons, examples, facts). Bottom bun = concluding sentence (restate or link forward). One paragraph, one idea — always.",
          "Weak topic sentence: 'Phones are interesting.' Strong: 'Smartphones have transformed how students study.' Specific claims invite specific support.",
        ],
      },
      {
        heading: "SHOW, don't just tell",
        body: [
          "Telling: 'The library was busy.' Showing: 'Every desk in the library was taken, and a queue of students waited for the printer.' Details and numbers convince; adjectives alone don't.",
          "The PEEL method keeps you honest: Point → Evidence → Explanation → Link. Each support sentence must earn its place by proving the topic sentence.",
        ],
      },
      {
        heading: "Transitions: the glue",
        body: [
          "Jumping between ideas jars readers. Transitions signal relationships: addition (furthermore), contrast (however), cause (therefore), sequence (finally), example (for instance).",
          "Essay = introduction (hook + thesis) + body paragraphs (one idea each) + conclusion (restate + final thought). Five paragraphs can argue anything from 'school uniforms' to 'AI in classrooms'.",
        ],
      },
    ],
    keyTerms: [
      { term: "Topic sentence", definition: "First sentence stating the paragraph's one main idea." },
      { term: "Thesis", definition: "The essay's central argument, stated in the introduction." },
      { term: "PEEL", definition: "Point, Evidence, Explanation, Link — paragraph structure." },
    ],
    examples: [
      {
        title: "Model paragraph (PEEL)",
        language: "text",
        code: "[P] School gardens teach science better than textbooks.\n[E] At SMPN 12, students growing tomatoes\n    measured growth weekly and scored 23%\n    higher on plant biology tests.\n[E] Handling real roots and pests made\n    abstract cycles concrete and memorable.\n[L] Therefore, every school should plant\n    at least one learning garden.",
        explanation: "One claim, concrete evidence with numbers, explanation of why, and a linking conclusion.",
      },
    ],
    activity: {
      title: "One perfect paragraph",
      description: "Write and revise a PEEL paragraph about your school.",
      steps: [
        "Pick a claim: 'My school should...' or 'My school excels at...'",
        "Draft the burger: topic sentence + 3 supports + conclusion.",
        "Add one number or concrete detail as evidence.",
        "Revise: cut 5 unnecessary words, add 1 transition.",
      ],
      hints: [
        "Read aloud — awkward spots reveal themselves instantly.",
        "Ask a friend: 'What was my one idea?' If they hesitate, rewrite.",
      ],
    },
    quiz: [
      {
        question: "What does PEEL stand for?",
        options: [
          "Plan, Edit, Erase, Learn",
          "Point, Evidence, Explanation, Link",
          "Paper, Essay, Exam, Letter",
          "Prepare, Encode, Emit, Listen",
        ],
        answer: 1,
        explanation: "The paragraph recipe: make a Point, give Evidence, Explain, Link onward.",
      },
      {
        question: "Which is the strongest topic sentence?",
        options: [
          "Sports are good.",
          "Basketball builds teamwork better than solo sports.",
          "I like things.",
          "This paragraph is about stuff.",
        ],
        answer: 1,
        explanation: "Specific and arguable — it promises evidence about teamwork.",
      },
      {
        question: "Which transition shows contrast?",
        options: ["Furthermore", "However", "Therefore", "Finally"],
        answer: 1,
        explanation: "However signals 'opposite direction ahead'.",
      },
    ],
  },
  {
    id: "e-speaking",
    subjectId: "english",
    title: "Speaking with Confidence",
    description:
      "Pronunciation tricks, filler-word fixes and presentation frameworks that calm nerves.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["speaking", "presentation"],
    objectives: [
      "Pronounce tricky sounds (th, v, r)",
      "Structure a 1-minute talk",
      "Use body language effectively",
    ],
    sections: [
      {
        heading: "Sounds that trick Indonesians",
        body: [
          "TH: bite your tongue lightly and blow — 'think' vs 'sink' are different words! V vs F: V vibrates your throat (touch your neck: 'very' buzzes, 'ferry' doesn't). R: curl the tongue back without trilling.",
          " Minimal pairs drill: think/sink, very/ferry, rice/lice. Record yourself, compare with a dictionary app, repeat 10×. Pronunciation is muscle training.",
        ],
      },
      {
        heading: "The 1-minute talk formula",
        body: [
          "PREP: Point ('I believe uniforms help'), Reason ('they reduce morning stress'), Example ('my cousin saves 20 minutes daily'), Point again ('so uniforms help students'). 30 seconds of prep, 60 seconds of talk.",
          "Fillers (um, uh, like) signal unprepared pauses. Replace with silent pauses — they sound confident, not empty. Record a talk, count your ums, re-record with half.",
        ],
      },
      {
        heading: "Your body speaks first",
        body: [
          "Audiences judge confidence in seconds: stand straight, plant feet, gesture above the waist, and make 3-second eye contact with different people. Smile before you start — it relaxes your voice.",
          "Nerves are fuel: Olympic athletes feel them too. Channel the energy into volume and gestures. Nobody remembers your shaking hands; everybody remembers your clear message.",
        ],
      },
    ],
    keyTerms: [
      { term: "Minimal pair", definition: "Two words differing by one sound (think/sink)." },
      { term: "PREP", definition: "Point, Reason, Example, Point — talk structure." },
      { term: "Filler", definition: "Placeholder sounds (um, uh) to minimize." },
    ],
    examples: [
      {
        title: "60-second PREP example",
        language: "text",
        code: "[P] Every student should learn basic coding.\n[R] It teaches problem-solving useful in\n    every subject, not just computers.\n[E] For example, after one Python course,\n    my math scores rose because I practiced\n    breaking problems into steps.\n[P] So coding class belongs in every school.",
        explanation: "Clear point, logical reason, personal example, strong close — in under a minute.",
      },
    ],
    activity: {
      title: "Record your minute",
      description: "Deliver and self-review a 1-minute PREP talk.",
      steps: [
        "Pick a topic: 'My favorite app' or 'Why learn English?'",
        "Plan with PREP on paper (5 minutes max).",
        "Record yourself standing, phone at eye level.",
        "Review: count fillers, check eye contact, re-record once better.",
      ],
      hints: [
        "Speak 20% slower than feels natural — nerves speed you up.",
        "End with your point repeated: last words linger longest.",
      ],
    },
    quiz: [
      {
        question: "PREP stands for...",
        options: [
          "Prepare, Read, Edit, Present",
          "Point, Reason, Example, Point",
          "Pronounce, Repeat, Echo, Practice",
          "People, Room, Eyes, Posture",
        ],
        answer: 1,
        explanation: "The 1-minute talk skeleton: claim, reason, proof, restate.",
      },
      {
        question: "How should you make the TH sound?",
        options: [
          "Press lips together",
          "Tongue lightly between teeth + blow",
          "Trill the tongue",
          "Hum with closed mouth",
        ],
        answer: 1,
        explanation: "Tongue tip between teeth with air flowing — think, this, thanks.",
      },
      {
        question: "Best replacement for 'um'?",
        options: [
          "Speak faster",
          "A brief silent pause",
          "Say 'like' instead",
          "Cough loudly",
        ],
        answer: 1,
        explanation: "Silent pauses sound confident; fillers sound uncertain.",
      },
    ],
  },

  // ─── BAHASA INDONESIA ────────────────────────────────────────
  {
    id: "i-tata-bahasa",
    subjectId: "indonesian",
    title: "Tata Bahasa: Kalimat Efektif",
    description:
      "Susun kalimat yang jelas, hemat kata, dan sesuai kaidah — fondasi semua tulisan yang baik.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["tata bahasa", "kalimat"],
    objectives: [
      "Menjelaskan syarat kalimat efektif",
      "Memperbaiki kalimat rancu dan boros",
      "Menggunakan ejaan (EYD) dengan tepat",
    ],
    sections: [
      {
        heading: "Apa itu kalimat efektif?",
        body: [
          "Kalimat efektif menyampaikan maksud secara tepat, jelas, dan hemat kata. Syaratnya: memiliki subjek dan predikat yang jelas, tidak ambigu, tidak boros, dan sesuai kaidah (EYD).",
          "Contoh boros: 'Para siswa-siswa berkumpul di lapangan.' Kata 'para' sudah jamak, jadi 'siswa-siswa' mubazir. Perbaikan: 'Para siswa berkumpul di lapangan.' Satu kata dihemat, makna tetap utuh.",
        ],
      },
      {
        heading: "Jebakan umum: kerancuan",
        body: [
          "Kalimat rancu membingungkan pembaca. Contoh: 'Kucing makan Ani ikan.' Siapa makan siapa? Perbaikan: 'Kucing Ani makan ikan.' Urutan S-P-O-K (Subjek-Predikat-Objek-Keterangan) menyelamatkan makna.",
          "Hati-hati juga dengan kata depan yang salah ('dari pada' vs 'daripada') dan penulisan 'di' — dipisah untuk tempat (di sekolah), digabung untuk kata kerja pasif (dimakan).",
        ],
      },
      {
        heading: "EYD: ejaan yang disempurnakan",
        body: [
          "EYD mengatur huruf kapital, tanda baca, dan penulisan kata. Nama orang, hari, bulan, dan awal kalimat memakai kapital. Judul karangan memakai kapital tiap kata penting.",
          "Tanda koma memisahkan anak kalimat dan unsur pemerincian; titik koma memisahkan unsur setara yang kompleks. Tanda baca yang tepat membuat tulisanmu terlihat profesional dan mudah dinilai guru.",
        ],
      },
    ],
    keyTerms: [
      { term: "Kalimat efektif", definition: "Kalimat yang tepat, jelas, hemat, dan sesuai kaidah." },
      { term: "S-P-O-K", definition: "Pola dasar: Subjek-Predikat-Objek-Keterangan." },
      { term: "EYD", definition: "Ejaan Yang Disempurnakan — pedoman ejaan bahasa Indonesia." },
    ],
    examples: [
      {
        title: "Operasi kalimat: sebelum & sesudah",
        language: "text",
        code: "❌ 'Demi untuk meningkatkan mutu, maka\n    sekolah mengadakan pelatihan.'\n   (boros: 'demi untuk' + 'maka' berlebih)\n\n✅ 'Untuk meningkatkan mutu, sekolah\n    mengadakan pelatihan.'\n   (hemat 2 kata, makna sama persis!)",
        explanation: "'Demi untuk' cukup 'untuk'; anak kalimat depan tak perlu 'maka'. Penghematan kecil, dampak besar.",
      },
    ],
    activity: {
      title: "Dokter kalimat",
      description: "Diagnosis dan obati 4 kalimat yang sakit.",
      steps: [
        "Perbaiki: 'Para guru-guru sedang mengadakan rapat di di aula.'",
        "Perbaiki: 'Buku saya yang baru dibeli kemarin hilang dicuri.'",
        "Perbaiki: 'Adik berlari dengan cepat sekali di lapangan yang luas itu.'",
        "Tulis ulang sebuah paragraf tugasmu dengan 20% kata lebih sedikit.",
      ],
      hints: [
        "Cari kata ganda ('di di'), jamak ganda ('para ...-...'), dan keterangan berlebih.",
        "Bacakan keras — kalimat rancu terdengar janggal di telinga.",
      ],
    },
    quiz: [
      {
        question: "Manakah kalimat yang efektif?",
        options: [
          "Para murid-murid itu rajin-rajin.",
          "Para murid itu rajin.",
          "Murid-murid para itu rajin-rajin.",
          "Rajin para murid-murid itu.",
        ],
        answer: 1,
        explanation: "'Para' sudah jamak — tak perlu '-murid' ganda atau 'rajin-rajin'.",
      },
      {
        question: "Penulisan yang benar untuk tempat adalah...",
        options: ["disekolah", "di sekolah", "di-sekolah", "d isekolah"],
        answer: 1,
        explanation: "'Di' sebagai kata depan tempat ditulis terpisah.",
      },
      {
        question: "Urutan pola kalimat dasar bahasa Indonesia...",
        options: ["P-S-K-O", "S-P-O-K", "O-K-S-P", "K-O-P-S"],
        answer: 1,
        explanation: "Subjek-Predikat-Objek-Keterangan adalah pola bakunya.",
      },
    ],
    popular: true,
  },
  {
    id: "i-menulis",
    subjectId: "indonesian",
    title: "Menulis Teks Deskripsi & Narasi",
    description:
      "Lukis dengan kata (deskripsi) dan susun kisah yang memikat (narasi) — dua keterampilan menulis inti.",
    level: "Intermediate",
    durationMin: 30,
    xp: 70,
    tags: ["menulis", "teks"],
    objectives: [
      "Menulis paragraf deskripsi dengan pancaindra",
      "Menyusun alur narasi: orientasi–komplikasi–resolusi",
      "Menggunakan majas sederhana dengan tepat",
    ],
    sections: [
      {
        heading: "Deskripsi: melukis dengan kata",
        body: [
          "Teks deskripsi membuat pembaca seolah melihat, mendengar, dan mencium objeknya. Kuncinya: detail pancaindra yang konkret. Bukan 'pantai yang indah', melainkan 'pasir putih yang berderik di kaki dan debur ombak berirama'.",
          "Struktur: identifikasi (apa/gambaran umum), deskripsi bagian (ciri per ciri), simpulan. Satu paragraf satu fokus — jangan campur pantai dengan pasar dalam satu alinea.",
        ],
      },
      {
        heading: "Narasi: mesin cerita",
        body: [
          "Teks narasi merangkai peristiwa berurutan. Strukturnya: orientasi (siapa-di mana-kapan), komplikasi (masalah memuncak), resolusi (penyelesaian), dan opsional koda (pesan moral).",
          "Tanpa komplikasi, tak ada cerita — hanya laporan. 'Aku pergi ke pasar. Aku pulang.' membosankan; tambahkan dompet hilang dan[d] kejar-kejaran, barulah jadi kisah!",
        ],
      },
      {
        heading: "Majas: bumbu secukupnya",
        body: [
          "Majas membuat tulisan hidup: simile ('secepat kilat'), metafora ('dia bintang kelas'), personifikasi ('angin berbisik'), hiperbola ('rindu seberat gunung'). Pilih satu-dua per paragraf — terlalu banyak justru norak.",
          "Uji tulisanmu: bisakah pembaca menggambar objekmu atau menebak akhir ceritamu? Jika ya, tulisanmu berhasil.",
        ],
      },
    ],
    keyTerms: [
      { term: "Deskripsi", definition: "Teks yang menggambarkan objek sejelas mungkin." },
      { term: "Komplikasi", definition: "Bagian masalah/konflik dalam alur narasi." },
      { term: "Simile", definition: "Perbandingan dengan kata 'seperti/sebagai/bak'." },
    ],
    examples: [
      {
        title: "Deskripsi sebelum & sesudah",
        language: "text",
        code: "❌ 'Pasarnya ramai sekali.'\n\n✅ 'Aroma mangga harum manis bercampur\n    bau terasi; tawar-menawar bersahutan\n    di antara deretan lapak berwarna-warni.'\n\nTiga indra (penciuman, pendengaran,\npenglihatan) dalam dua kalimat!",
        explanation: "Detail konkret mengalahkan kata sifat umum. Tunjukkan, jangan sekadar beri tahu.",
      },
    ],
    activity: {
      title: "Dua paragraf, dua dunia",
      description: "Tulis satu deskripsi kantin sekolah dan satu narasi mini.",
      steps: [
        "Deskripsi: gambarkan kantin saat istirahat dengan minimal 3 indra.",
        "Narasi: tulis kisah 5 kalimat (orientasi–komplikasi–resolusi) tentang barang hilang.",
        "Sisipkan satu simile dan satu personifikasi secara alami.",
        "Tukar dengan teman: bisakah mereka menggambar kantinmu dari teksmu?",
      ],
      hints: [
        "Hindari 'sangat/indah/bagus' — ganti dengan detail spesifik.",
        "Resolusi boleh mengejutkan, asal masuk akal.",
      ],
    },
    quiz: [
      {
        question: "Struktur teks narasi yang tepat...",
        options: [
          "Identifikasi–deskripsi–simpulan",
          "Orientasi–komplikasi–resolusi",
          "Tesis–argumen–penegasan",
          "Pembuka–isi–penutup saja",
        ],
        answer: 1,
        explanation: "Narasi bergerak dari pengenalan, konflik, hingga penyelesaian.",
      },
      {
        question: "'Matanya bersinar seperti bintang' adalah majas...",
        options: ["Metafora", "Simile", "Hiperbola", "Ironi"],
        answer: 1,
        explanation: "Ada kata pembanding 'seperti' — ciri khas simile.",
      },
      {
        question: "Ciri paragraf deskripsi yang baik...",
        options: [
          "Banyak kata 'sangat'",
          "Detail pancaindra yang konkret",
          "Tanpa objek jelas",
          "Satu kalimat saja",
        ],
        answer: 1,
        explanation: "Detail indra yang spesifik membuat pembaca 'melihat' objeknya.",
      },
    ],
  },
  {
    id: "i-sastra",
    subjectId: "indonesian",
    title: "Sastra Indonesia: Puisi & Cerpen",
    description:
      "Rasakan semangat Chairil Anwar, pahami unsur cerpen, dan tulis karyamu sendiri.",
    level: "Intermediate",
    durationMin: 25,
    xp: 65,
    tags: ["sastra", "puisi", "cerpen"],
    objectives: [
      "Mengidentifikasi unsur batin dan fisik puisi",
      "Menganalisis unsur intrinsik cerpen",
      "Menulis puisi dan cerpen mini",
    ],
    sections: [
      {
        heading: "Puisi: kata yang dipadatkan",
        body: [
          "Chairil Anwar menulis 'Aku' (1943): 'Kalau sampai waktuku / 'Ku mau tak seorang 'kan merayu' — semangat individualisme yang menggelegar di zaman penjajahan. Puisi memadatkan perasaan besar ke dalam kata sedikit.",
          "Unsur fisik: diksi (pilihan kata), majas, rima, tipografi. Unsur batin: tema, amanat, perasaan penyair. Analisis puisi = menghubungkan keduanya: rima keras mendukung tema perlawanan, misalnya.",
        ],
      },
      {
        heading: "Cerpen: dunia dalam <10.000 kata",
        body: [
          "Unsur intrinsik cerpen: tema, tokoh & penokohan, latar (tempat-waktu-suasana), alur, sudut pandang, amanat. Berbeda dengan novel, cerpen fokus pada SATU konflik utama dengan akhir yang sering mengejutkan.",
          "Contoh sudut pandang: 'aku' (orang pertama, intim) vs 'dia' (orang ketiga, leluasa). Pilihan ini mengubah seluruh rasa cerita — coba tulis ulang satu adegan dengan keduanya!",
        ],
      },
      {
        heading: "Dari pembaca menjadi penulis",
        body: [
          "Membaca sastra melatih empati — otak memperlakukan tokoh fiksi seperti manusia nyata. Indonesia kaya karya: Siti Nurbaya, Laskar Pelangi, Cantik Itu Luka. Pilih satu dan baca 10 halaman sehari.",
          "Menulis sastra melatih keberanian: tunjukkan draf puisimu pada satu teman tepercaya, terima kritik, revisi. Semua sastrawan besar pernah menulis draf pertama yang buruk.",
        ],
      },
    ],
    keyTerms: [
      { term: "Diksi", definition: "Pilihan kata penyair — tepat, padat, bermakna." },
      { term: "Sudut pandang", definition: "Posisi pencerita: orang pertama (aku) atau ketiga (dia)." },
      { term: "Amanat", definition: "Pesan moral yang ingin disampaikan karya." },
    ],
    examples: [
      {
        title: "Membedah 'Aku' — Chairil Anwar",
        language: "text",
        code: "'Aku ini binatang jalang\n dari kumpulannya terbuang'\n\nDiksi 'binatang jalang' = liar, bebas,\nmenolak jinak → tema individualisme.\nRima keras (jalang–terbuang–karang)\nmemperkuat nada perlawanan.\nAmanat: berani menjadi diri sendiri.",
        explanation: "Fisik (diksi, rima) selalu mendukung batin (tema, amanat) — analisis menghubungkan keduanya.",
      },
    ],
    activity: {
      title: "Antologi kelas mini",
      description: "Tulis satu puisi dan satu cerpen kilat (≤150 kata).",
      steps: [
        "Puisi: 2 bait tentang 'rumah' — satu majas per bait.",
        "Cerpen kilat: 150 kata dengan akhir mengejutkan.",
        "Beri judul yang memikat, bukan sekadar 'Puisiku'.",
        "Kumpulkan: buat zine digital antologi bersama teman.",
      ],
      hints: [
        "Judul terbaik sering berupa frasa puitismu sendiri.",
        "Akhir cerpen yang kuat = pembaca berkata 'oh!' lalu membaca ulang.",
      ],
    },
    quiz: [
      {
        question: "Puisi 'Aku' karya Chairil Anwar bertema...",
        options: ["Percintaan", "Individualisme dan kebebasan", "Keindahan alam", "Humor"],
        answer: 1,
        explanation: "'Binatang jalang dari kumpulannya terbuang' — kebebasan individual.",
      },
      {
        question: "Yang termasuk unsur intrinsik cerpen adalah...",
        options: [
          "Biografi pengarang",
          "Tokoh, latar, alur, amanat",
          "Harga buku",
          "Jumlah halaman",
        ],
        answer: 1,
        explanation: "Intrinsik = unsur di dalam karya itu sendiri.",
      },
      {
        question: "Diksi dalam puisi berarti...",
        options: [
          "Jumlah bait",
          "Pilihan kata",
          "Nama penyair",
          "Tahun penulisan",
        ],
        answer: 1,
        explanation: "Diksi adalah pilihan kata yang tepat dan bermakna.",
      },
    ],
  },

  // ─── GEOGRAPHY ───────────────────────────────────────────────
  {
    id: "g-maps",
    subjectId: "geography",
    title: "Reading Maps Like an Explorer",
    description:
      "Scale, coordinates, legends and contours — unlock the secret language of maps.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["maps", "coordinates"],
    objectives: [
      "Use scale to compute real distances",
      "Read latitude and longitude",
      "Interpret legends and contour lines",
    ],
    sections: [
      {
        heading: "Scale: shrinking the world",
        body: [
          "A 1:50.000 scale means 1 cm on the map = 50.000 cm (500 m) in reality. Measure with a ruler, multiply, and you've computed a real hiking distance from your desk.",
          "Large-scale maps (1:5.000) show small areas in big detail — perfect for campuses. Small-scale maps (1:10.000.000) show whole countries. Bigger second number = smaller scale (counterintuitive but true!).",
        ],
      },
      {
        heading: "Coordinates: Earth's address system",
        body: [
          "Latitude lines run east–west, measuring north/south of the equator (0° to 90° N/S). Longitude lines run north–south from Greenwich, UK (0° to 180° E/W). Jakarta sits near 6°S, 107°E.",
          "GPS in your phone triangulates these coordinates from satellites. Every Instagram geotag is just lat/long wearing a pretty name.",
        ],
      },
      {
        heading: "Legends and contours",
        body: [
          "The legend (key) decodes symbols: blue lines = rivers, green = lowland, brown = mountains. Always read the legend first — symbols vary between mapmakers.",
          "Contour lines connect equal heights. Close together = steep cliff; far apart = gentle slope. Circles within circles mark a hilltop (check the numbers rising inward) or a pit.",
        ],
      },
    ],
    keyTerms: [
      { term: "Scale", definition: "Ratio of map distance to real distance (e.g. 1:50.000)." },
      { term: "Latitude", definition: "Degrees north/south of the equator." },
      { term: "Contour line", definition: "Line connecting points of equal elevation." },
    ],
    examples: [
      {
        title: "Scale in action",
        language: "text",
        code: "Map scale 1:25.000.\nPark to school measures 8 cm on map.\n\nReal distance = 8 × 25.000 cm\n             = 200.000 cm\n             = 2.000 m = 2 km 🚶\n\nAbout a 25-minute walk!",
        explanation: "Multiply map cm by the scale number, then convert cm → m (÷100) → km (÷1000).",
      },
    ],
    activity: {
      title: "Map your neighborhood",
      description: "Draw a sketch map of your area with proper map elements.",
      steps: [
        "Sketch streets within 500 m of home from memory.",
        "Add a north arrow, scale bar and legend (min. 5 symbols).",
        "Mark coordinates of 3 landmarks using a map app.",
        "Verify: walk one route and check your distances.",
      ],
      hints: [
        "North arrows usually point up — but SAY so explicitly.",
        "Your scale bar: 1 cm = ___ m, measured against the real app.",
      ],
    },
    quiz: [
      {
        question: "On a 1:100.000 map, 3 cm equals...",
        options: ["300 m", "3 km", "30 km", "300 km"],
        answer: 1,
        explanation: "3 × 100.000 cm = 300.000 cm = 3 km.",
      },
      {
        question: "Latitude measures...",
        options: [
          "East/west of Greenwich",
          "North/south of the equator",
          "Height above sea",
          "Distance from Jakarta",
        ],
        answer: 1,
        explanation: "Latitude = north/south; longitude = east/west.",
      },
      {
        question: "Closely-spaced contour lines mean...",
        options: ["Flat land", "Steep slope", "A river", "A road"],
        answer: 1,
        explanation: "Height changes fast over short distance = steep.",
      },
    ],
  },
  {
    id: "g-climate",
    subjectId: "geography",
    title: "Climate, Weather & Seasons",
    description:
      "Why Jakarta is hot, London drizzles, and monsoons rule Asia — the science of skies.",
    level: "Intermediate",
    durationMin: 25,
    xp: 60,
    tags: ["climate", "weather"],
    objectives: [
      "Distinguish weather vs climate",
      "Explain monsoons and ocean currents",
      "Read a climate graph",
    ],
    sections: [
      {
        heading: "Weather vs climate",
        body: [
          "Weather = today's mood (rainy, 28°C). Climate = personality over 30+ years (tropical, wet). Saying 'it's cold today so global warming is fake' confuses mood with personality!",
          "Climate factors: latitude (tropics = hot), altitude (+100 m ≈ −0.6°C — that's why Dieng is cool), distance from sea (maritime = mild), and ocean currents (warm/cold conveyors).",
        ],
      },
      {
        heading: "Monsoons: Asia's breath",
        body: [
          "Indonesia's seasons come from monsoon winds, not tilt. October–April: wet west monsoon blows from Asia over warm seas, dumping rain. May–September: drier east monsoon from Australia.",
          "Farmers plant rice with the rains' arrival — a late monsoon threatens harvests. El Niño can delay rains and cause drought and haze; La Niña brings floods. Climate isn't abstract here — it's dinner.",
        ],
      },
      {
        heading: "Reading climate graphs",
        body: [
          "Climate graphs pair bars (monthly rainfall, left axis) with a line (temperature, right axis). Jakarta's shows rain year-round with a January peak; London's shows even drizzle and a summer bump.",
          "Compare shapes to classify: tropical rainforest (hot + wet always), monsoon (hot + seasonal rain), desert (hot + dry), temperate (4 seasons). One graph, whole story.",
        ],
      },
    ],
    keyTerms: [
      { term: "Monsoon", definition: "Seasonal reversing wind bringing wet/dry seasons." },
      { term: "El Niño", definition: "Pacific warming that can delay Indonesia's rains." },
      { term: "Altitude effect", definition: "Temperature drops ~0.6°C per 100 m climb." },
    ],
    examples: [
      {
        title: "Jakarta vs London climate",
        language: "text",
        code: "JAKARTA (6°S)          LONDON (51°N)\nTemp: 28°C all year   Temp: 5°C → 19°C\nRain: 300mm (Jan)     Rain: ~55mm every mo\n      50mm (Aug)      Drizzle year-round!\nType: Tropical monsoon  Type: Temperate maritime\n\nSame planet, different sky personalities.",
        explanation: "Latitude sets the baseline; monsoons and ocean currents write the details.",
      },
    ],
    activity: {
      title: "School weather station",
      description: "Record a week of weather and present it like a TV forecaster.",
      steps: [
        "Daily for 7 days: record temp, cloud cover and rain (yes/no + mm if possible).",
        "Plot temperature as a line graph, rainfall as bars.",
        "Compare with BMKG online data for your city — how close?",
        "Present a 1-minute forecast video for 'next week'.",
      ],
      hints: [
        "Measure at the same time daily for fair comparison.",
        "A plastic bottle rain gauge works surprisingly well!",
      ],
    },
    quiz: [
      {
        question: "Difference between weather and climate?",
        options: [
          "They're identical",
          "Weather is short-term; climate is 30+ year patterns",
          "Climate changes daily",
          "Weather only means rain",
        ],
        answer: 1,
        explanation: "Weather = daily mood; climate = long-term personality.",
      },
      {
        question: "Indonesia's rainy season comes from...",
        options: [
          "The east monsoon",
          "The west monsoon (Oct–Apr)",
          "Antarctic winds",
          "Desert winds",
        ],
        answer: 1,
        explanation: "West monsoon winds cross warm seas and dump rain on the archipelago.",
      },
      {
        question: "Climbing 1000 m cools air by about...",
        options: ["0.6°C", "6°C", "60°C", "It warms instead"],
        answer: 1,
        explanation: "~0.6°C per 100 m → ~6°C per 1000 m. Mountain air!",
      },
    ],
  },
  {
    id: "g-indonesia",
    subjectId: "geography",
    title: "Geography of Indonesia: The Archipelago",
    description:
      "17,000 islands on the Ring of Fire — volcanoes, biodiversity and why location is destiny.",
    level: "Beginner",
    durationMin: 25,
    xp: 60,
    tags: ["indonesia", "volcanoes"],
    objectives: [
      "Locate Indonesia's major islands",
      "Explain the Ring of Fire's effects",
      "Link geography to culture and economy",
    ],
    sections: [
      {
        heading: "17,000 pieces of paradise",
        body: [
          "Indonesia spans 5.120 km east–west (London to Baghdad!) across three time zones. Five main islands: Sumatra, Java (56% of people on 7% of land!), Kalimantan, Sulawesi and Papua — plus thousands of smaller gems.",
          "The Wallace Line splits Asian wildlife (tigers, orangutans) in the west from Australasian species (marsupials, birds of paradise) in the east. One country, two biological worlds.",
        ],
      },
      {
        heading: "Living on the Ring of Fire",
        body: [
          "Three tectonic plates collide beneath Indonesia, building 130+ active volcanoes. Eruptions destroy — but volcanic ash creates Java's famously fertile rice soils. Risk and reward in one mountain.",
          "Same forces cause earthquakes and tsunamis (Aceh 2004). Preparedness matters: know evacuation routes, recognize receding sea as a tsunami warning, and Drop-Cover-Hold during quakes.",
        ],
      },
      {
        heading: "Geography shapes everything",
        body: [
          "Mountains and seas isolated communities → 700+ languages, the world's most linguistically diverse nation after Papua New Guinea. Trade winds and straits (Malacca!) made entrepôts like Sriwijaya rich.",
          "Today geography drives the economy: palm oil and coal from Sumatra/Kalimantan, tourism in Bali, fisheries everywhere. The new capital Nusantara in Kalimantan? A geographic decision to rebalance Java-centric growth.",
        ],
      },
    ],
    keyTerms: [
      { term: "Archipelago", definition: "A sea dotted with many islands — from Greek 'chief sea'." },
      { term: "Ring of Fire", definition: "Pacific tectonic belt of volcanoes and earthquakes." },
      { term: "Wallace Line", definition: "Boundary between Asian and Australasian wildlife zones." },
    ],
    examples: [
      {
        title: "Indonesia by the numbers",
        language: "text",
        code: "🏝️  Islands: ±17.000 (only ~6.000 inhabited)\n🌋 Active volcanoes: 130+\n🗣️  Languages: 700+\n👥 Population: ±280 million (4th largest)\n⏰ Time zones: WIB, WITA, WIT\n🌊 Coastline: ±108.000 km (2nd longest!)",
        explanation: "Superlatives everywhere — Indonesia is a geography classroom all by itself.",
      },
    ],
    activity: {
      title: "Archipelago infographic",
      description: "Design a one-page infographic about one Indonesian island.",
      steps: [
        "Pick an island (not Java!) and research: size, population, volcanoes, wildlife.",
        "Find 3 surprising facts (Wallace Line species? record-breaking lake?).",
        "Design the infographic: map, 5 stats, 1 illustration.",
        "Present in 2 minutes: 'Why visit my island?'",
      ],
      hints: [
        "Lake Toba (Sumatra) is a supervolcano caldera — start there for drama.",
        "Komodo dragons live only in Nusa Tenggara — geography creates endemics.",
      ],
    },
    quiz: [
      {
        question: "Approximately how many Indonesian islands are there?",
        options: ["1,700", "17,000", "170,000", "170"],
        answer: 1,
        explanation: "About 17,000 islands — the world's largest archipelago.",
      },
      {
        question: "The Wallace Line separates...",
        options: [
          "Time zones",
          "Asian and Australasian wildlife",
          "Volcano types",
          "Ocean currents",
        ],
        answer: 1,
        explanation: "West = Asian species; east = Australasian species.",
      },
      {
        question: "Why are Javanese soils so fertile?",
        options: [
          "Desert dust",
          "Volcanic ash",
          "Glaciers",
          "Oil deposits",
        ],
        answer: 1,
        explanation: "Volcanic ash weathers into mineral-rich soils ideal for rice.",
      },
    ],
    popular: true,
  },
];
