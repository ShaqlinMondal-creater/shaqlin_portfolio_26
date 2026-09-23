"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/portfolio";
import { setNavTheme, watchNavTheme } from "@/lib/nav-theme";

gsap.registerPlugin(ScrollTrigger);

const copy =
  "Laravel or WordPress on top, MySQL underneath, payments wired in, and hosting on cPanel. I build it, ship it, and look after it.";

function Words() {
  return (
    <>
      <span className="word-a absolute top-[17vh] left-[6vw] block">From brief</span>
      <span className="word-b absolute right-[6vw] bottom-[13vh] block">to production.</span>
    </>
  );
}

function Stats() {
  return (
    <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 md:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2">
          <dt className="text-xs text-white/55 md:text-sm">{stat.label}</dt>
          <dd className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            <span data-count={stat.value} data-decimals={stat.decimals}>
              {stat.value.toFixed(stat.decimals)}
            </span>
            {stat.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(section);
      const stage = q(".statement-stage")[0] as HTMLElement;
      const orb = q(".orb")[0] as HTMLElement;
      const inverse = q(".words-light")[0] as HTMLElement;
      const zoom = { s: 0.001 };
      const pinned: { trigger?: ScrollTrigger } = {};

      const cover = () => Math.hypot(stage.clientWidth, stage.clientHeight) / (orb.offsetWidth * 0.5) + 0.5;

      const paint = () => {
        const radius = (orb.offsetWidth / 2) * zoom.s;
        gsap.set(orb, { scale: zoom.s });
        inverse.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
        const progress = pinned.trigger?.progress ?? 0;
        if (progress > 0 && progress < 1) {
          const navReach = Math.hypot(Math.min(stage.clientWidth / 2, 320), stage.clientHeight / 2 - 16);
          setNavTheme(radius > navReach ? "dark" : "light");
        }
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: paint,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onLeave: () => setNavTheme("dark"),
          onLeaveBack: () => setNavTheme("light"),
        },
      });

      tl.fromTo(zoom, { s: 0.001 }, { s: 1, duration: 0.8, ease: "back.out(1.5)" }, 0)
        .fromTo(q(".word-a"), { xPercent: -24, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0)
        .fromTo(q(".word-b"), { xPercent: 24, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0)
        .to(q(".orb-glyph"), { autoAlpha: 0, duration: 0.3 }, 1.25)
        .to(zoom, { s: () => cover(), duration: 1.4, ease: "power2.in" }, 1.2)
        .to(q(".word-a"), { yPercent: -140, autoAlpha: 0, duration: 0.6, ease: "power1.in" }, 2.2)
        .to(q(".word-b"), { yPercent: 140, autoAlpha: 0, duration: 0.6, ease: "power1.in" }, 2.2)
        .fromTo(q(".statement-copy"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 2.5);

      (q(".statement-stage [data-count]") as HTMLElement[]).forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals);
        const counter = { v: 0 };
        tl.fromTo(
          counter,
          { v: 0 },
          {
            v: target,
            duration: 0.7,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = counter.v.toFixed(decimals);
            },
          },
          2.6,
        );
      });

      tl.to({}, { duration: 0.6 });
      pinned.trigger = tl.scrollTrigger;
      paint();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      watchNavTheme(section, "dark");
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="statement-title" className="relative bg-paper text-ink">
      <div className="statement-stage rm-hide relative isolate h-svh overflow-hidden">
        <h2
          id="statement-title"
          className="words-dark text-[clamp(2.8rem,min(11.5vw,17vh),11rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
        >
          <Words />
        </h2>
        <div className="orb absolute top-1/2 left-1/2 grid h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full md:h-[min(240px,26vh)] md:w-[min(240px,26vh)]">
          <span aria-hidden className="orb-glyph font-mono text-2xl text-lilac md:text-3xl">
            &lt;/&gt;
          </span>
        </div>
        <div
          aria-hidden
          className="words-light pointer-events-none absolute inset-0 text-[clamp(2.8rem,min(11.5vw,17vh),11rem)] leading-[0.95] font-semibold tracking-[-0.055em] text-white [clip-path:circle(0px_at_50%_50%)]"
        >
          <Words />
        </div>
        <div className="statement-copy absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-white">
          <p className="eyebrow text-lilac">How I work</p>
          <p className="mx-auto mt-5 max-w-3xl text-[clamp(1.5rem,3.1vw,2.75rem)] leading-[1.14] font-semibold tracking-[-0.03em]">
            {copy}
          </p>
          <Stats />
        </div>
      </div>

      <div className="rm-show bg-ink px-6 py-28 text-center text-white">
        <h2 className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
          From brief <span className="text-white/45">to production.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.25rem,2.4vw,2rem)] leading-snug text-white/80">{copy}</p>
        <Stats />
      </div>
    </section>
  );
}
