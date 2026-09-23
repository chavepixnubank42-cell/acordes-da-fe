import Link from "next/link";
import { getAllSongs, getSongBySlug } from "@/data/songs";
import { getSongProgress, progressPercentage } from "@/data/progress";
import ProgressBar from "@/components/ProgressBar";
import SongCard from "@/components/SongCard";

const shortcuts = [
  { href: "/musicas", icon: "🎸", label: "Aprender uma música" },
  { href: "/acordes", icon: "🎼", label: "Estudar acordes" },
  { href: "/treino", icon: "🥁", label: "Treinar ritmos" },
  { href: "/progresso", icon: "📈", label: "Ver meu progresso" },
];

export default function HomePage() {
  const songs = getAllSongs();

  // "Continue aprendendo": a música com progresso entre 1% e 99%, mais recente.
  const inProgress = songs.find((s) => {
    const p = progressPercentage(getSongProgress(s.id));
    return p > 0 && p < 100;
  });
  const inProgressPct = inProgress ? progressPercentage(getSongProgress(inProgress.id)) : 0;

  const recentSongs = songs.slice(0, 3);

  return (
    <main className="px-5 pb-6 pt-7">
      <header className="mb-7 flex items-center gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-card-alt text-2xl">
          🎸
        </div>
        <div>
          <h1 className="font-display text-[26px] font-semibold leading-tight text-blue-deep">
            Acordes da Fé
          </h1>
          <p className="font-display text-[15px] italic text-ink-soft">
            Aprenda. Toque. Louve.
          </p>
        </div>
      </header>

      {inProgress && (
        <section className="mb-7">
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Continue aprendendo</p>
          <div className="rounded-card bg-blue-deep p-5 text-white">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-display text-[19px] font-medium">{inProgress.title}</p>
                <p className="text-[13px] text-white/70">{inProgress.artist}</p>
              </div>
              <span className="font-display text-[22px] font-semibold text-gold">
                {inProgressPct}%
              </span>
            </div>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gold" style={{ width: `${inProgressPct}%` }} />
            </div>
            <Link
              href={`/musicas/${inProgress.slug}`}
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-deep"
            >
              Continuar
            </Link>
          </div>
        </section>
      )}

      <section className="mb-7">
        <p className="mb-3 text-[13px] font-bold text-ink-soft">O que você quer fazer?</p>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex flex-col gap-2.5 rounded-card border border-border-soft bg-white p-4 dark:bg-[#1F2E3B]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card-alt text-lg">
                {s.icon}
              </div>
              <p className="text-[14.5px] font-bold leading-tight">{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-bold text-ink-soft">Suas músicas</p>
          <Link href="/favoritos" className="text-[12.5px] font-bold text-blue-deep">
            ⭐ Favoritas
          </Link>
        </div>
        <div>
          {recentSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </main>
  );
}
