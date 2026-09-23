"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities, skillGroups } from "@/data/portfolio";
import { watchNavTheme } from "@/lib/nav-theme";

gsap.registerPlugin(ScrollTrigger);

const FAR = -1800;
const NEAR = 520;

const chips = skillGroups.flatMap((group) => group.items.map(([name, level]) => ({ name, level, hue: group.hue })));

export function Stack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", narrow: "(max-width: 767px)" }, (context) => {
      const { motion, narrow } = context.conditions ?? {};
      const stage = section.querySelector<HTMLElement>(".stack-stage");
      if (!motion || !stage) return;
      const all = Array.from(stage.querySelectorAll<HTMLElement>(".depth-tile"));
      const tiles = narrow ? all.filter((_, i) => i % 2 === 0) : all;
      const random = (n: number) => {
        const value = Math.sin(n * 12.9898) * 43758.5453;
        return value - Math.floor(value);
      };
      const seeds = tiles.map((_, i) => {
        const angle = i * 2.399963 + 0.4;
        const reach = narrow ? 0.95 + 0.4 * random(i + 1) : 0.62 + 0.5 * random(i + 1);
        return { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach, phase: random(i + 101) };
      });
      const field = { p: 0 };

      const paint = () => {
        const halfW = stage.clientWidth / 2;
        const halfH = stage.clientHeight / 2;
        tiles.forEach((tile, i) => {
          const seed = seeds[i];
          const travel = (field.p * 1.2 + seed.phase) % 1;
          const z = FAR + travel * (NEAR - FAR);
          const opacity = Math.min(gsap.utils.clamp(0, 1, travel / 0.22), gsap.utils.clamp(0, 1, (1 - travel) / 0.2));
          tile.style.opacity = opacity.toFixed(3);
          tile.style.transform = `translate(-50%, -50%) translate3d(${(seed.x * halfW).toFixed(1)}px, ${(
            seed.y * halfH * 0.9
          ).toFixed(1)}px, ${z.toFixed(1)}px)`;
        });
      };

      gsap.fromTo(
        field,
        { p: 0 },
        {
          p: 1,
          ease: "none",
          onUpdate: paint,
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: paint,
          },
        },
      );
      paint();

      return () => {
        all.forEach((tile) => {
          tile.style.opacity = "";
          tile.style.transform = "";
        });
      };
    });

    const theme = watchNavTheme(section, "light");
    return () => {
      theme.kill();
      mm.revert();
    };
  }, []);

  return (
    <section id="stack" ref={root} aria-labelledby="stack-title" className="bg-ink px-2.5">
      <div className="rounded-[28px] bg-paper text-ink">
        <div className="stack-stage relative h-svh overflow-hidden rounded-[28px]">
          <div aria-hidden className="rm-hide absolute inset-0 [perspective:1200px]">
            {chips.map((chip) => (
              <span
                key={`chip-${chip.name}`}
                className="depth-tile absolute top-1/2 left-1/2 flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[15px] font-medium whitespace-nowrap opacity-0 shadow-[0_18px_40px_-18px_rgba(20,10,60,0.35)]"
              >
                <i className="h-2 w-2 rounded-full" style={{ background: chip.hue }} />
                {chip.name}
                <span className="font-mono text-[10px] tracking-wider text-ink/40 uppercase">{chip.level}</span>
              </span>
            ))}
            {capabilities.map((item) => (
              <span
                key={`art-${item.label}`}
                className="depth-tile absolute top-1/2 left-1/2 block h-[110px] w-[150px] rounded-2xl opacity-0 shadow-[0_24px_50px_-20px_rgba(20,10,60,0.45)] md:h-[140px] md:w-[190px]"
                style={{ background: item.art }}
              />
            ))}
          </div>

          <div className="relative z-10 grid h-full place-items-center px-6 text-center">
            <div className="relative">
              <div
                aria-hidden
                className="paper-halo absolute -inset-x-[22%] -inset-y-[55%] -z-10"
              />
              <p className="eyebrow text-accent">Stack</p>
              <h2
                id="stack-title"
                className="mx-auto mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
              >
                Tools I reach for <span className="text-ink/40">when the work is real.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md leading-relaxed text-ink/60">
                Laravel and PHP first, with MySQL, Tailwind CSS, and WordPress close behind.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 pt-6 pb-16 sm:grid-cols-2 md:px-10 md:pb-24 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-ink/10 bg-white p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <i className="h-2 w-2 rounded-full" style={{ background: group.hue }} />
                {group.title}
              </h3>
              <ul className="mt-4 divide-y divide-ink/[0.06]">
                {group.items.map(([name, level]) => (
                  <li key={name} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <span>{name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-ink/45">{level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
