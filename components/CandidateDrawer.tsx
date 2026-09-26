"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, GitBranch, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import type { Candidate } from "@/lib/types";

interface CandidateDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
}

export default function CandidateDrawer({ candidate, onClose }: CandidateDrawerProps) {
  if (!candidate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md border-l border-ink-800 bg-[#0c0c14] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-ink-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-violet-400">VERIFIED SCORECARD</span>
                {candidate.topPercentile && (
                  <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                    Top {candidate.topPercentile}%
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-800/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/30 text-lg font-bold text-violet-300">
                {candidate.initials}
              </div>
              <div>
                <h3 className="font-mono text-base font-semibold text-ink-100">
                  {candidate.codeName}
                </h3>
                <p className="text-xs text-ink-500">
                  {candidate.college} · {candidate.year}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vetting Score: {candidate.vettingScore}</span>
                </div>
              </div>
            </div>

            {/* Technical Benchmarks */}
            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-500 mb-3">
                Practical Assessment Metrics
              </h4>
              <div className="space-y-3 rounded-xl border border-ink-800 bg-ink-900/40 p-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-300">SQL Complex Queries & Aggregation</span>
                    <span className="font-mono text-cyan-300">96%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-300">Data Cleaning & Edge-case Handling</span>
                    <span className="font-mono text-violet-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-300">Execution Speed / Query Plan</span>
                    <span className="font-mono text-emerald-400">98%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Skills */}
            <div className="mt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-500 mb-2">
                Audited Skill Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-md border border-ink-800 bg-ink-900/60 px-2.5 py-1 text-xs text-ink-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof-of-work Mock Link */}
            <div className="mt-6 rounded-xl border border-ink-800/80 bg-ink-950 p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-400 mb-1">
                <GitBranch className="w-4 h-4 text-violet-400" />
                <span>Verified Benchmark Repository</span>
              </div>
              <p className="text-xs text-ink-500">
                Automated test runs verified zero null values and index-optimized JOIN runtime.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-8 pt-4 border-t border-ink-800">
            <a
              href="#sprint-calculator"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition shadow-lg shadow-violet-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Candidate for Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-2 text-center font-mono text-[10px] text-ink-500">
              Escrow-protected · 100% money back if not satisfied
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
