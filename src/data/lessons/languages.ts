import type { Lesson } from "../types";

/** English + Bahasa Indonesia lessons. */
export const languageLessons: Lesson[] = [
  {
    id: "english-tenses",
    title: "English: Present, Past and Perfect Tenses",
    subjectId: "english",
    unitId: "grammar",
    track: "humanities",
    summary:
      "Choose the right tense every time — with a decision flow that works for any sentence you write.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 130,
    tags: ["English", "Grammar", "Tenses", "Writing"],
    objectives: [
      "Form the present simple, past simple and present perfect",
      "Choose the correct tense for a given situation",
      "Fix the three most common tense mistakes",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Tense is not about time alone — it is about the **relationship between events and now**. English gives you several ways to place an action, and choosing well is what makes writing sound natural.",
          "The three tenses you will use 90% of the time are present simple, past simple, and present perfect. Get these right and your writing instantly improves.",
        ],
      },
      {
        type: "table",
        title: "The three core tenses",
        headers: ["Tense", "Form", "Use it when", "Example"],
        rows: [
          ["Present simple", "base verb (+s / +es for he/she/it)", "Routines, facts, habits", "She studies every evening."],
          ["Past simple", "verb + ed (irregulars change)", "Finished actions with a finished time", "She studied yesterday."],
          ["Present perfect", "have/has + past participle", "Results or experiences that matter now", "She has studied for three hours."],
          ["Present continuous", "am/is/are + verb-ing", "Happening right now", "She is studying at the moment."],
        ],
      },
      {
        type: "diagram",
        title: "Choosing a tense in 3 questions",
        nodes: [
          { emoji: "1️⃣", title: "Finished time? (yesterday, in 2019)", detail: "→ Past simple" },
          { emoji: "2️⃣", title: "Happening right now?", detail: "→ Present continuous" },
          { emoji: "3️⃣", title: "Relevant to now, or an experience?", detail: "→ Present perfect" },
          { emoji: "4️⃣", title: "Always true, or a routine?", detail: "→ Present simple" },
        ],
      },
      {
        type: "steps",
        title: "Method: test any sentence",
        steps: [
          {
            title: "Find the time expression",
            body: "Words like *yesterday*, *last week*, *ago* force the past simple: 'I finished the project yesterday.'",
          },
          {
            title: "Check whether the time is open or closed",
            body: "*For* and *since* point to the present perfect because the period continues: 'I have lived here for six years' (and still do).",
            code: "I lived there for six years.   → finished, no longer there\nI have lived here for six years. → still there now",
          },
          {
            title: "Decide if the result matters now",
            body: "'I have lost my keys' means I cannot get in. 'I lost my keys yesterday' reports a past event with no present weight.",
          },
          {
            title: "Watch the irregulars",
            body: "Learn the three forms together: *go – went – gone*, *write – wrote – written*, *take – took – taken*.",
          },
        ],
      },
      {
        type: "compare",
        title: "Weak vs strong writing",
        columns: [
          {
            title: "Errors to eliminate",
            tone: "bad",
            items: [
              "I have seen him yesterday. ✗",
              "She don't like maths. ✗",
              "He has went home. ✗",
              "I am knowing the answer. ✗",
            ],
          },
          {
            title: "Correct versions",
            tone: "good",
            items: [
              "I saw him yesterday. ✓",
              "She doesn't like maths. ✓",
              "He has gone home. ✓",
              "I know the answer. ✓",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "State verbs stay simple",
        body: "Verbs about states rather than actions — *know, believe, understand, own, prefer, need* — are rarely used in continuous form. 'I am understanding' is a classic error; write 'I understand'.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Read it aloud",
        body: "Tense errors usually *sound* wrong before you can explain why. Read your sentence aloud at the end of writing — your ear catches what your rules miss.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Choose the correct sentence.",
        options: [
          "I have finished my homework yesterday.",
          "I finished my homework yesterday.",
          "I had finished my homework yesterday.",
          "I am finishing my homework yesterday.",
        ],
        answer: 1,
        explanation:
          "'Yesterday' is finished time, so the past simple is required. Present perfect never pairs with a finished time expression.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Complete with the correct form: She _______ (study) English for three years.",
        answer: ["has studied", "has been studying"],
        explanation: "'For three years' is an open period continuing to now, so use the present perfect.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "'I am knowing the answer' is grammatically correct English.",
        answer: false,
        explanation:
          "'Know' is a state verb, so it stays simple: 'I know the answer.'",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Match each sentence to its tense.",
        pairs: [
          { left: "She plays football every Saturday.", right: "Present simple" },
          { left: "They visited the museum last week.", right: "Past simple" },
          { left: "I have just finished the quiz.", right: "Present perfect" },
          { left: "He is reading a comic right now.", right: "Present continuous" },
        ],
        explanation:
          "Routine → present simple, finished time → past simple, present relevance → present perfect, right now → present continuous.",
        points: 25,
      },
    ],
    updatedAt: "2026-08-26",
    author: "Ms. Laras Puspita · English",
  },
  {
    id: "english-paragraph-writing",
    title: "English: Write a Paragraph People Finish",
    subjectId: "english",
    unitId: "writing",
    track: "humanities",
    summary:
      "Structure ideas with topic sentences, evidence and linking words — then edit your own work properly.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 160,
    tags: ["English", "Writing", "Paragraphs", "Editing"],
    objectives: [
      "Write a clear topic sentence",
      "Support a point with evidence and explanation",
      "Link ideas with suitable connectives",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "A paragraph is a unit of thought. It does one job, does it completely, and then stops. The pattern professionals use is **PEEL**: Point, Evidence, Explanation, Link.",
          "Readers decide within the first sentence whether to keep reading. Your topic sentence is therefore the most valuable sentence in the paragraph.",
        ],
      },
      {
        type: "table",
        title: "PEEL in detail",
        headers: ["Part", "Job", "Example sentence"],
        rows: [
          ["Point", "State the idea of the paragraph", "School sports days build teamwork better than classroom lessons do."],
          ["Evidence", "Give a fact, quote or example", "In a 2024 survey of 400 students, 78% said they relied on teammates during a relay."],
          ["Explanation", "Explain why the evidence supports the point", "Relays require shared timing, so students must communicate under pressure."],
          ["Link", "Connect to the next idea", "Teamwork also develops outside sport, however."],
        ],
      },
      {
        type: "steps",
        title: "Method: from notes to finished paragraph",
        steps: [
          {
            title: "Write the point as a fact, not a question",
            body: "'Robotics clubs increase persistence' is a claim you can support. 'Is robotics useful?' is a question that cannot start a paragraph.",
          },
          {
            title: "Add the strongest evidence you have",
            body: "One precise number or example beats three vague statements. If you have no evidence, move the claim to a different paragraph or soften it.",
            code: "Vague:   Many students enjoy robotics clubs.\nPrecise:  In our school, robotics club membership rose 40% after we added competition projects.",
          },
          {
            title: "Explain, do not repeat",
            body: "The explanation answers 'so what?'. If your explanation sentence could be swapped with your evidence sentence, you have not explained anything yet.",
          },
          {
            title: "Link to what comes next",
            body: "Connectives are signposts: *however*, *therefore*, *for example*, *in contrast*, *as a result*. Use one per paragraph, not one per sentence.",
          },
          {
            title: "Cut 15%",
            body: "Editing is where good writing happens. Delete filler words (*very*, *really*, *actually*, *a lot of*), split sentences over 30 words, and read it aloud.",
            hint: "Count the words in your first draft, then set a target of 85% of that for the final version.",
          },
        ],
      },
      {
        type: "compare",
        title: "Before and after editing",
        columns: [
          {
            title: "First draft",
            tone: "bad",
            items: [
              "Robotics is very interesting and lots of students really like it a lot.",
              "It is actually good for many things.",
              "The end.",
            ],
          },
          {
            title: "Edited",
            tone: "good",
            items: [
              "Robotics clubs turn abstract science into visible results.",
              "Students who program a sensor watch their code move something physical within minutes.",
              "That immediate feedback keeps beginners in the room.",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Professional writers revise, not type",
        body: "Published novelists typically go through five or more full drafts. Fluent first drafts are a myth — the skill is in revision, and revision is trainable.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Peer review in 60 seconds",
        body: "Swap paragraphs with a partner. Each person marks one sentence that is the clearest and one that is the vaguest, then explains why. Two specific comments beat twenty generic ones.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What does the 'E' in PEEL stand for (twice)?",
        options: ["Example and Ending", "Evidence and Explanation", "Editing and Emphasis", "Event and Effect"],
        answer: 1,
        explanation: "Point, Evidence, Explanation, Link — evidence supports the point, explanation interprets it.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The sentence that states a paragraph's main idea is called the _______ sentence.",
        answer: ["topic", "topic sentence"],
        explanation: "The topic sentence states the paragraph's single job; everything after it should serve that job.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Good paragraphs use a connective in every sentence.",
        answer: false,
        explanation:
          "Overlinking makes writing clunky. One well-chosen connective per paragraph is usually enough.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which sentence is the strongest evidence for a paragraph about reading habits?",
        options: [
          "Reading is very popular with students.",
          "Everyone knows reading is good for you.",
          "In our class survey, 64% of students read at least three books last term.",
          "Books are interesting and useful things.",
        ],
        answer: 2,
        explanation: "Specific, sourced data is far stronger than general statements of opinion.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-05",
    author: "Ms. Laras Puspita · English",
  },
  {
    id: "english-reading-inference",
    title: "English: Reading Between the Lines",
    subjectId: "english",
    unitId: "reading",
    track: "humanities",
    summary:
      "Understand what a text says and what it implies — inference, tone and vocabulary in context.",
    difficulty: "Intermediate",
    minutes: 20,
    xp: 150,
    tags: ["English", "Reading", "Inference", "Comprehension"],
    objectives: [
      "Distinguish literal meaning from inference",
      "Identify tone from word choice",
      "Work out unfamiliar vocabulary from context",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Comprehension is not about memorising the text. It is about building a model of what the writer means, including what they leave unsaid.",
          "An **inference** is a conclusion you draw from evidence in the text plus your own knowledge. Good readers make inferences and can point to the words that support them.",
        ],
      },
      {
        type: "code",
        language: "python",
        title: "Practice: read the passage, then answer",
        code: 'passage = """\nThe bus was twenty minutes late, and Mira had already counted the coins in\nher pocket three times. She read the noticeboard twice, though none of the\ncompetition dates had changed. When the doors finally hissed open, she sat\nat the very front and opened her notebook before the bus had even moved.\n"""\n\nprint("Q: How does Mira feel?")\nprint("A: The text never says. It shows us instead:")',
        output: "Q: How does Mira feel?\nA: The text never says. It shows us instead:",
      },
      {
        type: "table",
        title: "Show, don't tell: reading the signals",
        headers: ["Detail in the text", "What it suggests"],
        rows: [
          ["Counted the coins three times", "Nervous, worried about money or time"],
          ["Read the noticeboard twice though nothing changed", "Anxious; rereading to calm down"],
          ["Sat at the very front", "Eager, wants to be ready and not miss anything"],
          ["Opened her notebook before the bus moved", "Highly motivated — this matters to her"],
        ],
      },
      {
        type: "steps",
        title: "Method: answering an inference question",
        steps: [
          {
            title: "Find the evidence line",
            body: "Underline every detail that could carry meaning — verbs, adjectives, repetition, physical reactions.",
          },
          {
            title: "Ask 'what does this show?'",
            body: "Turn each detail into a short claim. 'Counted coins three times' → 'she was anxious about paying'.",
          },
          {
            title: "Check tone words",
            body: "*Hissed* is not neutral; neither is *finally* or *though*. Writers choose words with attitude built in.",
            code: "The doors opened.        → neutral\nThe doors hissed open.   → tension, impatience",
          },
          {
            title: "Answer with evidence attached",
            body: "A strong answer quotes the text: 'Mira is anxious, shown by her counting the coins three times and rereading an unchanged noticeboard.'",
          },
          {
            title: "Guess from context for unknown words",
            body: "Cover the word and read around it: 'The crowd was **raucous**, so I covered my ears.' Noise + covering ears → raucous means loudly uncontrolled.",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Literal vs inference vs evaluation",
        body: "**Literal** — 'The bus was late.' **Inference** — 'Mira feels anxious.' **Evaluation** — 'The writer uses small physical details effectively.' All three are valid; make sure you know which kind of question you are answering.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Read the questions first",
        body: "Skim the questions before reading the text. Your brain will flag the relevant lines as you go, which saves minutes in every exam.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "In the passage, what does counting the coins three times most strongly suggest?",
        options: ["She is bored", "She is anxious", "She is generous", "She is tired"],
        answer: 1,
        explanation: "Repeating a checking action signals nervousness — an inference supported by the detail itself.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "A conclusion drawn from evidence in a text is called an _______.",
        answer: ["inference", "inferences"],
        explanation: "An inference combines textual evidence with reasoning — it is never a pure guess.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "An inference must be supported by evidence from the text.",
        answer: true,
        explanation: "Without textual evidence you have an opinion, not an inference.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "The crowd was raucous, so I covered my ears. What does 'raucous' mean?",
        options: ["Quiet", "Extremely noisy", "Far away", "Angry"],
        answer: 1,
        explanation: "Context clues — the crowd and covered ears — point to loud, uncontrolled noise.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-10",
    author: "Ms. Laras Puspita · English",
  },
  {
    id: "indonesian-teks-eksposisi",
    title: "Bahasa Indonesia: Menulis Teks Eksposisi",
    subjectId: "indonesian",
    unitId: "teks",
    track: "humanities",
    summary:
      "Susun teks eksposisi yang kuat dengan tesis, argumen, dan penegasan ulang.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 155,
    tags: ["Bahasa Indonesia", "Teks eksposisi", "Menulis"],
    objectives: [
      "Mengidentifikasi struktur teks eksposisi",
      "Menyusun tesis dan argumen yang meyakinkan",
      "Menggunakan konjungsi dan kalimat fakta dengan tepat",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Teks eksposisi adalah tulisan yang **menjelaskan pendapat atau gagasan** disertai bukti agar pembaca yakin. Bedanya dengan berita: berita hanya melaporkan, sedangkan eksposisi berpendapat dan membuktikan.",
          "Strukturnya tiga bagian: **tesis** (pendapat awal), **rangkaian argumen** (bukti dan alasan), lalu **penegasan ulang** (kesimpulan yang menguatkan tesis).",
        ],
      },
      {
        type: "table",
        title: "Struktur teks eksposisi",
        headers: ["Bagian", "Isi", "Contoh singkat"],
        rows: [
          ["Tesis", "Pendapat penulis yang jelas", "Belajar robotika di sekolah melatih siswa berpikir sistematis."],
          ["Argumen 1", "Fakta atau alasan utama", "Siswa harus menulis urutan perintah yang benar sebelum program berjalan."],
          ["Argumen 2", "Bukti tambahan", "Data sekolah menunjukkan nilai matematika anggota klub naik 12% dalam satu semester."],
          ["Penegasan ulang", "Kesimpulan yang menegaskan tesis", "Oleh karena itu, robotika bukan sekadar ekstrakurikuler, melainkan sarana berpikir logis."],
        ],
      },
      {
        type: "compare",
        title: "Kalimat fakta vs kalimat opini",
        columns: [
          {
            title: "Fakta (bisa diperiksa)",
            tone: "good",
            items: [
              "Micro:bit memiliki matriks LED 5×5.",
              "Air mendidih pada 100 °C di tekanan 1 atm.",
              "Indonesia merdeka pada 17 Agustus 1945.",
            ],
          },
          {
            title: "Opini (perlu alasan kuat)",
            tone: "neutral",
            items: [
              "Robotika paling menyenangkan dari semua pelajaran.",
              "Belajar matematika sebaiknya dimulai dari proyek nyata.",
              "Setiap siswa wajib memiliki laptop.",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Metode: menulis eksposisi dalam 5 langkah",
        steps: [
          {
            title: "Tentukan posisi",
            body: "Pilih satu pendapat yang dapat kamu dukung. Tesis harus jelas dan terukur, bukan pertanyaan.",
            code: "Lemah: Apakah robotika penting?\nKuat:  Robotika penting karena melatih kemampuan berpikir sistematis.",
          },
          {
            title: "Kumpulkan minimal tiga argumen",
            body: "Gunakan pola: alasan → bukti → penjelasan. Bukti bisa berupa data, pengalaman, atau pendapat ahli.",
          },
          {
            title: "Susun paragraf dengan konjungsi",
            body: "Gunakan konjungsi antarkalimat seperti *oleh karena itu*, *sebaliknya*, *akibatnya*, *selain itu* agar alur logis.",
          },
          {
            title: "Hindari kalimat bertele-tele",
            body: "Satu paragraph satu gagasan. Kalimat lebih dari 25 kata biasanya menyembunyikan gagasan yang belum jelas.",
          },
          {
            title: "Baca ulang dan perbaiki ejaan",
            body: "Periksa huruf kapital, tanda baca, dan penulisan kata baku (misalnya *praktik*, bukan *praktek*).",
            hint: "Bacakan tulisanmu dengan suara keras; kalimat yang janggal terdengar jelas.",
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Ejaan yang sering keliru",
        body: "Kata baku: *praktik*, *jadwal*, *izin*, *silakan*, *apotek*, *analisis*, *teoretis*. Bentuk tidak baku (*praktek*, *jadual*, *ijin*) sering muncul dalam penulisan sehari-hari.",
      },
      {
        type: "quote",
        quote:
          "Bahasa menunjukkan bangsa — bahasa yang tertata menunjukkan gagasan yang tertata.",
        author: "Peribahasa",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Latihan cepat",
        body: "Ambil satu artikel berita, lalu ubah judulnya menjadi tesis eksposisi dengan menambahkan *seharusnya*, *perlu*, atau *penting* — kemudian buktikan dalam tiga paragraf.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Bagian awal teks eksposisi yang berisi pendapat penulis disebut…",
        options: ["Argumen", "Tesis", "Penegasan ulang", "Orientasi"],
        answer: 1,
        explanation: "Tesis adalah pernyataan pendapat yang akan didukung oleh argumen-argumen berikutnya.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Bagian akhir teks eksposisi yang menegaskan kembali pendapat disebut penegasan _______.",
        answer: ["ulang"],
        explanation: "Penegasan ulang menegaskan kembali tesis dengan bukti yang sudah dijelaskan.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "'Micro:bit memiliki matriks LED 5×5' adalah kalimat fakta.",
        answer: true,
        explanation: "Pernyataan ini dapat diperiksa kebenarannya, sehingga termasuk kalimat fakta.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Pasangkan konjungsi dengan fungsinya.",
        pairs: [
          { left: "oleh karena itu", right: "menyimpulkan" },
          { left: "sebaliknya", right: "menunjukkan pertentangan" },
          { left: "selain itu", right: "menambahkan informasi" },
          { left: "akibatnya", right: "menunjukkan sebab-akibat" },
        ],
        explanation: "Konjungsi antarkalimat membantu pembaca mengikuti alur argumen.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-06",
    author: "Ibu Retno Wulandari · Bahasa Indonesia",
  },
  {
    id: "indonesian-puisi-majas",
    title: "Bahasa Indonesia: Puisi dan Majas",
    subjectId: "indonesian",
    unitId: "sastra",
    track: "humanities",
    summary:
      "Membaca puisi dengan tepat: menemukan citraan, rima, dan majas yang dipakai penyair.",
    difficulty: "Intermediate",
    minutes: 20,
    xp: 150,
    tags: ["Bahasa Indonesia", "Puisi", "Majas", "Sastra"],
    objectives: [
      "Mengidentifikasi citraan dan rima dalam puisi",
      "Membedakan majas perbandingan dan pertentangan",
      "Membaca puisi dengan ekspresi yang sesuai",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Puisi adalah cara memadatkan pengalaman menjadi sedikit kata. Karena itu, hampir setiap kata dipilih dengan alasan — dan ada bagian yang harus **kamu simpulkan sendiri**.",
          "Untuk memahami puisi, perhatikan empat hal: **diksi** (pilihan kata), **citraan** (pengalaman indra yang dibangun), **rima** (bunyi), dan **majas** (gaya bahasa).",
        ],
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Citraan", definition: "Gambaran yang membuat pembaca melihat, mendengar, atau merasakan sesuatu." },
          { term: "Rima", definition: "Persamaan bunyi pada akhir baris atau di dalam baris." },
          { term: "Majas", definition: "Gaya bahasa untuk memperkuat makna, seperti perbandingan atau pertentangan." },
          { term: "Mantra/majas personifikasi", definition: "Memberi sifat manusia kepada benda, misalnya 'angin berbisik'." },
        ],
      },
      {
        type: "table",
        title: "Majas yang wajib dikenali",
        headers: ["Majas", "Ciri", "Contoh"],
        rows: [
          ["Personifikasi", "Benda melakukan hal manusia", "Ombak memeluk karang di pantai."],
          ["Metafora", "Perbandingan langsung tanpa kata pembanding", "Kau matahariku."],
          ["Simile/Asosiasi", "Ada kata *seperti*, *bagai*, *laksana*", "Wajahmu seperti bulan purnama."],
          ["Hiperbola", "Berlebihan", "Suaramu menggetarkan tujuh langit."],
          ["Litotes", "Merendah untuk merendahkan diri", "Silakan mampir ke gubuk saya yang sederhana."],
          ["Ironi", "Menyatakan kebalikan dari kenyataan", "Bagus sekali, tugasmu diserahkan tiga minggu terlambat."],
        ],
      },
      {
        type: "steps",
        title: "Metode: menganalisis puisi pendek",
        steps: [
          {
            title: "Baca tiga kali",
            body: "Baca dalam hati, lalu dengan suara, lalu dengan jeda pada tanda baca. Puisi ditulis untuk dibaca keras.",
          },
          {
            title: "Tandai kata konkret",
            body: "Lingkari kata yang bisa dilihat atau dirasakan. Kumpulan kata ini menunjukkan citraan utama puisi.",
          },
          {
            title: "Cari kata kiasan",
            body: "Jika satu kata tidak masuk akal secara harfiah, di situlah majas berada.",
            code: "Harfiah:  air matanya jatuh ke lantai.\nMajas:    tangisnya membasahi seluruh kota.  (hiperbola)",
          },
          {
            title: "Temukan temanya",
            body: "Tema jarang dinyatakan langsung. Susun satu kalimat yang menghubungkan semua citraan menjadi satu gagasan.",
          },
          {
            title: "Bacakan dengan ekspresi",
            body: "Naikkan nada pada pertanyaan, pelankan pada baris ragu, dan berhenti satu detik sebelum baris penutup. Ekspresi menunjukkan pemahaman.",
          },
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Satu kata, banyak makna",
        body: "Kata *pulang* dalam puisi Chairil Anwar bukan sekadar kembali ke rumah — ia menjadi metafora kelelahan jiwa setelah perjalanan panjang. Kata sederhana sering menyimpan makna paling dalam.",
      },
      {
        type: "quote",
        quote:
          "Aku ini binatang jalang / dari kumpulannya terbuang.",
        author: "Chairil Anwar",
        role: "“Aku”, 1943",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Latihan mingguan",
        body: "Pilih satu bait favorit, tulis ulang dalam bentuk prosa satu paragraf. Kegiatan ini melatih pemahaman makna sekaligus kemampuan menulis.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "'Angin berbisik di antara dedaunan.' Majas yang digunakan adalah…",
        options: ["Metafora", "Hiperbola", "Personifikasi", "Litotes"],
        answer: 2,
        explanation: "Angin diberi sifat manusia (berbisik), sehingga termasuk personifikasi.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Majas perbandingan yang memakai kata *seperti* atau *bagai* disebut _______.",
        answer: ["simile", "asosiasi", "perumpamaan"],
        explanation: "Simile adalah perbandingan eksplisit karena memakai kata pembanding.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Litotes berarti menyatakan sesuatu secara berlebihan.",
        answer: false,
        explanation: "Litotes justru merendahkan diri; yang berlebihan adalah hiperbola.",
        points: 20,
      },
      {
        id: "q4",
        type: "matching",
        prompt: "Pasangkan kutipan dengan majasnya.",
        pairs: [
          { left: "Kau matahariku", right: "Metafora" },
          { left: "Ombak memeluk karang", right: "Personifikasi" },
          { left: "Suaramu menggetarkan tujuh langit", right: "Hiperbola" },
          { left: "Wajahmu bagai bulan purnama", right: "Simile" },
        ],
        explanation: "Majas dibedakan dari cara perbandingan dan tingkat penggambarannya.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-08",
    author: "Ibu Retno Wulandari · Bahasa Indonesia",
  },
  {
    id: "indonesian-presentasi",
    title: "Bahasa Indonesia: Presentasi yang Meyakinkan",
    subjectId: "indonesian",
    unitId: "keterampilan",
    track: "humanities",
    summary:
      "Menyusun pembukaan, isi, dan penutup presentasi — serta mengelola suara dan gugup di depan kelas.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 145,
    tags: ["Bahasa Indonesia", "Presentasi", "Berbicara"],
    objectives: [
      "Menyusun struktur presentasi yang logis",
      "Merancang pembuka yang menarik perhatian",
      "Mengelola suara, jeda, dan bahasa tubuh",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Presentasi bukan membaca laporan dengan suara keras. Presentasi adalah **percakapan terarah** — kamu menyampaikan gagasan kepada orang yang punya sedikit waktu dan banyak pilihan untuk mengalihkan perhatian.",
          "Kaidah klasik yang tetap berlaku: katakan apa yang akan disampaikan, sampaikan, lalu ulangi apa yang sudah disampaikan.",
        ],
      },
      {
        type: "table",
        title: "Struktur presentasi 5 menit",
        headers: ["Bagian", "Durasi", "Isi", "Tujuan"],
        rows: [
          ["Pembukaan", "30 detik", "Fakta mengejutkan, pertanyaan, atau cerita singkat", "Merebut perhatian"],
          ["Kerangka", "30 detik", "Sebutkan tiga poin utama", "Memberi peta kepada pendengar"],
          ["Isi", "3,5 menit", "Poin → bukti → contoh untuk setiap bagian", "Meyakinkan"],
          ["Penutup", "30 detik", "Ringkasan dan seruan tindakan", "Diingat"],
        ],
      },
      {
        type: "compare",
        title: "Pembuka lemah vs pembuka kuat",
        columns: [
          {
            title: "Melemahkan",
            tone: "bad",
            items: [
              "“Hari ini saya akan mempresentasikan tentang…”",
              "“Maaf kalau presentasi saya kurang bagus.”",
              "Membaca slide kata per kata",
            ],
          },
          {
            title: "Menguatkan",
            tone: "good",
            items: [
              "“Tahukah kamu bahwa 1 dari 3 siswa pernah kehilangan datanya?”",
              "“Saya akan menunjukkan tiga cara mudah mengatasinya.”",
              "Melihat audiens, bukan layar",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Metode: latihan 10 menit sebelum tampil",
        steps: [
          {
            title: "Ucapkan keras satu kali penuh",
            body: "Latihan pertama tanpa slide, hanya suara. Jika kamu bisa menyampaikannya tanpa slide, slide hanya akan memperkuat.",
          },
          {
            title: "Tandai tiga kata kunci",
            body: "Jangan menghafal kalimat, hafalkan tiga kata kunci. Ingatan gagasan lebih tahan lama daripada ingatan teks.",
            hint: "Tulis kata kunci di kartu kecil, bukan di kertas penuh kalimat.",
          },
          {
            title: "Latih jeda",
            body: "Berhenti dua detik setelah poin penting. Jeda membuat pendengar berpikir dan membuatmu terlihat percaya diri.",
          },
          {
            title: "Atur pernapasan",
            body: "Jika gugup, tarik napas empat detik, tahan empat detik, buang empat detik. Lakukan dua kali sebelum mulai.",
          },
          {
            title: "Siapkan dua pertanyaan",
            body: "Perkirakan pertanyaan tersulit dan siapkan jawabannya. Jika belum tahu, katakan akan mencarinya — itu jawaban yang jujur dan profesional.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Tiga kesalahan umum",
        body: "Terlalu banyak teks di slide, berbicara terlalu cepat saat gugup, dan menutup presentasi tanpa kesimpulan. Slide mendukung, bukan menggantikan pembicara.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "Aturan 6×6",
        body: "Maksimal enam baris per slide, maksimal enam kata per baris. Teks yang sedikit memaksa audiens mendengarkan penjelasanmu — itulah tujuannya.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Berapa lama idealnya bagian pembukaan presentasi 5 menit?",
        options: ["1 detik", "30 detik", "2 menit", "3 menit"],
        answer: 1,
        explanation: "Pembukaan sekitar 30 detik sudah cukup untuk merebut perhatian tanpa menghabiskan waktu isi.",
        points: 25,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Berhenti sejenak setelah poin penting disebut teknik _______.",
        answer: ["jeda", "pause"],
        explanation: "Jeda memberi ruang berpikir bagi audiens dan menambah bobot pada poin yang disampaikan.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Menghafal seluruh naskah kalimat per kalimat adalah cara terbaik mempersiapkan presentasi.",
        answer: false,
        explanation: "Menghafal naskah membuat presentasi kaku dan panik jika satu kalimat terlupa. Hafalkan gagasan dan kata kunci.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Aturan 6×6 pada slide berarti…",
        options: [
          "6 slide, 6 gambar",
          "maksimal 6 baris dan 6 kata per baris",
          "6 menit, 6 poin",
          "6 warna, 6 huruf",
        ],
        answer: 1,
        explanation: "Aturan ini menjaga slide tetap ringkas sehingga perhatian tetap pada pembicara.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-11",
    author: "Ibu Retno Wulandari · Bahasa Indonesia",
  },
];
