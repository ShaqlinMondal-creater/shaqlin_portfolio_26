"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header id="site-nav" className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4">
      <div className="nav-pill pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
        <a
          href="#top"
          aria-label="Shaqlin Mondal, back to top"
          className="grid h-9 w-9 place-items-center rounded-full bg-[conic-gradient(from_140deg,#c4b5fd,#7c3aed,#f0abfc,#c4b5fd)] text-sm font-bold text-[#1a0b3b]"
        >
          S
        </a>
        <nav aria-label="Primary" className="hidden items-center md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm opacity-75 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${profile.email}`} className="nav-cta rounded-full px-4 py-2 text-sm font-medium">
          Say hello
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full px-3.5 py-2 text-sm opacity-80 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="nav-pill nav-menu pointer-events-auto mt-2 flex w-full max-w-xs flex-col rounded-3xl p-2 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
