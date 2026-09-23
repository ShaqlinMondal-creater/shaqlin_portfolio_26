export const profile = {
  name: "Shaqlin Mondal",
  role: "Full Stack Developer",
  level: "Mid-senior PHP full stack developer",
  location: "Kolkata, West Bengal",
  email: "shaqlinmondal8905@gmail.com",
  phone: "+91 8597148785",
  phoneHref: "tel:+918597148785",
  years: "2.5+",
  cv: "https://shaqlinmondal-creater.github.io/Portfolio-Shaqlin/Resume_2026.pdf",
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
  { name: "Haneri", domain: "haneri.com", url: "https://haneri.com", stack: "Laravel · Razorpay" },
  { name: "Stockout", domain: "stockoutindia.com", url: "https://stockoutindia.com", stack: "Laravel · REST API" },
  { name: "Saifee School", domain: "saifeeschool.in", url: "https://www.saifeeschool.in", stack: "Laravel · MySQL" },
  { name: "Raj Interiors", domain: "rajinteriors.in", url: "https://rajinteriors.in", stack: "PHP · Tailwind" },
];

export const capabilities = [
  {
    label: "E-commerce",
    meta: "Laravel",
    title: "Stores that take payments",
    body: "Razorpay, coupons, and admin analytics. Liwaas, Haneri, Stockout.",
    tone: "dark",
    art: "radial-gradient(70% 55% at 50% 38%, rgba(192,132,252,0.75), transparent 70%), linear-gradient(170deg, #2a1150, #110822)",
  },
  {
    label: "WooCommerce",
    meta: "WordPress",
    title: "WooCommerce storefronts",
    body: "Four live shops on WordPress and cPanel.",
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
    body: "Student login, forms, and results in one place.",
    tone: "light",
    art: "conic-gradient(from 210deg at 50% 42%, #fafafa, #a1a1aa, #f4f4f5, #71717a, #e4e4e7, #fafafa)",
  },
  {
    label: "Company sites",
    meta: "WordPress",
    title: "Company sites",
    body: "Services and contact flows for Raj Interiors, Safe Technical, and Fluidtech.",
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
] as const;

export const marqueeWords = ["Laravel", "PHP", "MySQL", "Tailwind CSS", "WooCommerce", "REST APIs", "Razorpay"];

export const stats = [
  { value: 12, decimals: 0, suffix: "", label: "Live sites" },
  { value: 2.5, decimals: 1, suffix: "+", label: "Years shipping" },
  { value: 3, decimals: 0, suffix: "", label: "Companies" },
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
      "Shipping WooCommerce and Laravel stores with payments and product management.",
      "Moving data between Excel, CSV, and the database.",
      "Keeping PHP secure, readable, and fast.",
    ],
  },
  {
    title: "Industrial Internship · PHP & WordPress",
    company: "Euphoria Genx",
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
      ["Tailwind CSS", "Strong"],
      ["WordPress / WooCommerce", "Good"],
      ["Node.js / Express", "Intermediate"],
      ["React", "Basic"],
    ],
  },
  {
    title: "Data",
    hue: "#34d399",
    items: [
      ["MySQL / MariaDB", "Strong"],
      ["phpMyAdmin", "Strong"],
      ["SQLite", "Good"],
      ["MongoDB", "Basic"],
    ],
  },
  {
    title: "Tools",
    hue: "#fbbf24",
    items: [
      ["Git / GitHub", "Strong"],
      ["Composer", "Strong"],
      ["Postman", "Strong"],
      ["cPanel / Plesk", "Strong"],
      ["REST APIs", "Strong"],
      ["Excel / CSV import–export", "Strong"],
      ["Payment gateways", "Good"],
      ["Google Sheets / Apps Script", "Good"],
      ["Apache", "Good"],
    ],
  },
] as const;

export const categoryLabels = {
  ecommerce: "E-commerce",
  woocommerce: "WooCommerce",
  institution: "Institution portal",
  portfolio: "Company site",
} as const;

export const categoryHues = {
  ecommerce: "rgba(167,139,250,0.55)",
  woocommerce: "rgba(251,191,36,0.45)",
  institution: "rgba(52,211,153,0.45)",
  portfolio: "rgba(96,165,250,0.45)",
} as const;

export const projects: {
  type: keyof typeof categoryLabels;
  name: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
}[] = [
  {
    type: "ecommerce",
    name: "Liwaas",
    description: "Own-brand fashion store with payments, coupons, and admin analytics.",
    tags: ["Laravel", "MySQL", "Tailwind", "Razorpay"],
    url: "https://liwaas.com",
    image: "/projects/liwaas.webp",
  },
  {
    type: "ecommerce",
    name: "Haneri",
    description: "Full-stack store with payments, coupons, and admin analytics.",
    tags: ["Laravel", "MySQL", "Tailwind", "Razorpay"],
    url: "https://haneri.com",
    image: "/projects/haneri.webp",
  },
  {
    type: "ecommerce",
    name: "Stockout",
    description: "Multi-vendor marketplace.",
    tags: ["Laravel", "REST API", "Razorpay"],
    url: "https://stockoutindia.com",
    image: "/projects/stockout.webp",
  },
  {
    type: "woocommerce",
    name: "Anhussanally",
    description: "WooCommerce storefront.",
    tags: ["PHP", "WooCommerce", "cPanel"],
    url: "https://anhussunally.com",
    image: "/projects/anhussanally.webp",
  },
  {
    type: "woocommerce",
    name: "Johar Traders",
    description: "WooCommerce storefront.",
    tags: ["PHP", "WooCommerce", "cPanel"],
    url: "https://johartraders.in",
    image: "/projects/johar.webp",
  },
  {
    type: "woocommerce",
    name: "Sakberally",
    description: "WooCommerce storefront.",
    tags: ["PHP", "WooCommerce", "cPanel"],
    url: "https://sakberally.com/",
    image: "/projects/sakberally.webp",
  },
  {
    type: "woocommerce",
    name: "Frosty Business",
    description: "WooCommerce storefront.",
    tags: ["PHP", "WooCommerce", "cPanel"],
    url: "https://frostybusiness.com",
    image: "/projects/frosty.webp",
  },
  {
    type: "institution",
    name: "Saifee School",
    description: "Institution portal with student login, forms, and results.",
    tags: ["Laravel", "MySQL", "REST API"],
    url: "https://www.saifeeschool.in",
    image: "/projects/saifee.webp",
  },
  {
    type: "portfolio",
    name: "Raj Interiors",
    description: "Company site with services and contact flows.",
    tags: ["Tailwind", "PHP"],
    url: "https://rajinteriors.in",
    image: "/projects/raj.webp",
  },
  {
    type: "portfolio",
    name: "Safe Technical India",
    description: "WordPress company site with services and contact flows.",
    tags: ["WordPress"],
    url: "https://www.safetechnicalindia.in",
    image: "/projects/safetech-india.webp",
  },
  {
    type: "portfolio",
    name: "Safe Technical",
    description: "WordPress company site with services and contact flows.",
    tags: ["WordPress"],
    url: "https://www.safetechnical.in",
    image: "/projects/safetech.webp",
  },
  {
    type: "portfolio",
    name: "Fluidtech",
    description: "WordPress company site with services and contact flows.",
    tags: ["WordPress"],
    url: "https://fluidtech.co",
    image: "/projects/fluidtech.webp",
  },
];

export function domainOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}
