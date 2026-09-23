import { userStats } from "@/data/progress";

const stats = [
  { icon: "🎸", label: "Acordes aprendidos", key: "chordsLearned" as const },
  { icon: "🎵", label: "Músicas estudadas", key: "songsStudied" as const },
  { icon: "🥁", label: "Ritmos praticados", key: "rhythmsPracticed" as const },
  { icon: "🔥", label: "Dias de prática", key: "practiceDaysStreak" as const },
];

export default function ProgressoPage() {
  return (
    <main className="px-5 pb-6 pt-7">
      <h1 className="mb-5 font-display text-[26px] font-semibold text-blue-deep">Seu progresso</h1>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.key}
            className="rounded-card border border-border-soft bg-white p-4 dark:bg-[#1F2E3B]"
          >
            <div className="mb-2 text-xl">{s.icon}</div>
            <p className="font-display text-2xl font-semibold text-blue-deep">{userStats[s.key]}</p>
            <p className="text-[12.5px] text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
