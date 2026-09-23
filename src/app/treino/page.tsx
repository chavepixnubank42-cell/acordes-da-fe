import Link from "next/link";
import { rhythms } from "@/data/rhythms";

const arrowSymbol = { down: "↓", up: "↑" } as const;

export default function TreinoPage() {
  return (
    <main className="px-5 pb-6 pt-7">
      <h1 className="mb-5 font-display text-[26px] font-semibold text-blue-deep">Treino</h1>

      <p className="mb-3 text-[13px] font-bold text-ink-soft">Ritmos</p>
      <div className="flex flex-col gap-2.5">
        {rhythms.map((rhythm) => (
          <Link
            key={rhythm.id}
            href={`/treino/ritmos/${rhythm.id}`}
            className="rounded-card border border-border-soft bg-white p-4 dark:bg-[#1F2E3B]"
          >
            <p className="mb-1 text-[14.5px] font-bold">{rhythm.name}</p>
            <p className="mb-2 font-display text-lg tracking-wide text-blue-deep">
              {rhythm.pattern.map((a) => arrowSymbol[a]).join(" ")}
            </p>
            <p className="text-[12.5px] text-ink-soft">
              Contagem: {rhythm.count} · Velocidade sugerida: {rhythm.suggestedSpeed}
            </p>
          </Link>
        ))}
      </div>

      <p className="mb-3 mt-7 text-[13px] font-bold text-ink-soft">Treino de trocas</p>
      <p className="text-sm text-ink-soft">
        Escolha uma música ou um acorde para começar um exercício de troca dirigido.
      </p>
    </main>
  );
}
