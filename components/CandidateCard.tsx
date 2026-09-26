"use client";

import { ShieldCheck, Clock3, CheckCircle2 } from "lucide-react";
import type { Candidate } from "@/lib/types";

const statusConfig = {
  vetted: {
    label: "Vetted, available",
    icon: ShieldCheck,
    dotClass: "bg-cyan-400",
    textClass: "text-cyan-300",
  },
  in_sprint: {
    label: "In an active sprint",
    icon: Clock3,
    dotClass: "bg-amber-400",
    textClass: "text-amber-400",
  },
  completed: {
    label: "Completed, open to next",
    icon: CheckCircle2,
    dotClass: "bg-ink-500",
    textClass: "text-ink-500",
  },
} as const;

export default function CandidateCard({
  candidate,
  onSelect,
}: {
  candidate: Candidate;
  onSelect?: (candidate: Candidate) => void;
}) {
  const status = statusConfig[candidate.status];
  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onSelect?.(candidate)}
      className="glass-panel relative cursor-pointer overflow-hidden rounded-xl p-5 transition-all hover:scale-[1.02] hover:border-violet-500/40 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-800 text-sm font-semibold text-ink-300">
            {candidate.initials}
          </div>
          <div>
            <p className="font-mono text-sm font-medium text-ink-100">
              {candidate.codeName}
            </p>
            <p className="text-xs text-ink-500">
              {candidate.college} · {candidate.year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-ink-800 bg-ink-900/60 px-2.5 py-1">
          <span className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`} />
          <span className={`font-mono text-xs font-medium ${status.textClass}`}>
            {candidate.vettingScore}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-ink-800 bg-ink-900/60 px-2 py-1 text-xs text-ink-500"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink-800 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-ink-500">
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{status.label}</span>
        </div>
        <p className="font-mono text-xs text-ink-500">
          {candidate.sprintsCompleted} sprint{candidate.sprintsCompleted === 1 ? "" : "s"}
        </p>
      </div>

      {candidate.topPercentile && (
        <div className="absolute right-0 top-0 rounded-bl-lg border-b border-l border-ink-800 bg-ink-900/80 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-300">
          top_{candidate.topPercentile}%
        </div>
      )}
    </div>
  );
}
