import type { CSSProperties } from "react";
import file from "@/data/theme.json";

export type ThemeTokens = (typeof file.themes)[keyof typeof file.themes];

function readTheme(): ThemeTokens {
  const themes = file.themes as Record<string, ThemeTokens>;
  const picked = themes[file.active];
  if (!picked) {
    throw new Error(`data/theme.json "active" is "${file.active}", but that key is missing under themes.`);
  }
  return picked;
}

export const theme = readTheme();

export function hexToRgb01(hex: string): [number, number, number] {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((part) => part + part).join("") : raw;
  const value = Number.parseInt(full, 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

export const themeStyle = {
  "--ink": theme.ink,
  "--paper": theme.paper,
  "--foreground": theme.foreground,
  "--accent": theme.accent,
  "--accent-mid": theme.accentMid,
  "--accent-deep": theme.accentDeep,
  "--lilac": theme.lilac,
  "--accent-hot": theme.hot,
  "--glow": theme.glow,
  "--live": theme.live,
  "--cta-ink": theme.ctaInk,
  "--hero-lift": theme.heroLift,
  "--hero-wash": theme.heroWash,
  "--nav-tint": theme.navTint,
  "--orb-mid": theme.orbMid,
  "--live-from": theme.liveFrom,
  "--live-via": theme.liveVia,
  "--live-to": theme.liveTo,
  "--link-hover": theme.linkHover,
  "--shot": theme.shot,
} as CSSProperties;
