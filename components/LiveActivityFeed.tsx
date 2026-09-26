"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const activities = [
  { student: "Candidate #DA-07", task: "SQL Cohort Retention", payout: "₹3,500", time: "18m ago" },
  { student: "Candidate #DA-12", task: "Power BI Churn Dashboard", payout: "₹4,200", time: "42m ago" },
  { student: "Candidate #DA-03", task: "Web Scraping Pipeline", payout: "₹5,000", time: "1h ago" },
  { student: "Candidate #DA-19", task: "Data Cleaning (50k rows)", payout: "₹2,500", time: "3h ago" },
];

export default function LiveActivityFeed() {
  return (
    <div className="border-y border-ink-800 bg-[#07070d]/80 backdrop-blur-sm py-3 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 flex items-center gap-4 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-emerald-400 shrink-0 font-semibold uppercase tracking-wider text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Deliveries
        </span>
        <div className="flex gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-ink-500">
          {activities.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="text-ink-300 font-medium">{item.student}</span>
              <ArrowRight className="w-3 h-3 text-ink-700" />
              <span>{item.task}</span>
              <span className="text-emerald-400 font-semibold">({item.payout})</span>
              <span className="text-ink-700 text-[10px]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
