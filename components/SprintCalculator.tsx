"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface ScopeOption {
  id: string;
  name: string;
  basePrice: number;
  estHours: number;
}

const scopes: ScopeOption[] = [
  { id: "cleaning", name: "Data Cleaning & Wrangling", basePrice: 2000, estHours: 12 },
  { id: "bi", name: "Power BI / SQL Dashboard", basePrice: 3500, estHours: 20 },
  { id: "scraping", name: "Custom Web Scraper / ETL", basePrice: 4500, estHours: 25 },
  { id: "cohort", name: "Churn & Cohort Analysis", basePrice: 3000, estHours: 16 },
];

export default function SprintCalculator() {
  const [selectedScope, setSelectedScope] = useState<ScopeOption>(scopes[1]);
  const [duration, setDuration] = useState<number>(7);

  // Dynamic cost calculation based on scope & duration urgency
  const calculateTotal = () => {
    const urgencyMultiplier = duration <= 5 ? 1.2 : 1.0;
    return Math.round(selectedScope.basePrice * urgencyMultiplier);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-10 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2 text-violet-400 font-mono text-xs uppercase tracking-widest">
          <Calculator className="w-4 h-4" />
          <span>Interactive Sprint Estimator</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Estimate your micro-internship sprint.
        </h2>
        <p className="text-sm text-neutral-400 mb-8 max-w-xl">
          Select your data backlog deliverable to see estimated delivery timeline, escrow pricing, and engineering hours saved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-2">
                1. SELECT BACKLOG TYPE
              </label>
              <div className="grid grid-cols-1 gap-2">
                {scopes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScope(s)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm transition-all ${
                      selectedScope.id === s.id
                        ? "border-violet-500 bg-violet-500/10 text-white font-medium shadow-sm"
                        : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="font-mono text-xs text-neutral-500">~{s.estHours} hrs</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-neutral-400">
                  2. SPRINT TIMELINE
                </label>
                <span className="text-xs font-mono text-violet-400">{duration} Days</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-600 mt-1">
                <span>3 Days (Fast track)</span>
                <span>14 Days (Standard)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Estimate Summary */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-neutral-500 uppercase mb-4">
                Estimated Breakdown
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Fixed Escrow Budget</span>
                  <span className="font-mono font-semibold text-emerald-400 text-lg">
                    ₹{calculateTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Turnaround Window</span>
                  <span className="font-mono text-neutral-200">{duration} Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Founder Time Saved</span>
                  <span className="font-mono text-cyan-300">~{selectedScope.estHours} Hours</span>
                </div>
              </div>

              <div className="space-y-2 py-4 border-t border-neutral-900 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% refund escrow guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>Pre-screened Batch 1 student analyst</span>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#post-sprint"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition shadow-lg shadow-violet-600/20"
            >
              <span>Lock in this Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
