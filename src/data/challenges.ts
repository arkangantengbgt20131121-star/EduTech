import type { Challenge, LeaderboardEntry } from "./types";

/** Challenge system — weekly briefs, monthly builds and community events. */
export const challenges: Challenge[] = [
  {
    id: "weekly-reaction-game",
    title: "Create a Micro:bit reaction game",
    blurb:
      "Build a game that measures how fast a player reacts — and settle who has the fastest reflexes in your class.",
    type: "Weekly",
    difficulty: 3,
    xp: 250,
    badgeId: "robot-builder",
    deadline: "Sunday, 23:59",
    requirements: [
      "A random delay between the start and the signal",
      "Measures reaction time in milliseconds and displays it",
      "Handles presses that happen too early",
      "Keeps a personal best score",
      "Include a photo or video of your board running",
    ],
    hints: [
      "Use `input.runningTime()` to measure milliseconds precisely.",
      "A random delay between 2 and 5 seconds makes the game fair.",
      "Show a clear 'get ready' state so players know the game has started.",
      "Test 20 rounds yourself first — bugs show up faster than you expect.",
    ],
    subjectId: "robotics",
    emoji: "⚡",
    participants: 1284,
    gradient: ["#f97316", "#ef4444"],
    status: "active",
  },
  {
    id: "monthly-app-redesign",
    title: "Redesign a school app screen",
    blurb:
      "Take one screen from any app your school uses and redesign it to be clearer, faster and friendlier for students.",
    type: "Monthly",
    difficulty: 4,
    xp: 400,
    badgeId: "design-master",
    deadline: "30 September",
    requirements: [
      "Show the original screen and your redesign side by side",
      "Explain three specific problems with the original",
      "Use components and auto layout",
      "Include a short written rationale (max 150 words)",
    ],
    hints: [
      "Start by writing down what the screen is supposed to help people do.",
      "Check contrast ratios — accessibility is part of good design.",
      "Test your redesign on a phone screen at actual size before submitting.",
    ],
    subjectId: "design",
    emoji: "📱",
    participants: 842,
    gradient: ["#ec4899", "#8b5cf6"],
    status: "active",
  },
  {
    id: "weekly-python-pattern",
    title: "Print a pattern with nested loops",
    blurb:
      "Write the shortest Python program that prints a pyramid of stars for any height the user types.",
    type: "Weekly",
    difficulty: 2,
    xp: 180,
    badgeId: "code-explorer",
    deadline: "Sunday, 23:59",
    requirements: [
      "Ask the user for the height",
      "Use nested loops",
      "Handle heights from 1 to 20",
      "Print nothing but the pyramid (no extra text)",
    ],
    hints: [
      "Each row has a number of spaces equal to (height − row).",
      "In Python you can multiply strings: ' ' * 3 gives three spaces.",
      "Check edge cases: height 1 and height 20.",
    ],
    subjectId: "coding",
    emoji: "⭐",
    participants: 2105,
    gradient: ["#6366f1", "#22d3ee"],
    status: "active",
  },
  {
    id: "community-science-question",
    title: "Answer a real science question",
    blurb:
      "Design and run an experiment that answers a question about your own environment — then share your method.",
    type: "Community",
    difficulty: 3,
    xp: 220,
    deadline: "15 October",
    requirements: [
      "State a testable question",
      "Describe your method and controls",
      "Present your data in at least one chart",
      "State one limitation of your experiment",
    ],
    hints: [
      "Good questions are specific: 'Does the north side of the building stay cooler?' beats 'Is our school hot?'",
      "Take three measurements per condition to spot errors.",
      "Being honest about limitations makes your work more scientific, not less.",
    ],
    subjectId: "science",
    emoji: "🔬",
    participants: 967,
    gradient: ["#10b981", "#22d3ee"],
    status: "active",
  },
  {
    id: "weekly-math-mental",
    title: "Mental maths sprint: beat 60 seconds",
    blurb:
      "Solve 20 mixed arithmetic problems in under a minute using mental strategies, not written working.",
    type: "Weekly",
    difficulty: 1,
    xp: 120,
    deadline: "Sunday, 23:59",
    requirements: [
      "Complete the EduTech mental maths set",
      "Score at least 18 out of 20",
      "Write down the strategy you used most often",
    ],
    hints: [
      "Compensation: 47 + 38 is 47 + 40 − 2 = 85.",
      "Doubling and halving turns 25 × 16 into 50 × 8 = 400.",
      "Partition: 63 + 29 = 60 + 20 + 3 + 9.",
    ],
    subjectId: "math",
    emoji: "🧮",
    participants: 3140,
    gradient: ["#0ea5e9", "#6366f1"],
    status: "active",
  },
  {
    id: "upcoming-museum-explainer",
    title: "Explain a museum object in 60 seconds",
    blurb:
      "Choose an object from any Indonesian museum collection and explain its story in a one-minute video.",
    type: "Monthly",
    difficulty: 2,
    xp: 200,
    deadline: "Opens 1 October",
    requirements: [
      "60-second video or written script",
      "At least two sources cited",
      "Explain why the object matters today",
    ],
    hints: [
      "Start with a surprising detail, not a date.",
      "Primary sources (photographs, letters) make your story stand out.",
    ],
    subjectId: "history",
    emoji: "🏛️",
    participants: 0,
    gradient: ["#f59e0b", "#ef4444"],
    status: "upcoming",
  },
];

export const challengeById = Object.fromEntries(
  challenges.map((challenge) => [challenge.id, challenge]),
);

export function getChallenge(id: string) {
  return challengeById[id];
}

export const activeChallenge = challenges[0];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Nadia R.", avatarEmoji: "🦊", xp: 4820, streak: 34 },
  { rank: 2, name: "Kevin T.", avatarEmoji: "🐼", xp: 4610, streak: 28 },
  { rank: 3, name: "Alya S.", avatarEmoji: "🦋", xp: 4380, streak: 31 },
  { rank: 4, name: "Bagas W.", avatarEmoji: "🐯", xp: 3990, streak: 19 },
  { rank: 5, name: "Sinta M.", avatarEmoji: "🦉", xp: 3720, streak: 22 },
  { rank: 6, name: "Rafi A.", avatarEmoji: "🐙", xp: 3410, streak: 14 },
  { rank: 7, name: "You", avatarEmoji: "🚀", xp: 2870, streak: 12, isCurrentUser: true },
  { rank: 8, name: "Dewi K.", avatarEmoji: "🐢", xp: 2640, streak: 9 },
  { rank: 9, name: "Hendra P.", avatarEmoji: "🦁", xp: 2410, streak: 7 },
  { rank: 10, name: "Laras D.", avatarEmoji: "🐨", xp: 2180, streak: 11 },
];

export const challengeStats = {
  activeCount: challenges.filter((challenge) => challenge.status === "active").length,
  totalParticipants: challenges.reduce((total, challenge) => total + challenge.participants, 0),
  xpAvailable: challenges
    .filter((challenge) => challenge.status !== "closed")
    .reduce((total, challenge) => total + challenge.xp, 0),
};
