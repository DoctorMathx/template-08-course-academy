# Ladipo Academy — Template 08

A premium FinStore template for **online course creators and academies**. One focused catalog with support for self-paced courses, live cohorts, and hybrid programs.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.
Design: **Fraunces** (editorial serif display) + **Inter** (body). Warm cream + scholarly emerald accent.

## Pages

`/` Home · `/courses` All courses · `/courses/[slug]` Course detail (with curriculum, instructor, pricing) · `/about` · `/contact` · `/faq` · `/checkout` · `/thank-you`

## Customise

- **Brand & instructor** → `lib/site-config.ts`
- **Courses** → `mock/products.ts`
- **Testimonials** → `mock/testimonials.ts`
- **FAQs** → `mock/faqs.ts`
- **Nav** → `mock/navigation.ts`
- **Design tokens** → `app/globals.css` (`:root` custom properties)

## Run

```bash
npm install
npm run dev
```
