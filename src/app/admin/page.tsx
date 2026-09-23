import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import { chords } from "@/data/chords";
import { rhythms } from "@/data/rhythms";

export default function AdminHomePage() {
  const songs = getAllSongs();
  const pendingRights = songs.filter((s) => s.rights.status === "em_analise").length;

  const cards = [
    { label: "Músicas cadastradas", value: songs.length, href: "/admin/musicas" },
    { label: "Acordes", value: chords.length, href: "/admin/musicas" },
    { label: "Ritmos", value: rhythms.length, href: "/admin/musicas" },
    { label: "Aguardando revisão de direitos", value: pendingRights, href: "/admin/direitos" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-blue-deep">Painel administrativo</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]"
          >
            <p className="font-display text-3xl font-semibold text-blue-deep">{c.value}</p>
            <p className="mt-1 text-[13px] text-ink-soft">{c.label}</p>
          </Link>
        ))}
      </div>

      {pendingRights > 0 && (
        <div className="mt-6 rounded-card border border-gold/40 bg-gold/10 p-5">
          <p className="text-sm">
            🟡 Há <b>{pendingRights}</b> música(s) com status "Em análise" — nenhuma delas pode
            exibir letra, cifra ou áudio publicamente até que a licença seja confirmada. Revise em{" "}
            <Link href="/admin/direitos" className="font-bold text-blue-deep underline">
              Direitos autorais
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
