"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chord } from "@/types";
import ChordDiagram from "@/components/ChordDiagram";

const DURATION = 60;

export default function TrocaExercise({ from, to }: { from: Chord; to: Chord }) {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [active, setActive] = useState<"from" | "to">("from");
  const [switchCount, setSwitchCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function handleStart() {
    if (finished) {
      setSecondsLeft(DURATION);
      setFinished(false);
      setSwitchCount(0);
      setActive("from");
    }
    setRunning(true);
  }

  function handlePause() {
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setFinished(false);
    setSecondsLeft(DURATION);
    setSwitchCount(0);
    setActive("from");
  }

  function handleSwitch() {
    if (!running) return;
    setActive((prev) => (prev === "from" ? "to" : "from"));
    setSwitchCount((c) => c + 1);
  }

  const activeChord = active === "from" ? from : to;

  return (
    <main className="px-5 pb-6 pt-5">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/treino"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <span className="text-[13px] font-bold text-ink-soft">Treino</span>
      </div>

      <h1 className="mb-1 font-display text-[26px] font-semibold text-blue-deep">
        {from.name} → {to.name}
      </h1>
      <p className="mb-6 text-[14px] text-ink-soft">Treine essa troca durante 60 segundos.</p>

      {!finished ? (
        <>
          <div className="mb-6 flex flex-col items-center rounded-card border border-border-soft bg-white p-6 dark:bg-[#1F2E3B]">
            <span className="mb-2 text-[13px] font-bold text-ink-soft">Tempo restante</span>
            <span className="mb-5 font-display text-[44px] font-semibold text-blue-deep">
              {secondsLeft}s
            </span>
            <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-card-alt">
              <div
                className="h-full rounded-full bg-gold transition-all"
                style={{ width: `${((DURATION - secondsLeft) / DURATION) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleSwitch}
            disabled={!running}
            className="mb-5 flex w-full flex-col items-center gap-4 rounded-card bg-blue-deep p-8 text-white disabled:opacity-50"
          >
            <ChordDiagram chord={activeChord} />
            <span className="font-display text-3xl font-semibold">{activeChord.name}</span>
            <span className="text-[12.5px] text-white/70">
              {running ? "Toque aqui quando trocar de acorde" : "Aperte iniciar para começar"}
            </span>
          </button>

          <div className="mb-6 text-center text-[13px] text-ink-soft">
            Trocas feitas: <span className="font-bold text-blue-deep">{switchCount}</span>
          </div>

          <div className="flex gap-3">
            {!running ? (
              <button
                onClick={handleStart}
                className="flex-1 rounded-full bg-blue-deep px-5 py-3 text-sm font-bold text-white"
              >
                {secondsLeft < DURATION ? "Continuar" : "Iniciar"}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 rounded-full border border-border-soft bg-white px-5 py-3 text-sm font-bold text-ink dark:bg-[#1F2E3B]"
              >
                Pausar
              </button>
            )}
            <button
              onClick={handleReset}
              className="rounded-full border border-border-soft bg-white px-5 py-3 text-sm font-bold text-ink-soft dark:bg-[#1F2E3B]"
            >
              Reiniciar
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-card bg-done p-8 text-center">
          <span className="text-3xl">✅</span>
          <p className="font-display text-xl font-semibold text-green-text">Treino concluído</p>
          <p className="text-[13.5px] text-ink-soft">
            Você trocou entre {from.name} e {to.name}{" "}
            <span className="font-bold text-ink">{switchCount}</span> vezes em 60 segundos.
          </p>
          <button
            onClick={handleStart}
            className="mt-2 rounded-full bg-blue-deep px-6 py-3 text-sm font-bold text-white"
          >
            Treinar de novo
          </button>
        </div>
      )}
    </main>
  );
}
