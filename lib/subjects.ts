import {
  BookOpen,
  Code2,
  Cpu,
  FlaskConical,
  Globe2,
  Landmark,
  Languages,
  Palette,
  Sigma,
} from "lucide-react";
import type { Subject } from "./types";

export const subjects: Subject[] = [
  {
    id: "robotics",
    name: "Robotics",
    tagline: "Micro:bit, sensors, LEDs & MakeCode",
    description:
      "Build blinking gadgets, reaction games and smart sensors with the BBC micro:bit.",
    longDescription:
      "Robotics on EduTech starts with the BBC micro:bit — a tiny computer with LEDs, buttons, an accelerometer and radio. You will learn how hardware and software work together, program with MakeCode blocks and JavaScript, and finish by building real interactive gadgets you can show your friends.",
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-600",
    softBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    topics: ["Micro:bit", "LED Matrix", "Sensors", "MakeCode", "Radio"],
    skills: ["Circuits thinking", "Block coding", "Debugging hardware", "Game logic"],
  },
  {
    id: "coding",
    name: "Coding",
    tagline: "Python, JavaScript, HTML & CSS",
    description:
      "From your first print() statement to interactive websites and games.",
    longDescription:
      "Coding is the closest thing to a superpower. Start with Python — the friendliest serious language on Earth — then bring web pages to life with HTML, CSS and JavaScript. Every lesson ends with something you built yourself, running in your browser.",
    icon: Code2,
    gradient: "from-violet-500 to-purple-600",
    softBg: "bg-violet-500/10 dark:bg-violet-400/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    topics: ["Python", "JavaScript", "HTML", "CSS", "Logic"],
    skills: ["Variables & loops", "Functions", "Web pages", "Problem solving"],
  },
  {
    id: "design",
    name: "Design",
    tagline: "Figma, Illustrator, Photoshop & UI/UX",
    description:
      "Design stunning app screens, posters and brands like a professional.",
    longDescription:
      "Great products start with great design. Learn the fundamentals — layout, color, typography — then master industry tools: Figma for interfaces, Illustrator for vectors and Photoshop for images. You will finish with a portfolio of real design work.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-600",
    softBg: "bg-pink-500/10 dark:bg-pink-400/10",
    iconColor: "text-pink-600 dark:text-pink-400",
    topics: ["Figma", "UI/UX", "Illustrator", "Photoshop", "Typography"],
    skills: ["Layout & grids", "Color theory", "Prototyping", "Design critique"],
  },
  {
    id: "history",
    name: "History",
    tagline: "Civilizations, nations & turning points",
    description:
      "Travel from ancient kingdoms to independence movements that shaped our world.",
    longDescription:
      "History is the story of us. Explore ancient civilizations like Mesopotamia and Majapahit, understand Indonesia's journey to independence in 1945, and analyze the world wars that reshaped the globe. Timelines, maps and stories make the past unforgettable.",
    icon: Landmark,
    gradient: "from-amber-500 to-orange-600",
    softBg: "bg-amber-500/10 dark:bg-amber-400/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    topics: ["Ancient Kingdoms", "Colonial Era", "Independence", "World Wars"],
    skills: ["Timelines", "Source analysis", "Cause & effect", "Essay writing"],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    tagline: "Algebra, geometry & statistics",
    description:
      "Turn scary equations into puzzles you actually enjoy solving.",
    longDescription:
      "Math is a language for describing patterns. Master algebra by solving for x, see geometry in the world around you, and use statistics to understand data. Interactive examples and step-by-step strategies make every concept click.",
    icon: Sigma,
    gradient: "from-emerald-500 to-teal-600",
    softBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    topics: ["Algebra", "Geometry", "Fractions", "Statistics"],
    skills: ["Equation solving", "Logical reasoning", "Data reading", "Mental math"],
  },
  {
    id: "science",
    name: "Science",
    tagline: "Biology, physics & chemistry",
    description:
      "Discover cells, forces, reactions and the vast universe beyond.",
    longDescription:
      "Science answers the biggest questions: What are we made of? Why do things move? What is the universe? Run thought experiments, learn the scientific method, and connect classroom concepts to everyday life — from your own cells to the outer planets.",
    icon: FlaskConical,
    gradient: "from-lime-500 to-green-600",
    softBg: "bg-lime-500/10 dark:bg-lime-400/10",
    iconColor: "text-lime-600 dark:text-lime-400",
    topics: ["Biology", "Physics", "Chemistry", "Astronomy"],
    skills: ["Scientific method", "Observation", "Lab safety", "Hypothesis testing"],
  },
  {
    id: "english",
    name: "English",
    tagline: "Grammar, writing & speaking",
    description:
      "Speak confidently, write clearly and master the global language.",
    longDescription:
      "English opens doors to the world's knowledge, entertainment and careers. Build rock-solid grammar, learn to write paragraphs and essays that flow, and practice speaking techniques that make you sound natural and confident.",
    icon: BookOpen,
    gradient: "from-sky-500 to-indigo-600",
    softBg: "bg-sky-500/10 dark:bg-sky-400/10",
    iconColor: "text-sky-600 dark:text-sky-400",
    topics: ["Grammar", "Tenses", "Writing", "Speaking", "Vocabulary"],
    skills: ["Sentence structure", "Essay writing", "Presentation", "Reading comprehension"],
  },
  {
    id: "indonesian",
    name: "Bahasa Indonesia",
    tagline: "Tata bahasa, menulis & sastra",
    description:
      "Kuasai bahasa persatuan: dari kalimat efektif hingga karya sastra.",
    longDescription:
      "Bahasa Indonesia adalah jati diri dan alat persatuan bangsa. Pelajari tata bahasa yang benar, teknik menulis teks deskripsi dan narasi, serta apresiasi sastra Indonesia — dari puisi Chairil Anwar hingga cerpen-cerpen modern.",
    icon: Languages,
    gradient: "from-red-500 to-rose-600",
    softBg: "bg-red-500/10 dark:bg-red-400/10",
    iconColor: "text-red-600 dark:text-red-400",
    topics: ["Tata Bahasa", "Kalimat Efektif", "Menulis", "Puisi", "Cerpen"],
    skills: ["Ejaan (EYD)", "Paragraf", "Meringkas", "Apresiasi sastra"],
  },
  {
    id: "geography",
    name: "Geography",
    tagline: "Maps, climate & the archipelago",
    description:
      "Read maps, understand climates and explore Indonesia's 17,000 islands.",
    longDescription:
      "Geography connects people and places. Learn to read topographic maps, understand how climate and seasons work, and dive deep into the geography of Indonesia — the world's largest archipelago, sitting on the Ring of Fire.",
    icon: Globe2,
    gradient: "from-teal-500 to-cyan-600",
    softBg: "bg-teal-500/10 dark:bg-teal-400/10",
    iconColor: "text-teal-600 dark:text-teal-400",
    topics: ["Maps", "Climate", "Tectonics", "Indonesia", "Environment"],
    skills: ["Map reading", "Coordinates", "Data interpretation", "Field observation"],
  },
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
