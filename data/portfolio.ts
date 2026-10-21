import projectFile from "./projects.json";

export const profile = {
  name: "Shaqlin Mondal",
  role: "PHP Laravel Developer",
  level: "PHP Laravel Developer",
  location: "Kolkata, West Bengal",
  email: "shaqlinmondal8905@gmail.com",
  phone: "+91 8597148785",
  phoneHref: "tel:+918597148785",
  years: "2.5+",
  cv: "/Shaqlin_Mondal_Resume.pdf",
  github: "https://github.com/ShaqlinMondal-creater",
  linkedin: "https://www.linkedin.com/in/shaqlin2021",
  instagram: "https://www.instagram.com/shaqlin_/",
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Instagram", href: profile.instagram },
];

export const liveSites = [
  { name: "Liwaas", domain: "liwaas.com", url: "https://liwaas.com", stack: "Laravel · Razorpay" },
  { name: "Saifee School", domain: "saifeeschool.in", url: "https://www.saifeeschool.in", stack: "Laravel · MySQL" },
  { name: "Haneri", domain: "haneri.com", url: "https://haneri.com", stack: "Laravel · Razorpay" },
  { name: "Stockout", domain: "stockoutindia.com", url: "https://stockoutindia.com", stack: "Laravel · REST API" },
  { name: "Smart Quote", domain: "smartquote-pi.vercel.app", url: "https://smartquote-pi.vercel.app", stack: "React · Laravel" },
  { name: "TBL Industrial", domain: "tblindustrial.com", url: "https://tblindustrial.com", stack: "PHP" },
  { name: "Safe Technical India", domain: "safetechnicalindia.in", url: "https://www.safetechnicalindia.in", stack: "WordPress" },
];

export const capabilities = [
  {
    label: "E-commerce",
    meta: "Laravel",
    title: "Stores that take payments",
    body: "Laravel stores with Razorpay payments. Liwaas, Haneri, Stockout.",
    tone: "dark",
    art: "radial-gradient(70% 55% at 50% 38%, rgba(192,132,252,0.75), transparent 70%), linear-gradient(170deg, #2a1150, #110822)",
  },
  {
    label: "WooCommerce",
    meta: "WordPress",
    title: "Company product sites",
    body: "Product catalogue websites for businesses, including Frosty Business, Anhussanally, and Alamdar International.",
    tone: "dark",
    art: "radial-gradient(60% 50% at 62% 52%, rgba(251,191,36,0.55), transparent 70%), linear-gradient(170deg, #2d1c0c, #120b06)",
  },
  {
    label: "APIs",
    meta: "REST",
    title: "REST APIs",
    body: "Laravel endpoints between the front end and the back end.",
    tone: "dark",
    art: "radial-gradient(65% 55% at 40% 34%, rgba(52,211,153,0.5), transparent 70%), linear-gradient(170deg, #0d2b22, #07130f)",
  },
  {
    label: "Data",
    meta: "MySQL",
    title: "MySQL schemas",
    body: "Database design, plus Excel and CSV import and export.",
    tone: "dark",
    art: "repeating-linear-gradient(115deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 14px), linear-gradient(160deg, #c7d2fe 0%, #6366f1 46%, #1e1b4b 100%)",
  },
  {
    label: "Portals",
    meta: "Saifee School",
    title: "Institution portals",
    body: "Admin panel, student profiles, report cards, admit cards, payment setup, and a public admission process.",
    tone: "light",
    art: "conic-gradient(from 210deg at 50% 42%, #fafafa, #a1a1aa, #f4f4f5, #71717a, #e4e4e7, #fafafa)",
  },
  {
    label: "Company sites",
    meta: "WordPress",
    title: "Company sites",
    body: "Company websites with services and contact pages, including Fluidtech, Topgrip, and TBL Industrial.",
    tone: "dark",
    art: "radial-gradient(60% 50% at 55% 45%, rgba(45,212,191,0.45), transparent 70%), linear-gradient(170deg, #0f2c33, #081417)",
  },
  {
    label: "Interfaces",
    meta: "Tailwind",
    title: "Responsive interfaces",
    body: "Layouts in Tailwind CSS that work from phone to desktop.",
    tone: "dark",
    art: "radial-gradient(60% 50% at 45% 55%, rgba(244,114,182,0.5), transparent 70%), linear-gradient(170deg, #3a0f2a, #1a0713)",
  },
  {
    label: "SaaS",
    meta: "Laravel",
    title: "SaaS and admin panels",
    body: "Quotation, sales order, and invoice panels, plus SaaS products like Smart Quote and BhuriBhoj. Laravel, React, MySQL.",
    tone: "dark",
    art: "radial-gradient(65% 55% at 48% 36%, rgba(129,140,248,0.65), transparent 70%), linear-gradient(170deg, #1e1b4b, #0c0a24)",
  },
] as const;

export const marqueeWords = ["Laravel", "PHP", "MySQL", "Tailwind CSS", "React", "REST APIs", "Razorpay"];

export const stats = [
  { value: 25, decimals: 0, suffix: "+", label: "Projects built" },
  { value: 2.5, decimals: 1, suffix: "+", label: "Years shipping" },
  { value: 4, decimals: 0, suffix: "", label: "Companies" },
];

export const roles = [
  {
    title: "PHP Developer",
    company: "Dotcom Solutions",
    place: "Kolkata",
    dates: "July 2024 — Present",
    current: true,
    points: [
      "Building Laravel applications that stay maintainable as they grow.",
      "Connecting front ends and back ends with REST APIs.",
      "Designing MySQL schemas and keeping queries fast.",
      "Laying out responsive interfaces with Tailwind CSS.",
      "Maintaining Core PHP and Laravel sites already in production.",
      "Building Laravel e-commerce stores with Razorpay payments and product management.",
      "Building admin panels for quotation, sales order, and sales invoice generation with Laravel, React, and MySQL.",
      "Moving data between Excel, CSV, and the database.",
      "Keeping PHP secure, readable, and fast.",
    ],
  },
  {
    title: "Industrial Internship · PHP & WordPress",
    company: "Euphoria GenX",
    place: "Kolkata",
    dates: "September 2023 — April 2024",
    current: false,
    points: [
      "Learned core PHP, including functions and object-oriented programming.",
      "Customized WordPress themes and worked with plugins.",
      "Ran MySQL CRUD through PHP and WordPress.",
      "Connected HTML forms to PHP on small projects.",
    ],
  },
  {
    title: "Intern · Back End Developer",
    company: "The Bengal Studio",
    place: "Kolkata",
    dates: "August 2023 — October 2023",
    current: false,
    points: [
      "Worked as a PHP backend developer intern on a real project.",
      "Used PHP and MySQL and managed databases with phpMyAdmin.",
    ],
  },
  {
    title: "Intern · MEAN Stack Developer",
    company: "BASSETTI ITES PVT. LTD",
    place: "Kolkata",
    dates: "September 2022 — January 2023",
    current: false,
    points: [
      "Learned the MEAN stack: MongoDB, Express.js, Angular, and Node.js.",
      "Built CRUD applications with Node.js and Express.js.",
      "Studied JavaScript ES6+ and asynchronous programming.",
    ],
  },
  {
    title: "Self learner",
    company: "Independent",
    place: "Remote",
    dates: "Foundations",
    current: false,
    points: [
      "Started through self-study and online tutorials.",
      "Learned HTML and CSS for structured, styled pages.",
      "Learned JavaScript for interactive front-end logic.",
      "Built an OOP base with Core Java and C#.",
      "Picked up the basics of React and component-based UI.",
    ],
  },
];

export const education = [
  {
    title: "B.Tech, Electronics & Communication Engineering",
    school: "Maulana Abul Kalam Azad University of Technology, GMIT, Kolkata",
    dates: "2019 — 2023",
    note: "CGPA 8.48",
  },
  {
    title: "Higher Secondary",
    school: "Dighirparh High Madrasah, Galsi, Burdwan",
    dates: "2017 — 2019",
  },
  {
    title: "Secondary",
    school: "Memari V.M Institution, Memari, Burdwan",
    dates: "2013 — 2017",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    hue: "#a78bfa",
    items: [
      ["PHP", "Strong"],
      ["JavaScript", "Good"],
      ["TypeScript", "Intermediate"],
      ["HTML / CSS", "Strong"],
      ["MySQL", "Strong"],
      ["C# / Java", "Basic"],
    ],
  },
  {
    title: "Frameworks",
    hue: "#60a5fa",
    items: [
      ["Laravel", "Strong"],
      ["React", "Good"],
      ["Next.js", "Intermediate"],
      ["Tailwind CSS", "Good"],
      ["Node.js / Express", "Intermediate"],
      ["WordPress / WooCommerce", "Basic"],
      ["Admin panels and SaaS", "Good"],
    ],
  },
  {
    title: "Data",
    hue: "#34d399",
    items: [
      ["MySQL / MariaDB", "Strong"],
      ["phpMyAdmin", "Good"],
      ["SQLite", "Good"],
      ["MongoDB", "Basic"],
    ],
  },
  {
    title: "Tools",
    hue: "#fbbf24",
    items: [
      ["REST APIs", "Strong"],
      ["Git / GitHub", "Good"],
      ["Composer", "Good"],
      ["Postman", "Good"],
      ["cPanel / Plesk", "Good"],
      ["Excel / CSV import–export", "Good"],
      ["Payment gateways", "Good"],
      ["Razorpay", "Good"],
      ["Shiprocket", "Intermediate"],
      ["DomPDF", "Intermediate"],
      ["Google Sheets / Apps Script", "Good"],
      ["Apache", "Good"],
    ],
  },
] as const;

export const categoryLabels = Object.fromEntries(
  Object.entries(projectFile.categories).map(([key, value]) => [key, value.label]),
) as { [K in keyof typeof projectFile.categories]: string };

export const categoryHues = Object.fromEntries(
  Object.entries(projectFile.categories).map(([key, value]) => [key, value.hue]),
) as { [K in keyof typeof projectFile.categories]: string };

export type ProjectType = keyof typeof projectFile.categories;

export const projects = projectFile.items.map((project) => {
  if (!(project.type in projectFile.categories)) {
    throw new Error(`data/projects.json: "${project.name}" uses unknown type "${project.type}". Add it under categories first.`);
  }
  return project as typeof project & { type: ProjectType };
});

export function domainOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}
