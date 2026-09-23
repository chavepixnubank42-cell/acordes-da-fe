import Link from "next/link";
import { chords } from "@/data/chords";

export default function AcordesPage() {
  return (
    <main className="px-5 pb-6 pt-7">
      <h1 className="mb-5 font-display text-[26px] font-semibold text-blue-deep">Acordes</h1>
      <div className="grid grid-cols-3 gap-3">
        {chords.map((chord) => (
          <Link
            key={chord.id}
            href={`/acordes/${chord.id}`}
            className="flex aspect-square flex-col items-center justify-center rounded-card border border-border-soft bg-white dark:bg-[#1F2E3B]"
          >
            <span className="font-display text-2xl font-semibold text-blue-deep">{chord.name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
