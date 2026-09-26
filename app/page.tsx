"use client";

import { useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import NetworkGraph from "@/components/NetworkGraph";
import MetricsDock from "@/components/MetricsDock";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import Timeline from "@/components/Timeline";
import CandidateCard from "@/components/CandidateCard";
import CandidateDrawer from "@/components/CandidateDrawer";
import MicroTasksBoard from "@/components/MicroTasksBoard";
import { sampleCandidates, sampleTasks, timelineSteps } from "@/lib/sample-data";
import SprintCalculator from "@/components/SprintCalculator";
import InteractiveVettingSandbox from "@/components/InteractiveVettingSandbox";
import IntakeModal from "@/components/IntakeModal";
import type { Candidate } from "@/lib/types";

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<"founder" | "student">("founder");

  const openIntake = (role: "founder" | "student") => {
    setModalRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <NetworkGraph />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,6,11,0)_0%,var(--color-canvas)_75%)]" />

        <div className="relative mx-auto max-w-3xl px-5 pb-32 pt-20 text-center sm:px-8 sm:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1.5 font-mono text-[11px] text-ink-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            batch_01 screening_open
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-100 sm:text-6xl">
            The network between
            <br />
            backlog and talent.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
            TinyInterns connects pre-vetted student analysts with startups
            for 5 to 15 day, escrow-secured data sprints — no resumes, no
            hiring overhead.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => openIntake("student")}
              className="flex items-center justify-center gap-1.5 rounded-md bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            >
              Apply for Batch 1 screening
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => openIntake("founder")}
              className="glass-panel flex items-center justify-center gap-1.5 rounded-md px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:bg-white/[0.06] cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Hire pre-vetted talent
            </button>
          </div>
        </div>
      </section>

      {/* Docked metrics */}
      <div className="relative z-10 -mt-16 px-5 sm:px-8">
        <MetricsDock />
      </div>

      {/* Live Activity Ticker */}
      <div className="mt-14">
        <LiveActivityFeed />
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="max-w-lg font-display text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
            The audition-to-hire workflow
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-500">
            A cleaner way for talent and startups to work together, built
            around real, verifiable output at every stage.
          </p>

          <div className="mt-12">
            <Timeline steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* Interactive Vetting Sandbox Demo */}
      <section id="vetting-sandbox" className="border-t border-ink-800">
        <InteractiveVettingSandbox />
      </section>

      {/* Candidate Showcase Preview */}
      <section id="for-startups" className="border-t border-ink-800 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
                Analysts who already cleared the bar
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
                Click any candidate below to audit their verification benchmarks and reserve them for a sprint.
              </p>
            </div>
            <button
              onClick={() => openIntake("founder")}
              className="flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200 cursor-pointer"
            >
              Browse all vetted analysts
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sampleCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onSelect={(cand) => setSelectedCandidate(cand)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Detail Drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      {/* Sample Micro-Tasks Board */}
      <section id="for-students" className="border-t border-ink-800 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
              Backlog, sized for a sprint
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
              Founders post the exact task, the budget, and the deadline
              upfront. Filter by the skill you want to apply.
            </p>
          </div>

          <div className="mt-8">
            <MicroTasksBoard tasks={sampleTasks} />
          </div>
        </div>
      </section>

      {/* Interactive Sprint Calculator */}
      <section id="sprint-calculator" className="border-t border-ink-800">
        <SprintCalculator />
      </section>

      {/* Lead Capture / Intake Modal */}
      <IntakeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRole={modalRole}
      />

      {/* Footer */}
      <footer className="border-t border-ink-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500 font-display text-xs font-bold text-ink-900">
              T
            </span>
            <span className="font-display text-sm font-semibold text-ink-300">
              TinyInterns
            </span>
          </div>
          <p className="font-mono text-xs text-ink-700">
            India&apos;s proof-of-work micro-internship network.
          </p>
        </div>
      </footer>
    </div>
  );
}
