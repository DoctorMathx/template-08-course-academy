import type { Metadata } from "next";
import { Suspense } from "react";
import { CoursesIndex } from "./courses-index";

export const metadata: Metadata = {
  title: "All courses",
  description: "Every course from Ladipo Academy — from short craft courses to live cohorts.",
};

export default function CoursesPage() {
  return <Suspense fallback={null}><CoursesIndex /></Suspense>;
}
