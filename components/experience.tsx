"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, roles } from "@/data/portfolio";
import { watchNavTheme } from "@/lib/nav-theme";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(section);
      gsap.fromTo(
        q(".timeline-fill"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: q(".timeline")[0], start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );
      (q(".role-card") as HTMLElement[]).forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
          },
        );
      });
    });

    const theme = watchNavTheme(section, "dark");
    return () => {
      theme.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={root}
      aria-labelledby="experience-title"
      className="bg-ink px-6 py-28 text-white md:px-12 md:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="eyebrow text-lilac">Experience</p>
          <h2
            id="experience-title"
            className="mt-4 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]"
          >
            The path <span className="text-white/40">so far.</span>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-white/60">
            From teaching myself HTML to Laravel in production, with two internships in between.
          </p>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-ink"
          >
            Download CV <span aria-hidden>&nbsp;↗</span>
          </a>
        </div>

        <div className="timeline relative pl-8 md:pl-10">
          <span aria-hidden className="absolute top-3 bottom-3 left-[7px] w-px bg-white/10">
            <i className="timeline-fill block h-full w-full origin-top bg-gradient-to-b from-lilac to-accent-hot" />
          </span>
          <ol className="space-y-6">
            {roles.map((role) => (
              <li
                key={`${role.company}-${role.dates}`}
                className="role-card relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute top-8 -left-8 h-[15px] w-[15px] rounded-full border-2 border-lilac bg-ink md:-left-10"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-white/50">{role.dates}</p>
                  {role.current ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-live/10 px-2.5 py-1 text-[11px] text-live">
                      <i className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
                      Current
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">{role.title}</h3>
                <p className="mt-1 text-sm text-white/55">
                  {role.company} · {role.place}
                </p>
                <ul className="mt-5 grid gap-2.5 text-[15px] leading-relaxed text-white/70 lg:grid-cols-2 lg:gap-x-8">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-lilac" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
