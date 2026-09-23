"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categoryHues, categoryLabels, domainOf, profile, projects } from "@/data/portfolio";
import { watchNavTheme } from "@/lib/nav-theme";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

export function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = section.querySelector<HTMLElement>(".work-stage");
      const track = section.querySelector<HTMLElement>(".work-track");
      const bar = section.querySelector<HTMLElement>(".work-progress i");
      if (!stage || !track || !bar) return;
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        .to(track, { x: () => -distance() }, 0)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);
    });

    const theme = watchNavTheme(section, "dark");
    return () => {
      theme.kill();
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="relative bg-ink text-white">
      <div className="work-stage relative pt-28 pb-20 md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden md:pt-24 md:pb-12">
        <div className="mx-auto flex w-full max-w-[1280px] items-end justify-between gap-8 px-6 md:px-12">
          <div>
            <p className="eyebrow text-lilac">Selected work</p>
            <h2
              id="work-title"
              className="mt-4 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]"
            >
              Twelve sites, <span className="text-white/40">all in production.</span>
            </h2>
          </div>
          <p className="hidden max-w-[17rem] text-sm leading-relaxed text-white/55 md:block">
            Stores, portals, and company sites for businesses across India. Every one of them is live.
          </p>
        </div>

        <div className="work-viewport rm-scroll mt-12">
          <ol className="work-track grid gap-14 px-6 md:flex md:w-max md:items-start md:gap-10 md:px-[max(3rem,calc((100%_-_1280px)/2_+_3rem))]">
            {projects.map((project, index) => (
              <li
                key={project.url}
                className={
                  index % 2 ? "md:mt-[7vh] md:w-[min(27rem,46vh)] md:shrink-0" : "md:w-[min(34rem,58vh)] md:shrink-0"
                }
              >
                <WorkCard project={project} index={index} />
              </li>
            ))}
            <li className="md:w-[min(22rem,40vh)] md:shrink-0 md:self-stretch">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="violet-panel flex h-full min-h-72 flex-col justify-between rounded-3xl p-7 transition hover:brightness-110"
              >
                <p className="eyebrow text-white/70">Archive</p>
                <div>
                  <p className="text-3xl leading-[1.05] font-semibold tracking-[-0.03em]">More code on GitHub</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">Side projects, experiments, and practice repos.</p>
                  <span className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1a0b3b]">
                    Open GitHub <span aria-hidden>&nbsp;↗</span>
                  </span>
                </div>
              </a>
            </li>
          </ol>
        </div>

        <div aria-hidden className="work-progress rm-hide absolute right-12 bottom-6 left-12 hidden h-px bg-white/10 md:block">
          <i className="block h-full origin-left scale-x-0 bg-lilac" />
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="group block">
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-white/45 uppercase">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="flex items-center gap-2">
          <i className="h-1.5 w-1.5 rounded-full" style={{ background: categoryHues[project.type] }} />
          {categoryLabels[project.type]}
        </span>
      </div>
      <div className="relative mt-3 aspect-[16/7] overflow-hidden rounded-2xl border border-white/10 bg-[#14141b] transition duration-500 group-hover:-translate-y-1 group-hover:border-white/30">
        <Image
          src={project.image}
          alt={`${project.name} homepage`}
          fill
          sizes="(min-width: 768px) 544px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">{project.name}</h3>
          <p className="mt-1 font-mono text-xs text-white/45">{domainOf(project.url)}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 transition group-hover:bg-white group-hover:text-ink">
          Visit <span aria-hidden>↗</span>
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{project.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/65">
            {tag}
          </li>
        ))}
      </ul>
    </a>
  );
}
