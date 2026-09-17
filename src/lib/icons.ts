import {
  BookOpen,
  Brain,
  Code2,
  Cpu,
  FlaskConical,
  Globe2,
  Languages,
  Landmark,
  Palette,
  Sigma,
  type LucideIcon,
} from "lucide-react";

/** Subject icon names stored in data → real Lucide components. */
export const subjectIcons: Record<string, LucideIcon> = {
  cpu: Cpu,
  code: Code2,
  palette: Palette,
  landmark: Landmark,
  sigma: Sigma,
  flask: FlaskConical,
  languages: Languages,
  book: BookOpen,
  globe: Globe2,
  brain: Brain,
};

export function getSubjectIcon(name: string): LucideIcon {
  return subjectIcons[name] ?? BookOpen;
}
