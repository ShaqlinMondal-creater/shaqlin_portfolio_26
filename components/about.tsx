"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { education, profile } from "@/data/portfolio";
import { watchNavTheme } from "@/lib/nav-theme";

export function About() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const portrait = card.current;
    if (!section || !portrait) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () => {
      gsap.set(portrait, { transformPerspective: 900 });
      const tiltX = gsap.quickTo(portrait, "rotationX", { duration: 0.6, ease: "power3.out" });
      const tiltY = gsap.quickTo(portrait, "rotationY", { duration: 0.6, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const rect = portrait.getBoundingClientRect();
        tiltY(((event.clientX - rect.left) / rect.width - 0.5) * 12);
        tiltX(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
      };
      const leave = () => {
        tiltX(0);
        tiltY(0);
      };
      portrait.addEventListener("pointermove", move);
      portrait.addEventListener("pointerleave", leave);
      return () => {
        portrait.removeEventListener("pointermove", move);
        portrait.removeEventListener("pointerleave", leave);
      };
    });

    const theme = watchNavTheme(section, "dark");
    return () => {
      theme.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-title"
      className="bg-ink px-6 py-28 text-white md:px-12 md:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <div
            ref={card}
            className="portrait-frame overflow-hidden rounded-[28px] border border-white/10 bg-shot"
          >
            <Image
              src="/portrait.jpg"
              alt="Shaqlin Mondal"
              width={699}
              height={750}
              sizes="(min-width: 768px) 420px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-white/55">
            <i className="h-1.5 w-1.5 rounded-full bg-lilac" />
            {profile.location}
          </p>
        </div>

        <div>
          <p className="eyebrow text-lilac">About</p>
          <h2
            id="about-title"
            className="mt-4 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]"
          >
            Coding pulled me in. <span className="text-white/40">The hard problems kept me.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            I came into this work because solving a stubborn problem feels better than walking past it. With{" "}
            {profile.years} years in web development, I want a team where the work stays demanding and the learning
            does not flatten out.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
            Day to day that is Laravel and PHP, MySQL, REST APIs, Tailwind interfaces, and WooCommerce stores with
            payments wired in. I work at Dotcom Solutions in Kolkata as a mid-senior PHP full stack developer.
          </p>

          <h3 className="eyebrow mt-14 text-white/45">Education</h3>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {education.map((item) => (
              <li key={item.title} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-white/55">{item.school}</p>
                </div>
                <p className="font-mono text-xs text-white/45 sm:pt-1">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
