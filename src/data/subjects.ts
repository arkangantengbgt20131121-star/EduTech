import type { Subject } from "./types";

/**
 * The ten learning categories on EduTech.
 * `color` + `gradient` drive the accent system across cards, lessons and charts.
 */
export const subjects: Subject[] = [
  {
    id: "robotics",
    name: "Robotics",
    tagline: "Build things that move",
    description:
      "Program a Micro:bit, wire up sensors and motors, and turn ideas into machines you can actually hold.",
    emoji: "🤖",
    icon: "cpu",
    color: "#f97316",
    gradient: ["#fb923c", "#f59e0b"],
    topics: [
      "Micro:bit",
      "Sensors",
      "LEDs",
      "Buttons",
      "Motors",
      "MakeCode",
      "Robotics projects",
    ],
    units: [
      {
        id: "microbit-basics",
        title: "Micro:bit Basics",
        description: "Meet the board, light up the LED matrix and learn MakeCode.",
      },
      {
        id: "sensors-input",
        title: "Sensors & Inputs",
        description: "Buttons, shake, light and temperature sensors.",
      },
      {
        id: "motors-motion",
        title: "Motors & Motion",
        description: "Driving motors, servos and wheels for real movement.",
      },
      {
        id: "robotics-projects",
        title: "Build Projects",
        description: "Line followers, reaction games and walking robots.",
      },
    ],
    learnerCount: 18420,
    rating: 4.9,
    featured: true,
  },
  {
    id: "coding",
    name: "Coding",
    tagline: "Think it, then code it",
    description:
      "From your first print statement to full web pages — Python, JavaScript and HTML/CSS in a real playground.",
    emoji: "💻",
    icon: "code",
    color: "#6366f1",
    gradient: ["#6366f1", "#22d3ee"],
    topics: [
      "Python",
      "JavaScript",
      "HTML & CSS",
      "Programming fundamentals",
      "Algorithms",
      "Mini projects",
    ],
    units: [
      {
        id: "python-basics",
        title: "Python Foundations",
        description: "Variables, input, output and your first programs.",
      },
      {
        id: "control-flow",
        title: "Control Flow",
        description: "Conditions, loops and writing programs that decide.",
      },
      {
        id: "javascript",
        title: "JavaScript & the Web",
        description: "Make pages interactive with the language of the browser.",
      },
      {
        id: "web-pages",
        title: "HTML, CSS & Layout",
        description: "Structure and style real pages, then ship them.",
      },
      {
        id: "algorithms",
        title: "Algorithms",
        description: "Searching, sorting and breaking problems into steps.",
      },
    ],
    learnerCount: 24980,
    rating: 4.9,
    featured: true,
  },
  {
    id: "design",
    name: "Design",
    tagline: "Where ideas get beautiful",
    description:
      "Master Figma, Illustrator and Photoshop while learning the fundamentals of layout, colour and type.",
    emoji: "🎨",
    icon: "palette",
    color: "#ec4899",
    gradient: ["#ec4899", "#8b5cf6"],
    topics: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "UI/UX",
      "Graphic design",
      "Design challenges",
    ],
    units: [
      {
        id: "design-foundations",
        title: "Design Foundations",
        description: "Colour, typography, spacing and visual hierarchy.",
      },
      {
        id: "figma",
        title: "Figma",
        description: "Frames, components, auto layout and prototypes.",
      },
      {
        id: "adobe",
        title: "Adobe Illustrator & Photoshop",
        description: "Vectors, layers, masks and poster design.",
      },
      {
        id: "design-challenges",
        title: "Design Challenges",
        description: "Real briefs you can submit to the community gallery.",
      },
    ],
    learnerCount: 15230,
    rating: 4.8,
    featured: true,
  },
  {
    id: "history",
    name: "History",
    tagline: "Understand yesterday",
    description:
      "Walk through Indonesian and world history with interactive timelines, sources and stories that stick.",
    emoji: "🏛️",
    icon: "landmark",
    color: "#f59e0b",
    gradient: ["#f59e0b", "#ef4444"],
    topics: [
      "Indonesian History",
      "World History",
      "Ancient Civilizations",
      "Historical figures",
      "Historical events",
    ],
    units: [
      {
        id: "indonesian-history",
        title: "Indonesian History",
        description: "Kingdoms, colonisation, and the road to independence.",
      },
      {
        id: "world-history",
        title: "World History",
        description: "Revolutions, world wars and the modern world.",
      },
      {
        id: "ancient-civilizations",
        title: "Ancient Civilizations",
        description: "Mesopotamia, Egypt, Greece, Rome and Majapahit.",
      },
      {
        id: "historical-figures",
        title: "People Who Changed Things",
        description: "Leaders, inventors and thinkers worth knowing.",
      },
    ],
    learnerCount: 11840,
    rating: 4.7,
    featured: true,
  },
  {
    id: "math",
    name: "Mathematics",
    tagline: "Numbers made intuitive",
    description:
      "Fractions, algebra, geometry and statistics explained visually — then practised with instant feedback.",
    emoji: "➗",
    icon: "sigma",
    color: "#0ea5e9",
    gradient: ["#0ea5e9", "#6366f1"],
    topics: [
      "Arithmetic",
      "Algebra",
      "Geometry",
      "Fractions",
      "Statistics",
      "Problem solving",
    ],
    units: [
      {
        id: "number",
        title: "Number & Arithmetic",
        description: "Place value, operations and mental maths strategies.",
      },
      {
        id: "fractions",
        title: "Fractions & Decimals",
        description: "Compare, add and simplify fractions visually.",
      },
      {
        id: "algebra",
        title: "Algebra",
        description: "Patterns, expressions and solving for x.",
      },
      {
        id: "geometry",
        title: "Geometry",
        description: "Perimeter, area, volume and shape properties.",
      },
      {
        id: "statistics",
        title: "Statistics",
        description: "Averages, charts and reading data honestly.",
      },
    ],
    learnerCount: 20110,
    rating: 4.8,
    featured: true,
  },
  {
    id: "science",
    name: "Science",
    tagline: "Ask better questions",
    description:
      "Biology, physics, chemistry and space — with simulations and experiments you can run today.",
    emoji: "🔬",
    icon: "flask",
    color: "#10b981",
    gradient: ["#10b981", "#22d3ee"],
    topics: [
      "Biology",
      "Physics",
      "Chemistry",
      "Earth & Space",
      "Human Body",
      "Experiments",
    ],
    units: [
      {
        id: "biology",
        title: "Biology",
        description: "Cells, plants, ecosystems and living systems.",
      },
      {
        id: "physics",
        title: "Physics",
        description: "Forces, energy, light and electricity.",
      },
      {
        id: "chemistry",
        title: "Chemistry",
        description: "Atoms, reactions, acids and the periodic table.",
      },
      {
        id: "earth-space",
        title: "Earth & Space",
        description: "Our planet, weather patterns and the solar system.",
      },
      {
        id: "human-body",
        title: "Human Body",
        description: "Heart, lungs, brain and how systems work together.",
      },
    ],
    learnerCount: 21650,
    rating: 4.9,
    featured: true,
  },
  {
    id: "english",
    name: "English",
    tagline: "Say it with confidence",
    description:
      "Grammar, writing and speaking practice with instant feedback on every exercise.",
    emoji: "🇬🇧",
    icon: "languages",
    color: "#8b5cf6",
    gradient: ["#8b5cf6", "#ec4899"],
    topics: [
      "Grammar",
      "Writing",
      "Reading",
      "Vocabulary",
      "Speaking",
      "Comprehension",
    ],
    units: [
      {
        id: "grammar",
        title: "Grammar Core",
        description: "Tenses, sentence structure and punctuation.",
      },
      {
        id: "writing",
        title: "Writing Skills",
        description: "Paragraphs, essays and storytelling.",
      },
      {
        id: "reading",
        title: "Reading & Vocabulary",
        description: "Build fluency with graded texts.",
      },
    ],
    learnerCount: 17490,
    rating: 4.7,
  },
  {
    id: "indonesian",
    name: "Bahasa Indonesia",
    tagline: "Kuasai bahasamu",
    description:
      "Teks, puisi, dan keterampilan berbahasa dengan latihan interaktif setiap bab.",
    emoji: "📖",
    icon: "book",
    color: "#ef4444",
    gradient: ["#ef4444", "#f59e0b"],
    topics: [
      "Teks",
      "Puisi",
      "Tata bahasa",
      "Menulis",
      "Membaca",
      "Presentasi",
    ],
    units: [
      {
        id: "teks",
        title: "Jenis Teks",
        description: "Narasi, deskripsi, eksposisi dan prosedur.",
      },
      {
        id: "sastra",
        title: "Sastra",
        description: "Puisi, cerpen dan majas.",
      },
      {
        id: "keterampilan",
        title: "Keterampilan Berbahasa",
        description: "Menulis terstruktur dan berbicara di depan kelas.",
      },
    ],
    learnerCount: 13270,
    rating: 4.8,
  },
  {
    id: "geography",
    name: "Geography",
    tagline: "Read the planet",
    description:
      "Maps, climate, landscapes and human systems — from rice terraces to megacities.",
    emoji: "🌎",
    icon: "globe",
    color: "#14b8a6",
    gradient: ["#14b8a6", "#3b82f6"],
    topics: [
      "Maps",
      "Climate",
      "Landforms",
      "Population",
      "Natural resources",
      "Sustainability",
    ],
    units: [
      {
        id: "maps",
        title: "Maps & Coordinates",
        description: "Latitude, longitude, scale and reading maps.",
      },
      {
        id: "climate",
        title: "Climate & Weather",
        description: "Seasons, climate zones and extreme weather.",
      },
      {
        id: "human",
        title: "People & Places",
        description: "Cities, migration and using resources wisely.",
      },
    ],
    learnerCount: 9860,
    rating: 4.6,
  },
  {
    id: "general",
    name: "General Knowledge",
    tagline: "Curiosity, rewarded",
    description:
      "Art, music, sport, technology and the random facts that make you the most interesting person in the room.",
    emoji: "🧠",
    icon: "brain",
    color: "#a855f7",
    gradient: ["#a855f7", "#6366f1"],
    topics: [
      "World culture",
      "Art & music",
      "Sport",
      "Technology",
      "Logic puzzles",
      "Current affairs",
    ],
    units: [
      {
        id: "culture",
        title: "World Culture",
        description: "Festivals, food and traditions around the globe.",
      },
      {
        id: "logic",
        title: "Logic & Lateral Thinking",
        description: "Puzzles that train how you think.",
      },
      {
        id: "tech-now",
        title: "Technology Now",
        description: "AI, space missions and inventions shaping your future.",
      },
    ],
    learnerCount: 14310,
    rating: 4.8,
  },
];

export const subjectById = Object.fromEntries(
  subjects.map((subject) => [subject.id, subject]),
) as Record<Subject["id"], Subject>;

export function getSubject(id: string): Subject | undefined {
  return subjectById[id as Subject["id"]];
}

export function getUnit(subjectId: string, unitId: string) {
  return getSubject(subjectId)?.units.find((unit) => unit.id === unitId);
}
