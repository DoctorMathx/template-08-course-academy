export type CourseLevel = "beginner" | "intermediate" | "advanced" | "all-levels";
export type CourseFormat = "self-paced" | "live-cohort" | "hybrid";
export type CourseCategory = "business" | "product" | "design" | "writing" | "engineering" | "leadership";

export type Course = {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  format: CourseFormat;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  compareAtPrice?: number;
  cover: string;
  gallery?: string[];
  badge?: "bestseller" | "new" | "live";
  rating?: number;
  studentCount?: number;
  duration: string;
  totalLessons: number;
  level: CourseLevel;
  instructor: string;
  featured?: boolean;
  flagship?: boolean;
  outcomes: string[];
  requirements?: string[];
  whoFor: string[];
  modules: { title: string; lessons: { title: string; duration?: string; preview?: boolean }[]; duration?: string }[];
  includes: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  courseId?: string;
  rating?: number;
};

export type Faq = { id: string; question: string; answer: string; topic?: string };

export type NavItem = { label: string; href?: string; children?: { label: string; href: string; description?: string }[] };
