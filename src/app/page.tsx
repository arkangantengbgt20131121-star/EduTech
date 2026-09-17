import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import {
  CategoryGrid,
  FeaturedProjects,
  FinalCta,
  GamificationShowcase,
  HowItWorks,
  PopularLessons,
  WeeklyChallengeSection,
} from "@/components/home/sections";
import { InteractiveShowcase } from "@/components/home/showcase";

export const metadata: Metadata = {
  title: "EduTech — Learn. Create. Build the Future.",
  description:
    "Interactive lessons in robotics, coding, design, science, maths and history for students aged 10–18. Write real Python, program a Micro:bit and design in the browser.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <PopularLessons />
      <InteractiveShowcase />
      <FeaturedProjects />
      <WeeklyChallengeSection />
      <HowItWorks />
      <GamificationShowcase />
      <FinalCta />
    </>
  );
}
