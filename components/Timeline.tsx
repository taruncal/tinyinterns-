import type { TimelineStep } from "@/lib/types";

export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => (
          <div key={step.id} className="relative">
            {i < steps.length - 1 && (
              <div className="grad-line absolute left-5 top-11 hidden h-px w-full md:block" />
            )}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 font-mono text-sm text-violet-300">
                {step.number}
              </div>
              <div className="h-px flex-1 grad-line md:hidden" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-100">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
