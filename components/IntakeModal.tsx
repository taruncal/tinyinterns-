"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, Building2, GraduationCap } from "lucide-react";

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "founder" | "student";
}

export default function IntakeModal({
  isOpen,
  onClose,
  defaultRole = "founder",
}: IntakeModalProps) {
  const [role, setRole] = useState<"founder" | "student">(defaultRole);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      // Auto-reset after a short delay
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg rounded-2xl border border-ink-800 bg-[#0b0b12] p-6 sm:p-8 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-lg p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-800/60 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink-100">Intake Received</h3>
              <p className="mt-2 text-sm text-ink-500">
                {role === "founder"
                  ? "We'll review your deliverable and match a vetted analyst within 24 hours."
                  : "Check your inbox for the Batch 1 SQL & Python challenge link."}
              </p>
            </div>
          ) : (
            <>
              {/* Role Toggle */}
              <div className="flex gap-2 rounded-xl bg-ink-950 p-1 border border-ink-800 mb-6">
                <button
                  type="button"
                  onClick={() => setRole("founder")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                    role === "founder"
                      ? "bg-violet-600 text-white shadow"
                      : "text-ink-500 hover:text-ink-300"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Post a Backlog (Founder)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                    role === "student"
                      ? "bg-violet-600 text-white shadow"
                      : "text-ink-500 hover:text-ink-300"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Take Assessment (Student)</span>
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink-100">
                  {role === "founder" ? "Scope a 5–15 Day Sprint" : "Apply for Batch 1 Vetting"}
                </h3>
                <p className="mt-1 text-xs text-ink-500">
                  {role === "founder"
                    ? "Escrow-protected: funds released only when deliverables pass your audit."
                    : "Zero resumes. Complete our 30-minute benchmark to unlock paid sprints."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-ink-400 mb-1">
                    YOUR NAME
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={role === "founder" ? "e.g. Rahul Sharma" : "e.g. Priya Patel"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-ink-800 bg-ink-900/60 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-700 outline-none focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-400 mb-1">
                    WORK / COLLEGE EMAIL
                  </label>
                  <input
                    required
                    type="email"
                    placeholder={role === "founder" ? "rahul@startup.com" : "priya@college.edu"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-ink-800 bg-ink-900/60 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-700 outline-none focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-400 mb-1">
                    {role === "founder" ? "BACKLOG DELIVERABLE BRIEF" : "PRIMARY ANALYTICS TOOL"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={
                      role === "founder"
                        ? "Briefly describe the dataset or dashboard you need built..."
                        : "e.g. SQL (PostgreSQL), Python (Pandas), Power BI DAX..."
                    }
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full rounded-lg border border-ink-800 bg-ink-900/60 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-700 outline-none focus:border-violet-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {role === "founder" ? "Submit Backlog Brief →" : "Request Challenge Invite →"}
                  </span>
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
