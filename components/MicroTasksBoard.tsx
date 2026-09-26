"use client";

import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";
import TaskSprintCard from "./TaskSprintCard";
import type { MicroTask, SkillTag } from "@/lib/types";

const filterOptions: SkillTag[] = ["SQL", "Python", "Power BI", "Excel", "ETL"];

export default function MicroTasksBoard({ tasks }: { tasks: MicroTask[] }) {
  const [activeSkill, setActiveSkill] = useState<SkillTag | "all">("all");

  const filteredTasks = useMemo(() => {
    if (activeSkill === "all") return tasks;
    return tasks.filter((task) => task.skills.includes(activeSkill));
  }, [tasks, activeSkill]);

  return (
    <div>
      <FilterBar options={filterOptions} active={activeSkill} onChange={setActiveSkill} />

      {filteredTasks.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-ink-800 p-8 text-center">
          <p className="text-sm text-ink-500">
            No open sprints need {activeSkill} right now.
          </p>
          <p className="mt-1 text-xs text-ink-700">
            New sprints are posted daily — check another skill or come back soon.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTasks.map((task) => (
            <TaskSprintCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
