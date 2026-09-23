import { notFound } from "next/navigation";
import Link from "next/link";
import { rhythms, getRhythmById } from "@/data/rhythms";
import { getAllSongs } from "@/data/songs";
import RhythmPractice from "@/components/RhythmPractice";
import { Rhythm } from "@/types";

export function generateStaticParams() {
  return rhythms.map((r) => ({ id: r.id }));
}

export default function RhythmPage({ params }: { params: { id: string } }) {
  const maybeRhythm = getRhythmById(params.id);
  if (!maybeRhythm) notFound();
  const rhythm: Rhythm = maybeRhythm;

  const songsWithRhythm = getAllSongs().filter((s) => s.rhythm === rhythm.id);

  return (
    <main className="px-5 pb-6 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/treino"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <span className="text-[13px] font-bold text-ink-soft">Treino</span>
      </div>

      <h1 className="mb-1 font-display text-[26px] font-semibold text-blue-deep">{rhythm.name}</h1>
      <p className="mb-6 text-[14px] text-ink-soft">
        Contagem: {rhythm.count} · Velocidade sugerida: {rhythm.suggestedSpeed}
      </p>

      <RhythmPractice rhythm={rhythm} />

      {songsWithRhythm.length > 0 && (
        <div className="mt-7">
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Músicas que usam este ritmo</p>
          <div className="flex flex-wrap gap-2.5">
            {songsWithRhythm.map((song) => (
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
        </div>
      )}
    </main>
  );
}
