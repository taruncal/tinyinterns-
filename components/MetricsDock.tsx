"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 35, stiffness: 90 });
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springVal, prefix, suffix]);

  return <span ref={ref} className="font-mono">{`${prefix}0${suffix}`}</span>;
}

export default function MetricsDock() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="glass-panel grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
        <div className="px-5 py-5 text-center sm:px-6 sm:py-6">
          <p className="text-xl font-medium text-ink-100 sm:text-2xl">
            <AnimatedNumber value={212} />
          </p>
          <p className="mt-1 text-xs text-ink-500">Sprints completed</p>
        </div>

        <div className="px-5 py-5 text-center sm:px-6 sm:py-6">
          <p className="text-xl font-medium text-emerald-400 sm:text-2xl">
            <AnimatedNumber value={6.4} prefix="₹" suffix="L+" />
          </p>
          <p className="mt-1 text-xs text-ink-500">Paid to students</p>
        </div>

        <div className="px-5 py-5 text-center sm:px-6 sm:py-6">
          <p className="text-xl font-medium text-violet-400 sm:text-2xl">
            <AnimatedNumber value={38} />
          </p>
          <p className="mt-1 text-xs text-ink-500">PPOs converted</p>
        </div>

        <div className="px-5 py-5 text-center sm:px-6 sm:py-6">
          <p className="font-mono text-xl font-medium text-cyan-300 sm:text-2xl">
            1 in 6
          </p>
          <p className="mt-1 text-xs text-ink-500">Pass vetting benchmark</p>
        </div>
      </div>
    </div>
  );
}
