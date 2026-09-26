"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, CheckCircle2, AlertCircle, RefreshCw, Award } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  difficulty: string;
  timeLimit: string;
  prompt: string;
  initialSql: string;
  solutionKeywords: string[];
}

const challengeData: Challenge = {
  id: "ch-01",
  title: "Calculate 30-Day Cohort Retention Rate",
  difficulty: "Intermediate",
  timeLimit: "30 mins",
  prompt:
    "Write a SQL query against the orders table to calculate the percentage of users who returned to make a second purchase within 30 days of their initial transaction date.",
  initialSql: `SELECT 
  cohort_month,
  COUNT(DISTINCT user_id) AS total_users,
  ROUND(
    COUNT(DISTINCT repeat_user_id) * 100.0 / COUNT(DISTINCT user_id), 
    2
  ) AS retention_30d_pct
FROM user_cohorts
GROUP BY 1
ORDER BY 1 DESC;`,
  solutionKeywords: ["cohort_month", "COUNT", "DISTINCT", "retention_30d_pct"],
};

export default function InteractiveVettingSandbox() {
  const [code, setCode] = useState(challengeData.initialSql);
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<null | {
    passed: boolean;
    score: string;
    runtime: string;
    message: string;
  }>(null);

  const runVettingSimulation = () => {
    setIsRunning(true);
    setTestResult(null);

    // Simulate backend query verification against test cases
    setTimeout(() => {
      const isValid = challengeData.solutionKeywords.every((kw) =>
        code.includes(kw)
      );

      if (isValid) {
        setTestResult({
          passed: true,
          score: "9.6 / 10",
          runtime: "42ms (Top 5%)",
          message: "All 6 hidden test cases passed. Query plan optimized.",
        });
      } else {
        setTestResult({
          passed: false,
          score: "4.2 / 10",
          runtime: "Failed",
          message: "Syntax error or missing required aggregation logic.",
        });
      }
      setIsRunning(false);
    }, 1200);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-10 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
              <Terminal className="w-4 h-4" />
              <span>Interactive Vetting Engine</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              No pedigree filters. Zero resume screening.
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Test the live assessment environment student analysts complete before getting placed.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-md border border-neutral-800 bg-neutral-950 font-mono text-[11px] text-neutral-400">
              {challengeData.difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-md border border-neutral-800 bg-neutral-950 font-mono text-[11px] text-violet-400">
              ⏱ {challengeData.timeLimit}
            </span>
          </div>
        </div>

        {/* Prompt description banner */}
        <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/80 p-4 mb-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
          <span className="font-semibold text-white">Task Prompt: </span>
          {challengeData.prompt}
        </div>

        {/* Mock Code Runner Box */}
        <div className="rounded-xl border border-neutral-800 bg-[#06060b] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800/80 bg-neutral-950">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="font-mono text-xs text-neutral-400 ml-2">
                solution_query.sql
              </span>
            </div>

            <button
              onClick={() => {
                setCode(challengeData.initialSql);
                setTestResult(null);
              }}
              className="text-neutral-500 hover:text-neutral-300 transition text-xs flex items-center gap-1 font-mono"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="w-full bg-transparent text-xs sm:text-sm font-mono text-cyan-300 outline-none resize-none leading-relaxed selection:bg-neutral-800"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-neutral-800/80 bg-neutral-950/60">
            <span className="font-mono text-[11px] text-neutral-500">
              PostgreSQL 16 · Escrow Verification Sandbox
            </span>

            <button
              onClick={runVettingSimulation}
              disabled={isRunning}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating Test Cases...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Run Verification Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Evaluation Output */}
        <AnimatePresence>
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 rounded-xl border p-4 text-xs md:text-sm ${
                testResult.passed
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  {testResult.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span className="font-medium">{testResult.message}</span>
                </div>

                {testResult.passed && (
                  <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-200 shrink-0">
                    <Award className="w-3.5 h-3.5" />
                    <span>Score: {testResult.score}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
