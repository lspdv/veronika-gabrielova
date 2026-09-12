/**
 * Single place for facts about Veronika  -  edit here, not in components.
 * All visible copy lives in ./translations.ts.
 */

export const site = {
  name: "Veronika Gabrielová",
  linkedin: "https://www.linkedin.com/in/veronika-gabrielova/",
  location: "Praha / remote",

  /** First frontend job (MSD, Jan 2017). Years of experience are derived from this every Jan 1. */
  careerStartYear: 2017,

  /** Hourly rate in CZK, excl. VAT. TODO: confirm the number. */
  hourlyRateCzk: 1200,
  vatRatePct: 21,

  /** Registry data (ARES, 2018-09-12, active VAT payer). Address is public in ARES  -  not shown on the site. */
  business: {
    ico: "07456484",
    dic: "CZ9256082528",
  },
} as const;

export type WorkItem = {
  id: string;
  url: string;
  image: string;
  /** translation keys */
  titleKey: string;
  descKey: string;
  tagKeys: string[];
  stack: string[];
};

export const work: WorkItem[] = [
  {
    id: "saltedsoul",
    url: "https://saltedsoul.eu/",
    image: "/work/saltedsoul.jpg",
    titleKey: "work.saltedsoul.title",
    descKey: "work.saltedsoul.desc",
    tagKeys: ["work.tag.business", "work.tag.multilang", "work.tag.seo"],
    stack: ["React", "Vite", "Tailwind", "i18n", "Netlify"],
  },
  {
    id: "casa-la-paz",
    url: "https://casa-la-paz.netlify.app/",
    image: "/work/casa-la-paz.jpg",
    titleKey: "work.casalapaz.title",
    descKey: "work.casalapaz.desc",
    tagKeys: ["work.tag.business", "work.tag.booking"],
    stack: ["React", "Vite", "Tailwind", "Netlify"],
  },
  {
    id: "vladokniz",
    url: "https://vladokniz.netlify.app/",
    image: "/work/vladokniz.jpg",
    titleKey: "work.vladokniz.title",
    descKey: "work.vladokniz.desc",
    tagKeys: ["work.tag.portfolio", "work.tag.cms", "work.tag.multilang"],
    stack: ["React", "TypeScript", "Netlify Functions", "Netlify Blobs"],
  },
  {
    id: "barborasika",
    url: "https://barborasika.cz/",
    image: "/work/barborasika.jpg",
    titleKey: "work.barborasika.title",
    descKey: "work.barborasika.desc",
    tagKeys: ["work.tag.portfolio", "work.tag.teaser"],
    stack: ["React", "Vite", "Tailwind"],
  },
];

export type ExperienceItem = {
  id: string;
  company: string;
  url?: string;
  period: string;
  roleKey: string;
  descKey: string;
  stack: string[];
  highlight?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    id: "backbone",
    company: "BACKBONE",
    url: "https://www.backbone.cz",
    period: "2022 – now",
    roleKey: "exp.backbone.role",
    descKey: "exp.backbone.desc",
    stack: ["React", "TypeScript", "Design system", "Feature flags"],
    highlight: true,
  },
  {
    id: "aimful",
    company: "Aimful",
    period: "2021 – 2023",
    roleKey: "exp.aimful.role",
    descKey: "exp.aimful.desc",
    stack: ["React", "TypeScript", "MS Teams app", "Chrome extension", "Google Calendar API"],
    highlight: true,
  },
  {
    id: "productboard-em",
    company: "Productboard",
    url: "https://www.productboard.com",
    period: "2020 – 2021",
    roleKey: "exp.productboardEm.role",
    descKey: "exp.productboardEm.desc",
    stack: ["Team building", "Onboarding", "Hiring", "Support"],
  },
  {
    id: "productboard-dev",
    company: "Productboard",
    url: "https://www.productboard.com",
    period: "2018 – 2021",
    roleKey: "exp.productboardDev.role",
    descKey: "exp.productboardDev.desc",
    stack: ["React", "TypeScript", "Core UI", "Design system"],
    highlight: true,
  },
  {
    id: "kiwi",
    company: "Kiwi.com",
    url: "https://www.kiwi.com",
    period: "2018",
    roleKey: "exp.kiwi.role",
    descKey: "exp.kiwi.desc",
    stack: ["Next.js", "React", "Flow", "GraphQL"],
  },
  {
    id: "msd",
    company: "MSD IT",
    period: "2017 – 2018",
    roleKey: "exp.msd.role",
    descKey: "exp.msd.desc",
    stack: ["React", "TypeScript", "Intranet"],
  },
];

/** Mentoring, community & teaching  -  shown as a second timeline under Experience. */
export const volunteering: ExperienceItem[] = [
  {
    id: "reactgirls",
    company: "ReactGirls",
    url: "https://reactgirls.com",
    period: "2020 – 2023",
    roleKey: "vol.reactgirls.role",
    descKey: "vol.reactgirls.desc",
    stack: ["Mentoring", "React", "TypeScript", "DX"],
    highlight: true,
  },
  {
    id: "msd-js-academy",
    company: "MSD IT",
    period: "2017 – 2018",
    roleKey: "vol.jsAcademy.role",
    descKey: "vol.jsAcademy.desc",
    stack: ["JavaScript", "Coaching", "Curriculum", "Community"],
    highlight: true,
  },
  {
    id: "msd-scratch",
    company: "MSD IT",
    period: "2017 – 2018",
    roleKey: "vol.scratch.role",
    descKey: "vol.scratch.desc",
    stack: ["Scratch", "Kids", "Teaching"],
  },
  {
    id: "pyladies",
    company: "PyLadies",
    url: "https://pyladies.cz",
    period: "2016 – 2019",
    roleKey: "vol.pyladies.role",
    descKey: "vol.pyladies.desc",
    stack: ["Python", "Mentoring", "Community", "Event organizing"],
    highlight: true,
  },
];

export type SoftSkill = {
  /** translation key prefix: `${key}.name`, `${key}.desc` */
  key: string;
  /** 0–100, rendered as a pixel stat bar */
  level: number;
  emoji: string;
};

export const softSkills: SoftSkill[] = [
  { key: "soft.vibe", level: 99, emoji: "🦜" },
  { key: "soft.translate", level: 95, emoji: "🔁" },
  { key: "soft.learn", level: 93, emoji: "🧠" },
  { key: "soft.mentor", level: 92, emoji: "🌱" },
  { key: "soft.product", level: 90, emoji: "🧭" },
  { key: "soft.no", level: 88, emoji: "🙅‍♀️" },
  { key: "soft.async", level: 87, emoji: "✍️" },
  { key: "soft.calm", level: 85, emoji: "🧊" },
];

export type SkillGroup = { titleKey: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    titleKey: "stack.frontend",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Vite",
      "Tailwind",
      "CSS / Sass",
      "REST APIs",
      "React Query",
      "Testing Library",
      "Accessibility",
      "i18n",
    ],
  },
  {
    titleKey: "stack.product",
    items: [
      "Design systems",
      "Figma",
      "Product discovery",
      "Feature flags",
      "Analytics",
      "A/B tests",
      "Store approvals (Chrome, Teams)",
    ],
  },
  {
    titleKey: "stack.platforms",
    items: [
      "Chrome extensions",
      "MS Teams apps",
      "Google Calendar API",
      "Netlify + Functions",
      "PostgreSQL / SQL",
      "AWS (S3, Lambda, EC2)",
      "GitHub Actions",
      "WordPress / Webflow / Wix / Shopify",
    ],
  },
];

export type Slackmoji = {
  emoji: string;
  name: string;
  anim: "bounce" | "shake" | "spin" | "party" | "melt";
  count: number;
};

export const slackmojis: Slackmoji[] = [
  { emoji: "🦜", name: "party-parrot", anim: "party", count: 128 },
  { emoji: "🚀", name: "ship-it", anim: "bounce", count: 64 },
  { emoji: "🔥", name: "this-is-fine", anim: "shake", count: 42 },
  { emoji: "🐝", name: "bee-happy", anim: "bounce", count: 77 },
  { emoji: "🍯", name: "honey", anim: "melt", count: 23 },
  { emoji: "👀", name: "eyes-on-pr", anim: "shake", count: 99 },
  { emoji: "✅", name: "approved", anim: "bounce", count: 256 },
  { emoji: "🫠", name: "melting", anim: "melt", count: 31 },
  { emoji: "🎉", name: "deployed-on-friday", anim: "party", count: 13 },
  { emoji: "🐈", name: "nyan", anim: "bounce", count: 88 },
  { emoji: "🧹", name: "refactor-time", anim: "shake", count: 17 },
  { emoji: "☕", name: "standup-coffee", anim: "melt", count: 61 },
  { emoji: "🌀", name: "loading", anim: "spin", count: 404 },
  { emoji: "🦆", name: "rubber-duck", anim: "bounce", count: 52 },
];
