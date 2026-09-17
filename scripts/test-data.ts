/**
 * Content integrity test.
 *
 * Guards the demo catalogue the same way a real CMS would: every lesson must
 * point at a real unit, every published lesson needs a usable quiz, every
 * widget id must exist, and the documented example searches must return hits.
 *
 * Run with:  npm run test:data
 */
import {
  allLessons,
  challenges,
  courseProgress,
  getBadge,
  getSubject,
  getUnit,
  lessonById,
  projects,
  publishedLessons,
  recommendedLessonIds,
  searchCatalog,
  subjects,
} from "../src/data/index";

const problems: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) problems.push(message);
};

/* ------------------------------- Subjects -------------------------------- */

check(subjects.length === 10, `expected 10 subjects, found ${subjects.length}`);
for (const subject of subjects) {
  check(subject.units.length >= 3, `${subject.id}: expected at least 3 units`);
  check(Boolean(getSubject(subject.id)), `${subject.id}: getSubject() returned nothing`);
}

/* -------------------------------- Lessons -------------------------------- */

const widgetIds = ["playground", "microbit", "fractionLab", "timeline", "designCanvas", "solarSystem"];
const blockTypes = new Set([
  "text",
  "callout",
  "code",
  "list",
  "steps",
  "table",
  "compare",
  "keyTerms",
  "diagram",
  "figure",
  "widget",
  "quote",
]);

for (const lesson of allLessons) {
  const subject = getSubject(lesson.subjectId);
  if (!subject) {
    problems.push(`${lesson.id}: unknown subject ${lesson.subjectId}`);
    continue;
  }
  check(
    Boolean(getUnit(lesson.subjectId, lesson.unitId)),
    `${lesson.id}: unit "${lesson.unitId}" is not part of ${lesson.subjectId}`,
  );
  check(lesson.objectives.length >= 2, `${lesson.id}: needs at least 2 objectives`);
  check(lesson.xp > 0 && lesson.minutes > 0, `${lesson.id}: xp/minutes must be positive`);

  if (lesson.comingSoon) {
    check(lesson.blocks.length === 0, `${lesson.id}: roadmap lessons should not ship blocks yet`);
    continue;
  }

  check(lesson.blocks.length >= 5, `${lesson.id}: only ${lesson.blocks.length} blocks`);
  check(lesson.quiz.length >= 3, `${lesson.id}: only ${lesson.quiz.length} quiz questions`);

  for (const block of lesson.blocks) {
    check(blockTypes.has(block.type), `${lesson.id}: unknown block type "${block.type}"`);
    if (block.type === "widget") {
      check(widgetIds.includes(block.widget), `${lesson.id}: unknown widget "${block.widget}"`);
    }
  }

  const quizIds = new Set<string>();
  for (const question of lesson.quiz) {
    check(!quizIds.has(question.id), `${lesson.id}: duplicate question id ${question.id}`);
    quizIds.add(question.id);
    check(question.explanation.length > 15, `${lesson.id}/${question.id}: missing explanation`);
    check(question.points > 0, `${lesson.id}/${question.id}: points must be positive`);
    if (question.type === "multipleChoice") {
      check(question.options.length >= 3, `${lesson.id}/${question.id}: needs 3+ options`);
      check(
        question.answer >= 0 && question.answer < question.options.length,
        `${lesson.id}/${question.id}: answer index out of range`,
      );
    }
    if (question.type === "matching") {
      check(question.pairs.length >= 3, `${lesson.id}/${question.id}: needs 3+ pairs`);
      const rightValues = question.pairs.map((pair) => pair.right);
      check(
        new Set(rightValues).size === rightValues.length,
        `${lesson.id}/${question.id}: duplicate right-hand values break matching`,
      );
    }
    if (question.type === "fillBlank") {
      check(question.answer.length >= 1, `${lesson.id}/${question.id}: needs an accepted answer`);
    }
  }
}

check(publishedLessons.length >= 30, `expected 30+ published lessons, found ${publishedLessons.length}`);

/* ------------------------------- Progress -------------------------------- */

for (const course of courseProgress) {
  check(Boolean(lessonById[course.lessonId]), `courseProgress points at missing lesson ${course.lessonId}`);
  check(course.progress > 0 && course.progress <= 100, `${course.lessonId}: progress must be 1-100`);
}
for (const id of recommendedLessonIds) {
  check(Boolean(lessonById[id]), `recommendedLessons points at missing lesson ${id}`);
}

/* ------------------------------- Projects -------------------------------- */

for (const project of projects) {
  check(Boolean(getSubject(project.subjectId)), `${project.id}: unknown subject`);
  check(project.steps.length >= 3, `${project.id}: needs 3+ steps`);
  check(project.materials.length >= 1, `${project.id}: needs materials`);
  check(project.skills.length >= 2, `${project.id}: needs 2+ skills`);
}

/* ------------------------------ Challenges ------------------------------- */

for (const challenge of challenges) {
  check(Boolean(getSubject(challenge.subjectId)), `${challenge.id}: unknown subject`);
  check(challenge.requirements.length >= 3, `${challenge.id}: needs 3+ requirements`);
  check(challenge.hints.length >= 2, `${challenge.id}: needs 2+ hints`);
  if (challenge.badgeId) {
    check(Boolean(getBadge(challenge.badgeId)), `${challenge.id}: unknown badge ${challenge.badgeId}`);
  }
}

/* --------------------------------- Search -------------------------------- */

const exampleQueries = ["Python loops", "Micro:bit sensors", "World War II", "Fractions", "Figma components"];
const groupsSeen = new Set<string>();
for (const query of exampleQueries) {
  const results = searchCatalog(query, 18);
  check(results.length > 0, `search "${query}" returned nothing`);
  for (const result of results) groupsSeen.add(result.group);
}
check(
  groupsSeen.size === 4,
  `example searches should cover all four groups, saw: ${[...groupsSeen].sort().join(", ")}`,
);

/* --------------------------------- Report -------------------------------- */

if (problems.length) {
  console.error(`${problems.length} content problem(s):`);
  for (const problem of problems) console.error(` - ${problem}`);
  process.exit(1);
}

console.log(
  `data ok · ${subjects.length} subjects · ${publishedLessons.length} published lessons · ${projects.length} projects · ${challenges.length} challenges`,
);
