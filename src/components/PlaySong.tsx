"use client";

import { useState } from "react";
import { Song, Chord } from "@/types";
import ChordDiagram from "@/components/ChordDiagram";

const sectionLabels: Record<string, string> = {
  intro: "Introdução",
  verso: "Verso",
  refrao: "Refrão",
};

export default function PlaySong({
  song,
  chordsById,
  initialSlow,
}: {
  song: Song;
  chordsById: Record<string, Chord>;
  initialSlow: boolean;
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [chordIndex, setChordIndex] = useState(0);
  const [slow, setSlow] = useState(initialSlow);

  const section = song.structure[sectionIndex];
  const chordId = section?.chords[chordIndex];
  const chord = chordId ? chordsById[chordId] : undefined;

  const isFirst = sectionIndex === 0 && chordIndex === 0;
  const isLast =
    sectionIndex === song.structure.length - 1 &&
    chordIndex === (section?.chords.length ?? 1) - 1;

  function goNext() {
    if (!section) return;
    if (chordIndex < section.chords.length - 1) {
      setChordIndex(chordIndex + 1);
    } else if (sectionIndex < song.structure.length - 1) {
      setSectionIndex(sectionIndex + 1);
      setChordIndex(0);
    }
  }

  function goPrev() {
    if (chordIndex > 0) {
      setChordIndex(chordIndex - 1);
    } else if (sectionIndex > 0) {
      const prevSection = song.structure[sectionIndex - 1];
      setSectionIndex(sectionIndex - 1);
      setChordIndex(prevSection.chords.length - 1);
    }
  }

  if (!section || !chord) {
    return <p className="text-sm text-ink-soft">Esta música ainda não tem uma estrutura cadastrada.</p>;
  }

  return (
    <div>
      <div className="mb-5 flex gap-3">
        <button
          onClick={() => setSlow(true)}
          className={`flex-1 rounded-full border px-4 py-2.5 text-[13px] font-bold ${
            slow
              ? "border-blue-deep bg-blue-deep text-white"
              : "border-border-soft bg-white text-ink-soft dark:bg-[#1F2E3B]"
          }`}
        >
          Devagar
        </button>
        <button
          onClick={() => setSlow(false)}
          className={`flex-1 rounded-full border px-4 py-2.5 text-[13px] font-bold ${
            !slow
              ? "border-blue-deep bg-blue-deep text-white"
              : "border-border-soft bg-white text-ink-soft dark:bg-[#1F2E3B]"
          }`}
        >
          Velocidade normal
        </button>
      </div>

      <div className="mb-4 flex justify-center gap-1.5">
        {song.structure.map((s, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i === sectionIndex ? "bg-blue-deep" : i < sectionIndex ? "bg-green" : "bg-card-alt"
            }`}
          />
        ))}
      </div>

      <div className="mb-6 flex flex-col items-center rounded-card border border-border-soft bg-white p-6 dark:bg-[#1F2E3B]">
        <span className="mb-3 text-[13px] font-bold text-ink-soft">
          {sectionLabels[section.section] ?? section.section} · acorde {chordIndex + 1} de{" "}
          {section.chords.length}
        </span>
        <ChordDiagram chord={chord} />
        <span className="mt-3 font-display text-3xl font-semibold text-blue-deep">{chord.name}</span>
        {slow && (
          <span className="mt-2 text-[12.5px] text-ink-soft">
            Toque no seu ritmo, sem pressa, antes de avançar
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex-1 rounded-full border border-border-soft bg-white px-5 py-3 text-sm font-bold text-ink-soft disabled:opacity-40 dark:bg-[#1F2E3B]"
        >
          Anterior
        </button>
        <button
          onClick={goNext}
          disabled={isLast}
          className="flex-1 rounded-full bg-blue-deep px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {isLast ? "Fim da música" : "Próximo acorde"}
        </button>
      </div>
    </div>
  );
}
