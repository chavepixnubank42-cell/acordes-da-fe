import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSongs, getSongBySlug } from "@/data/songs";
import { getSongProgress, progressPercentage } from "@/data/progress";
import ProgressBar from "@/components/ProgressBar";

export function generateStaticParams() {
  return getAllSongs().map((song) => ({ slug: song.slug }));
}

const difficultyLabels = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const steps = [
  { key: "chords" as const, order: 1, title: "Aprender acordes" },
  { key: "chordChanges" as const, order: 2, title: "Treinar troca de acordes" },
  { key: "rhythm" as const, order: 3, title: "Aprender o ritmo" },
  { key: "slowPractice" as const, order: 4, title: "Praticar devagar" },
  { key: "fullSong" as const, order: 5, title: "Tocar a música" },
];

export default function SongPage({ params }: { params: { slug: string } }) {
  const song = getSongBySlug(params.slug);
  if (!song) notFound();

  const progress = getSongProgress(song.id);
  const percentage = progressPercentage(progress);

  // A etapa "atual" é a primeira ainda não concluída.
  const currentIndex = steps.findIndex((s) => !progress?.steps[s.key]);

  function stepHref(key: (typeof steps)[number]["key"]): string | undefined {
    if (key === "chords" && song.chordsUsed[0]) {
      return `/acordes/${song.chordsUsed[0]}`;
    }
    if (key === "chordChanges" && song.chordsUsed.length >= 2) {
      return `/treino/trocas/${song.chordsUsed[0]}/${song.chordsUsed[1]}`;
    }
    if (key === "rhythm") {
      return `/treino/ritmos/${song.rhythm}`;
    }
    if (key === "slowPractice") {
      return `/musicas/${song.slug}/tocar?modo=devagar`;
    }
    if (key === "fullSong") {
      return `/musicas/${song.slug}/tocar`;
    }
    return undefined;
  }

  return (
    <main className="px-5 pb-6 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/musicas"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <span className="text-[13px] font-bold text-ink-soft">Músicas</span>
      </div>

      <div className="mb-5">
        <h1 className="font-display text-[28px] font-semibold leading-tight text-blue-deep">
          {song.title}
        </h1>
        <p className="mb-3.5 text-[14.5px] text-ink-soft">{song.artist}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-card-alt px-3 py-1.5 text-xs font-bold text-blue-deep">
            {difficultyLabels[song.difficulty]}
          </span>
          <span className="rounded-full bg-card-alt px-3 py-1.5 text-xs font-bold text-blue-deep">
            Tom: {song.key}
          </span>
          {song.capo && (
            <span className="rounded-full bg-gold/20 px-3 py-1.5 text-xs font-bold text-[#8A6A2E]">
              Capo {song.capo}ª casa
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[13.5px] font-bold text-ink-soft">Seu progresso nesta música</span>
          <span className="font-display text-xl font-semibold text-blue-deep">{percentage}%</span>
        </div>
        <ProgressBar percentage={percentage} />
      </div>

      <p className="mb-3 text-[13px] font-bold text-ink-soft">Trilha de aprendizado</p>
      <div className="flex flex-col gap-2.5">
        {steps.map((step, index) => {
          const done = progress?.steps[step.key] ?? false;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className={`flex items-center gap-3.5 rounded-card border p-4 ${
                isCurrent
                  ? "border-transparent bg-blue-deep text-white"
                  : done
                    ? "border-transparent bg-done"
                    : "border-border-soft bg-white opacity-60 dark:bg-[#1F2E3B]"
              }`}
            >
              <div
                className={`flex h-9.5 w-9.5 flex-shrink-0 items-center justify-center rounded-xl ${
                  isCurrent ? "bg-white/15" : "bg-card-alt"
                }`}
              >
                {done ? "✅" : step.order}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[14.5px] font-bold ${isCurrent ? "text-white" : ""}`}>
                  {step.order}. {step.title}
                </p>
              </div>
              {isCurrent &&
                (stepHref(step.key) ? (
                  <Link
                    href={stepHref(step.key)!}
                    className="flex-shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-blue-deep"
                  >
                    Começar
                  </Link>
                ) : (
                  <button className="flex-shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-blue-deep">
                    Começar
                  </button>
                ))}
              {done && !isCurrent && (
                <span className="flex-shrink-0 text-xs font-bold text-green-text">Concluído</span>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
