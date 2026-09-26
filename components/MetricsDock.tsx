const metrics = [
  { value: "212", label: "Sprints completed" },
  { value: "₹6.4L+", label: "Paid to students" },
  { value: "38", label: "PPOs converted" },
  { value: "1 in 6", label: "Applicants pass vetting" },
];

export default function MetricsDock() {
  return (
    <div className="glass-panel mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="px-5 py-5 text-center sm:px-6 sm:py-6">
          <p className="font-mono text-xl font-medium text-ink-100 sm:text-2xl">
            {metric.value}
          </p>
          <p className="mt-1 text-xs text-ink-500">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
