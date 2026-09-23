"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { profile, socials } from "@/data/portfolio";
import { watchNavTheme } from "@/lib/nav-theme";

const ChromeMark = dynamic(() => import("@/components/chrome-mark"), { ssr: false });

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "Based in", value: profile.location },
];

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const theme = watchNavTheme(section, "dark");
    return () => {
      theme.kill();
    };
  }, []);

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="bg-ink px-2.5 pb-2.5">
      <div className="violet-panel relative overflow-hidden rounded-[28px] px-6 py-24 text-white md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className="eyebrow text-white/70">Contact</p>
            <h2
              id="contact-title"
              className="mt-4 text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
            >
              Let’s build <span className="block text-white/50">what ships next.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              A new product, a store that needs a real backend, or a team looking for a PHP full stack developer. I read
              everything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#1a0b3b] transition hover:bg-lilac"
              >
                Email me <span aria-hidden>→</span>
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-5 py-3 text-sm font-medium transition hover:bg-white/20"
              >
                Download CV
              </a>
            </div>

            <dl className="mt-12 max-w-lg divide-y divide-white/15 border-y border-white/15">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-6 py-4">
                  <dt className="eyebrow shrink-0 text-white/55">{row.label}</dt>
                  <dd className="min-w-0 text-right break-words">
                    {row.href ? (
                      <a href={row.href} className="underline-offset-4 hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white hover:text-[#1a0b3b]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-first h-[260px] sm:h-[340px] lg:order-none lg:h-[480px]">
            <div
              aria-hidden
              className="absolute inset-x-[18%] bottom-[8%] h-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(10,0,30,0.45),transparent)]"
            />
            <ChromeMark />
          </div>
        </div>
      </div>
    </section>
  );
}
