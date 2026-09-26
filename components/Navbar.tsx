"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "For startups", href: "#for-startups" },
  { label: "For students", href: "#for-students" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Vetting sandbox", href: "#vetting-sandbox" },
  { label: "Calculator", href: "#sprint-calculator" },
];

export default function Navbar({
  onOpenIntake,
}: {
  onOpenIntake?: (role: "founder" | "student") => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-panel sticky top-0 z-40 border-x-0 border-t-0 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500 shadow-sm">
            <span className="font-display text-sm font-bold text-ink-900">
              T
            </span>
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink-100">
            TinyInterns
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-ink-500 transition-colors hover:text-ink-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => onOpenIntake?.("student")}
            className="text-xs font-medium text-ink-500 transition-colors hover:text-ink-100 cursor-pointer px-2 py-1"
          >
            Apply as Talent
          </button>
          <button
            type="button"
            onClick={() => onOpenIntake?.("founder")}
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-500 cursor-pointer"
          >
            <span>Post a sprint</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-800 text-ink-300 lg:hidden cursor-pointer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-800 bg-[#06060b]/95 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-ink-500 hover:text-ink-100 py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2.5 border-t border-ink-800 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenIntake?.("student");
                }}
                className="w-full text-left py-2 text-sm text-ink-300 cursor-pointer"
              >
                Apply as Talent
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenIntake?.("founder");
                }}
                className="w-full rounded-md bg-violet-600 py-2.5 text-center text-sm font-semibold text-white cursor-pointer"
              >
                Post a sprint
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
