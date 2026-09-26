import type { SkillTag } from "@/lib/types";

interface FilterBarProps {
  options: SkillTag[];
  active: SkillTag | "all";
  onChange: (value: SkillTag | "all") => void;
}

export default function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          active === "all"
            ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
            : "border-ink-800 text-ink-500 hover:border-ink-700 hover:text-ink-300"
        }`}
      >
        All skills
      </button>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            active === option
              ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
              : "border-ink-800 text-ink-500 hover:border-ink-700 hover:text-ink-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
