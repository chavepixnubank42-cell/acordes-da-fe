import { notFound } from "next/navigation";
import Link from "next/link";
import { chords, getChordById } from "@/data/chords";
import { getAllSongs } from "@/data/songs";
import ChordDiagram from "@/components/ChordDiagram";
import { Chord } from "@/types";

export function generateStaticParams() {
  return chords.map((c) => ({ id: c.id }));
}

const fingerNames: Record<number, string> = {
  1: "indicador",
  2: "médio",
  3: "anelar",
  4: "mínimo",
};

export default function ChordPage({ params }: { params: { id: string } }) {
  const maybeChord = getChordById(params.id);
  if (!maybeChord) notFound();
  // Ver comentário equivalente em musicas/[slug]/page.tsx: funções/callbacks
  // aninhados abaixo não herdam o estreitamento de tipo do "if" acima.
  const chord: Chord = maybeChord;

  const songsWithChord = getAllSongs().filter((s) => s.chordsUsed.includes(chord.id));

  // Encontra outro acorde que aparece junto com este em alguma música,
  // para sugerir um par de treino relevante.
  const pairChordId =
    songsWithChord
      .flatMap((s) => s.chordsUsed)
      .find((id) => id !== chord.id) ?? chords.find((c) => c.id !== chord.id)?.id;

  return (
    <main className="px-5 pb-6 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/acordes"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <span className="text-[13px] font-bold text-ink-soft">Acordes</span>
      </div>

      <h1 className="mb-5 font-display text-[40px] font-semibold text-blue-deep">{chord.name}</h1>

      <div className="mb-5 flex justify-center rounded-card border border-border-soft bg-white p-6 dark:bg-[#1F2E3B]">
        <ChordDiagram chord={chord} />
      </div>

      <div className="mb-6 rounded-card bg-card-alt p-4">
        <p className="text-sm leading-relaxed">{chord.explanation}</p>
      </div>

      <p className="mb-3 text-[13px] font-bold text-ink-soft">Posição dos dedos</p>
      <div className="mb-6 flex flex-col gap-2">
        {chord.fingers.map((f) => (
          <div
            key={`${f.string}-${f.finger}`}
            className="flex items-center gap-3 rounded-2xl border border-border-soft bg-white p-3.5 dark:bg-[#1F2E3B]"
          >
            <div className="flex h-6.5 w-6.5 flex-shrink-0 items-center justify-center rounded-full bg-blue-deep text-xs font-bold text-white">
              {f.finger}
            </div>
            <p className="text-[13.5px]">
              Dedo <b>{fingerNames[f.finger]}</b> na {f.label}
            </p>
          </div>
        ))}
      </div>

      {songsWithChord.length > 0 && (
        <>
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Músicas que usam este acorde</p>
          <div className="mb-6 flex flex-wrap gap-2.5">
            {songsWithChord.map((song) => (
              <Link
                key={song.id}
                href={`/musicas/${song.slug}`}
                className="flex items-center gap-2 rounded-full border border-border-soft bg-white py-2 pl-2 pr-3.5 dark:bg-[#1F2E3B]"
              >
                <span className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-card-alt text-xs">
                  🎵
                </span>
                <span className="text-[12.5px] font-bold">{song.title}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-between gap-3 rounded-card bg-blue-deep p-5">
        <div>
          <p className="mb-0.5 text-[14.5px] font-bold text-white">Exercício de troca</p>
          <p className="text-[12.5px] text-white/70">Pratique {chord.name} junto com outro acorde</p>
        </div>
        {pairChordId ? (
          <Link
            href={`/treino/trocas/${chord.id}/${pairChordId}`}
            className="flex-shrink-0 rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-blue-deep"
          >
            Treinar
          </Link>
        ) : null}
      </div>
    </main>
  );
}
