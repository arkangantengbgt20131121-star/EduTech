import type { Lesson } from "./types";

export const creativeLessons: Lesson[] = [
  // ─── DESIGN ──────────────────────────────────────────────────
  {
    id: "d-design-thinking",
    subjectId: "design",
    title: "Design Thinking: Solve Problems Beautifully",
    description:
      "Learn the 5-step process behind great products: empathize, define, ideate, prototype, test.",
    level: "Beginner",
    durationMin: 20,
    xp: 50,
    tags: ["UI/UX", "process", "beginner"],
    objectives: [
      "Explain the 5 stages of design thinking",
      "Write a clear problem statement",
      "Sketch rapid prototypes on paper",
    ],
    sections: [
      {
        heading: "Design is problem-solving, not decoration",
        body: [
          "Beginners think design means 'make it pretty'. Professionals know it means 'make it work for real humans'. A beautiful app nobody can use is a failure; an ugly one everyone loves is a success waiting for polish.",
          "Design thinking is a repeatable 5-step process used at Apple, Google and IDEO: Empathize, Define, Ideate, Prototype, Test. It works for apps, posters, school projects — even planning events.",
        ],
      },
      {
        heading: "Empathize before you solve",
        body: [
          "Step 1 is watching and asking. If you're designing a homework app, interview classmates: Where do they study? What frustrates them? You'll discover the real problem is rarely what you first assumed.",
          "Write findings as a problem statement: 'Busy students need a way to track homework because they forget deadlines written in chat groups.' One sentence that guides every later decision.",
        ],
      },
      {
        heading: "Prototype ugly, test early",
        body: [
          "A prototype can be paper sketches! Draw each app screen on sticky notes, then 'play computer' while a friend taps through. You'll find confusing flows in 10 minutes instead of 10 days.",
          "Rule of thumb: test with 5 users to catch 85% of problems. Feedback is a gift — every confused user just saved you from shipping a confusing product.",
        ],
      },
    ],
    keyTerms: [
      { term: "Empathy", definition: "Understanding users' real needs through observation and interviews." },
      { term: "Prototype", definition: "A quick draft (even paper) used to test ideas cheaply." },
      { term: "Iteration", definition: "Repeating improve → test cycles until the design works." },
    ],
    examples: [
      {
        title: "From complaint to problem statement",
        language: "text",
        code: "❌ Weak: 'Students don't like homework.'\n   (Too vague — can't design from this.)\n\n✅ Strong: 'Grade 8 students need a visual way to\n   see all weekly deadlines because assignments\n   get buried in WhatsApp chats.'\n   (Who + need + why = designable!)",
        explanation:
          "Strong problem statements name the user, the need and the reason. If you can't point at it and say 'we'll know it's solved when...', keep refining.",
      },
    ],
    activity: {
      title: "Redesign your school bag",
      description: "Run a mini design sprint on paper to improve the humble backpack.",
      steps: [
        "Interview a friend: what annoys them about their bag? (2 min)",
        "Write one problem statement from what you heard.",
        "Sketch 3 wild solutions in 5 minutes — no idea too silly.",
        "Pick the best, sketch it bigger, and get feedback from your friend.",
      ],
      hints: [
        "Ask 'why?' three times to dig past surface complaints.",
        "Quantity first: 3 fast sketches beat 1 precious drawing.",
      ],
    },
    quiz: [
      {
        question: "What is the correct order of design thinking?",
        options: [
          "Ideate, Test, Empathize, Define, Prototype",
          "Empathize, Define, Ideate, Prototype, Test",
          "Prototype, Empathize, Test, Ideate, Define",
          "Define, Prototype, Empathize, Test, Ideate",
        ],
        answer: 1,
        explanation: "Understand users first (empathize), then define, ideate, prototype and test.",
      },
      {
        question: "Why prototype on paper before building?",
        options: [
          "Paper apps run faster",
          "It finds problems cheaply and quickly",
          "Computers can't draw",
          "Clients prefer paper",
        ],
        answer: 1,
        explanation: "Paper prototypes take minutes and reveal confusing flows before costly building.",
      },
      {
        question: "A good problem statement includes...",
        options: [
          "The solution",
          "User + need + reason",
          "The budget",
          "A color palette",
        ],
        answer: 1,
        explanation: "Who needs what and why — never the solution (that comes later).",
      },
    ],
    popular: true,
  },
  {
    id: "d-figma-first-ui",
    subjectId: "design",
    title: "Figma: Build Your First App Screen",
    description:
      "Master frames, shapes, text and auto-layout by designing a music player screen in Figma.",
    level: "Beginner",
    durationMin: 30,
    xp: 70,
    tags: ["figma", "UI", "app design"],
    objectives: [
      "Navigate Figma: frames, layers, properties",
      "Build a music player UI from shapes",
      "Use auto-layout for clean spacing",
    ],
    sections: [
      {
        heading: "Why Figma runs the design world",
        body: [
          "Figma is free for students, runs in the browser, and lets teams design together live — like Google Docs for interfaces. Most UI/UX job postings today list Figma as a required skill.",
          "Everything starts with a Frame (press F): an iPhone 14 frame is 393 × 852 pixels. Frames hold your screen; layers inside hold shapes, text and images.",
        ],
      },
      {
        heading: "Shapes, text and style",
        body: [
          "Rectangles (R), ellipses (O) and text (T) build 90% of interfaces. Round corners in the properties panel, add fills for color and effects for shadows. Album art? Just a rounded rectangle with a gradient fill!",
          "Name your layers (artwork / song-title / play-button) from day one. Future-you, hunting through 'Rectangle 47', will be grateful.",
        ],
      },
      {
        heading: "Auto-layout: the magic button",
        body: [
          "Select stacked items and press Shift+A: auto-layout turns them into a smart stack with even gaps that adjusts when text changes. Buttons that resize with their labels? That's auto-layout.",
          "Combine auto-layout with constraints (pin the player bar to the bottom) and your screen survives any content change — exactly how real apps behave.",
        ],
      },
    ],
    keyTerms: [
      { term: "Frame", definition: "A container representing one screen or component." },
      { term: "Auto-layout", definition: "Smart stacks that space and resize content automatically." },
      { term: "Component", definition: "A reusable element (like a button) reused across screens." },
    ],
    examples: [
      {
        title: "Music player screen spec",
        language: "text",
        code: "Frame: iPhone 14 (393 × 852), fill #0B0E17\n├─ Status bar (9:41, signal icons)\n├─ Artwork: 320×320 rounded 24, gradient\n├─ Song title: 24pt bold, white\n├─ Artist: 16pt, gray #9CA3AF\n├─ Progress bar: track 4px + knob 16px\n├─ Controls: ⏮  ▶(64px)  ⏭ spaced 32px\n└─ Bottom nav: Home / Search / Library",
        explanation:
          "Breaking a screen into a layer tree before touching Figma makes building twice as fast. Try recreating this spec — it matches hit music apps closely.",
      },
    ],
    activity: {
      title: "Design a music player",
      description: "Recreate the music player screen in Figma following the spec above.",
      steps: [
        "Create a free Figma account and a new design file.",
        "Add an iPhone frame and build each layer from the spec.",
        "Apply auto-layout to the control buttons row.",
        "Share a screenshot and get feedback from a friend.",
      ],
      hints: [
        "Hold Shift while resizing to keep proportions.",
        "Use #6366F1 (indigo) for the play button to match EduTech vibes.",
      ],
    },
    quiz: [
      {
        question: "What is a Frame in Figma?",
        options: [
          "A picture border",
          "A container representing a screen",
          "An animation",
          "A font style",
        ],
        answer: 1,
        explanation: "Frames are containers — typically one per app screen.",
      },
      {
        question: "What does auto-layout do?",
        options: [
          "Draws for you",
          "Auto-spaces and resizes stacked content",
          "Exports images",
          "Deletes layers",
        ],
        answer: 1,
        explanation: "Auto-layout keeps stacks evenly spaced and responsive to content changes.",
      },
      {
        question: "Why name your layers?",
        options: [
          "Figma requires it",
          "So files stay organized and teamwork is easy",
          "It makes exports smaller",
          "Names add colors",
        ],
        answer: 1,
        explanation: "Named layers keep files navigable for you and collaborators.",
      },
    ],
    popular: true,
  },
  {
    id: "d-color-type",
    subjectId: "design",
    title: "Color & Typography That Works",
    description:
      "Pick palettes with the 60-30-10 rule and pair fonts that make any design look pro.",
    level: "Intermediate",
    durationMin: 25,
    xp: 60,
    tags: ["color", "typography", "fundamentals"],
    objectives: [
      "Build palettes using color theory",
      "Apply the 60-30-10 rule",
      "Pair fonts and set readable type scales",
    ],
    sections: [
      {
        heading: "Color speaks before words",
        body: [
          "Users judge a design's trustworthiness in 50 milliseconds — mostly from color. Blue says trust (banks, tech), green says growth and health, red shouts urgency and appetite.",
          "The color wheel is your cheat sheet: complementary colors (opposites like indigo + amber) create energy; analogous colors (neighbors like teal + blue) feel calm and premium.",
        ],
      },
      {
        heading: "The 60-30-10 rule",
        body: [
          "Pros never use colors equally. Give 60% to a neutral background (white, slate), 30% to a secondary color (sections, cards), and 10% to one bold accent (buttons, highlights).",
          "EduTech itself follows this: white backgrounds, slate sections, indigo accents. One accent color used sparingly beats five colors fighting for attention.",
        ],
      },
      {
        heading: "Typography: the invisible art",
        body: [
          "95% of web design is typography — most screens are text! Pair one font for headings with one for body (e.g. bold 'Plus Jakarta Sans' + regular 'Inter'), and never use more than two families.",
          "Build a type scale where each step multiplies by ~1.25: 14 body → 18 subtitle → 24 heading → 32 hero. Consistent rhythm makes everything feel designed, even simple pages.",
        ],
      },
    ],
    keyTerms: [
      { term: "Complementary", definition: "Opposite colors on the wheel that create contrast." },
      { term: "60-30-10", definition: "Background 60%, secondary 30%, accent 10%." },
      { term: "Type scale", definition: "A proportional set of font sizes for a design." },
    ],
    examples: [
      {
        title: "EduTech palette decoded",
        language: "text",
        code: "60%  Background  #FFFFFF / slate-50   (calm canvas)\n30%  Secondary   #0F172A slate-950  (text, dark sections)\n10%  Accent      #6366F1 indigo-500 (buttons, links)\n+1   Success     #22C55E            (only for wins/XP)\n\nType: Plus Jakarta Sans (headings) + Inter (body)\nScale: 14 / 16 / 20 / 24 / 32 / 48",
        explanation:
          "Notice the restraint: essentially two colors plus one accent. Constraints force creativity — and consistency.",
      },
    ],
    activity: {
      title: "Rebrand your favorite snack",
      description: "Design a mini brand board: palette, fonts and a logo sketch.",
      steps: [
        "Pick a snack and 3 personality words (e.g. fun, bold, tropical).",
        "Choose a 60-30-10 palette that matches the personality.",
        "Pair two Google Fonts (one display, one body).",
        "Sketch a simple logo and mock it on a wrapper shape.",
      ],
      hints: [
        "Browse coolors.co or Google Fonts for inspiration, then commit.",
        "Test your palette in grayscale — contrast should survive without hue.",
      ],
    },
    quiz: [
      {
        question: "What does the 60-30-10 rule describe?",
        options: [
          "Font sizes",
          "How to proportion colors in a design",
          "Image dimensions",
          "Pricing tiers",
        ],
        answer: 1,
        explanation: "60% background, 30% secondary, 10% accent keeps color balanced.",
      },
      {
        question: "Which pair is complementary?",
        options: [
          "Blue + teal",
          "Red + orange",
          "Indigo + amber",
          "Pink + red",
        ],
        answer: 2,
        explanation: "Complementary colors sit opposite on the wheel — indigo vs amber.",
      },
      {
        question: "How many font families should beginners use?",
        options: ["As many as possible", "Maximum 2", "Exactly 5", "Fonts don't matter"],
        answer: 1,
        explanation: "Two families (headings + body) keep designs clean and consistent.",
      },
    ],
  },
  {
    id: "d-illustrator-poster",
    subjectId: "design",
    title: "Illustrator & Photoshop: Poster Basics",
    description:
      "Learn vectors vs pixels, then design an event poster using shapes, masks and effects.",
    level: "Intermediate",
    durationMin: 35,
    xp: 85,
    tags: ["illustrator", "photoshop", "poster"],
    objectives: [
      "Explain vectors vs raster images",
      "Use pen tool basics and shape builder",
      "Compose a poster with hierarchy",
    ],
    sections: [
      {
        heading: "Vectors vs pixels",
        body: [
          "Photoshop images are pixels (raster): zoom too far and they blur into squares. Illustrator graphics are math (vector): infinitely scalable, always crisp. Logos must be vector; photos must be raster.",
          "Rule of thumb: creating shapes, icons, logos? Illustrator. Editing photos, textures, digital painting? Photoshop. Pros constantly combine both.",
        ],
      },
      {
        heading: "The pen tool (don't panic)",
        body: [
          "The pen tool terrifies beginners — and it's the most powerful tool in design. Click to place anchor points, drag to pull curves. Fewer points = smoother shapes.",
          "Practice by tracing simple objects: a leaf, a game controller, your school logo. 30 minutes of tracing teaches more than hours of tutorials.",
        ],
      },
      {
        heading: "Poster hierarchy: 3-second test",
        body: [
          "A poster has 3 seconds to work: (1) giant headline readable from 5 meters, (2) one striking visual, (3) small details (date, place) for those who stop. If the date is bigger than the title, the hierarchy is broken.",
          "Use size, weight and color for emphasis — but pick ONE star. Everything can't shout; if everything is bold, nothing is.",
        ],
      },
    ],
    keyTerms: [
      { term: "Vector", definition: "Math-based graphics that scale infinitely (Illustrator)." },
      { term: "Raster", definition: "Pixel-based images that blur when enlarged (Photoshop)." },
      { term: "Hierarchy", definition: "Visual order guiding the eye: headline → visual → details." },
    ],
    examples: [
      {
        title: "Poster layout blueprint",
        language: "text",
        code: "┌─────────────────────────┐\n│  ROBOTICS EXPO 2026   │ ← Headline, 120pt bold\n│   🤖 [BIG ROBOT ART]  │ ← One hero visual\n│  Build. Battle. Win.  │ ← Tagline, 48pt\n│ ───────────────────── │\n│ Sat, Oct 12 • Hall B  │ ← Details, 24pt\n│ Free entry • QR code  │ ← Call to action\n└─────────────────────────┘",
        explanation:
          "Three zones, one star (the headline + art). Details are small because they serve people already interested.",
      },
    ],
    activity: {
      title: "Design an event poster",
      description: "Create an A4 poster for a school event in Illustrator, Figma or even Canva.",
      steps: [
        "Pick an event (coding club, art show, sports day) and write the 3 zones of content.",
        "Choose a 60-30-10 palette and 2 fonts.",
        "Build the layout: headline, hero visual, details.",
        "Test: show it for 3 seconds — can a friend name the event and date?",
      ],
      hints: [
        "Trace a simple icon with the pen tool for your hero visual.",
        "Align everything to an invisible grid — alignment is free professionalism.",
      ],
    },
    quiz: [
      {
        question: "Why should logos be vector?",
        options: [
          "Vectors are smaller files",
          "They scale infinitely without blurring",
          "Vectors have more colors",
          "Pixels are illegal in logos",
        ],
        answer: 1,
        explanation: "Vector math stays crisp from favicon to billboard; pixels blur when enlarged.",
      },
      {
        question: "What should dominate a poster?",
        options: [
          "The date",
          "The headline + hero visual",
          "The organizer's address",
          "All text equally",
        ],
        answer: 1,
        explanation: "Headline and visual hook attention in 3 seconds; details come second.",
      },
      {
        question: "Which tool for editing a photo?",
        options: ["Illustrator", "Photoshop", "Figma frames", "A text editor"],
        answer: 1,
        explanation: "Photoshop is raster-based — built for photo editing and painting.",
      },
    ],
  },
];
