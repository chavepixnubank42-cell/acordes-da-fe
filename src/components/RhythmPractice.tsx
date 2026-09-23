"use client";

import { useEffect, useRef, useState } from "react";
import { Rhythm } from "@/types";

const arrowSymbol = { down: "↓", up: "↑" } as const;
const speedMs = { normal: 500, devagar: 950 };

export default function RhythmPractice({ rhythm }: { rhythm: Rhythm }) {
  const [mode, setMode] = useState<"normal" | "devagar">("devagar");
  const [running, setRunning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;

    setActiveIndex(0);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rhythm.pattern.length);
    }, speedMs[mode]);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode, rhythm.pattern.length]);

  function toggleRunning() {
    if (running) {
      setRunning(false);
      setActiveIndex(-1);
    } else {
      setRunning(true);
    }
  }

  return (
    <div>
      <div className="mb-5 flex justify-center gap-3 rounded-card border border-border-soft bg-white py-8 dark:bg-[#1F2E3B]">
        {rhythm.pattern.map((arrow, i) => (
          <span
            key={i}
            className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-2xl font-semibold transition-colors ${
              i === activeIndex
                ? "bg-gold text-white"
                : "bg-card-alt text-blue-deep"
            }`}
          >
            {arrowSymbol[arrow]}
          </span>
        ))}
      </div>

      <div className="mb-5 flex gap-3">
        <button
          onClick={() => setMode("devagar")}
          className={`flex-1 rounded-full border px-4 py-2.5 text-[13px] font-bold ${
            mode === "devagar"
              ? "border-blue-deep bg-blue-deep text-white"
              : "border-border-soft bg-white text-ink-soft dark:bg-[#1F2E3B]"
          }`}
        >
          Devagar
        </button>
        <button
          onClick={() => setMode("normal")}
          className={`flex-1 rounded-full border px-4 py-2.5 text-[13px] font-bold ${
            mode === "normal"
              ? "border-blue-deep bg-blue-deep text-white"
              : "border-border-soft bg-white text-ink-soft dark:bg-[#1F2E3B]"
          }`}
        >
          Velocidade normal
        </button>
      </div>

      <button
        onClick={toggleRunning}
        className="w-full rounded-full bg-blue-deep px-5 py-3 text-sm font-bold text-white"
      >
        {running ? "Parar" : "Praticar o padrão"}
      </button>
    </div>
  );
}
