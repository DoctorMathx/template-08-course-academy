import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  { id: "t1", quote: "The most rigorous product course I've done. I was a senior PM before this — I still learned something new every week.", name: "Nkechi Umeh", role: "Senior PM, Paystack", rating: 5, courseId: "c-flagship" },
  { id: "t2", quote: "Two weeks in and my team is already asking what I've been reading. That's a real endorsement.", name: "Femi Adeyemi", role: "Engineering manager", rating: 5, courseId: "c-leadership" },
  { id: "t3", quote: "I finally understand my own business's numbers. This should be taught in every SME workshop.", name: "Aisha Bello", role: "Founder, small studio", rating: 5, courseId: "c-business" },
  { id: "t4", quote: "The instructor is calm, senior, and genuinely helpful. It's the opposite of course-hell.", name: "David Nnamdi", role: "Product designer", rating: 5, courseId: "c-design" },
  { id: "t5", quote: "I passed my staff interview a month after finishing this course. Direct causation.", name: "Grace Ojo", role: "Staff engineer", rating: 5, courseId: "c-engineering" },
  { id: "t6", quote: "My writing at work is different now. My CEO literally said the last memo was 'a joy to read'.", name: "Kunle Yusuf", role: "Product manager", rating: 5, courseId: "c-writing" },
];

export const proofStats = [
  { label: "Students", value: "12,400+" },
  { label: "Countries", value: "41" },
  { label: "Completion rate", value: "82%" },
  { label: "Avg. rating", value: "4.9" },
];
