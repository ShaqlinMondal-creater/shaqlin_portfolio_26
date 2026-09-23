import { ScrollTrigger } from "gsap/ScrollTrigger";

export type NavTheme = "dark" | "light";

export function setNavTheme(theme: NavTheme) {
  const nav = document.getElementById("site-nav");
  if (nav && nav.dataset.theme !== theme) nav.dataset.theme = theme;
}

export function watchNavTheme(section: Element, theme: NavTheme) {
  return ScrollTrigger.create({
    trigger: section,
    start: "top 56px",
    end: "bottom 56px",
    onToggle: (self) => {
      if (self.isActive) setNavTheme(theme);
    },
  });
}
