"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "For startups", href: "#for-startups" },
  { label: "For students", href: "#for-students" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-panel sticky top-0 z-50 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500">
            <span className="font-display text-sm font-bold text-ink-900">
              T
            </span>
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink-100">
            TinyInterns
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-500 transition-colors hover:text-ink-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#sign-in"
            className="text-sm text-ink-500 transition-colors hover:text-ink-100"
          >
            Sign in
          </a>
          <a
            href="#post-sprint"
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Post a sprint
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-800 text-ink-300 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-800 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-ink-500 hover:text-ink-100"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-ink-800 pt-4">
              <a href="#sign-in" className="text-sm text-ink-500 hover:text-ink-100">
                Sign in
              </a>
              <a
                href="#post-sprint"
                className="rounded-md bg-violet-500 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Post a sprint
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
