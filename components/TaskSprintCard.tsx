import { IndianRupee, Users, CalendarClock } from "lucide-react";
import type { MicroTask } from "@/lib/types";

const statusLabel: Record<MicroTask["status"], string> = {
  open: "Accepting applicants",
  filling: "Filling fast",
  closed: "Closed",
};

const statusClass: Record<MicroTask["status"], string> = {
  open: "text-cyan-300",
  filling: "text-amber-400",
  closed: "text-ink-500",
};

function formatRupees(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function TaskSprintCard({ task }: { task: MicroTask }) {
  return (
    <div className="glass-panel flex flex-col rounded-xl p-5 transition-colors hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold leading-snug text-ink-100">
          {task.title}
        </p>
        <span className="relative flex h-2 w-2 shrink-0 translate-y-1">
          {task.status === "open" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              task.status === "open"
                ? "bg-cyan-400"
                : task.status === "filling"
                  ? "bg-amber-400"
                  : "bg-ink-700"
            }`}
          />
        </span>
      </div>

      <p className="mt-1 text-xs text-ink-500">{task.companyStage}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {task.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-ink-800 bg-ink-900/60 px-2 py-1 text-xs text-ink-500"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs text-ink-500">
        <div className="flex items-center gap-1.5">
          <IndianRupee className="h-3.5 w-3.5 text-ink-700" />
          <span>
            {formatRupees(task.budgetMin)}–{formatRupees(task.budgetMax)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5 text-ink-700" />
          <span>{task.durationDays}d sprint</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-ink-700" />
          <span>{task.vettedInterested} vetted analysts interested</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-800 pt-4">
        <span className={`text-xs font-medium ${statusClass[task.status]}`}>
          {statusLabel[task.status]}
        </span>
        <button
          type="button"
          className="rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
        >
          View sprint brief
        </button>
      </div>
    </div>
  );
}
