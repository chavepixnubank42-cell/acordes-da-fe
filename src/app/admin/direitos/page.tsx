import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import { RightsStatus } from "@/types";
import RightsBadge from "@/components/RightsBadge";

const groups: { status: RightsStatus; description: string }[] = [
  { status: "liberada", description: "Podem ser exibidas publicamente, incluindo letra/cifra e áudio." },
  { status: "em_analise", description: "Aguardando verificação de licença — nada é exibido publicamente ainda." },
  { status: "pessoal", description: "Uso apenas pessoal, não deve ser disponibilizado a outros usuários." },
  { status: "nao_publicar", description: "Bloqueadas — não devem aparecer publicamente sob nenhuma circunstância." },
];

export default function AdminDireitosPage() {
  const songs = getAllSongs();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-semibold text-blue-deep">Direitos autorais</h1>
      <p className="mb-6 text-sm text-ink-soft">
        Cada música tem um status de direitos que controla o que pode ser mostrado publicamente.
      </p>

      <div className="space-y-6">
        {groups.map((group) => {
          const songsInGroup = songs.filter((s) => s.rights.status === group.status);
          return (
            <section
              key={group.status}
              className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]"
            >
              <div className="mb-3 flex items-center justify-between">
                <RightsBadge status={group.status} />
                <span className="text-[12.5px] text-ink-soft">{songsInGroup.length} música(s)</span>
              </div>
              <p className="mb-4 text-[12.5px] text-ink-soft">{group.description}</p>

              {songsInGroup.length === 0 ? (
                <p className="text-[13px] text-ink-muted">Nenhuma música neste status.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {songsInGroup.map((song) => (
                    <Link
                      key={song.id}
                      href={`/admin/musicas/${song.id}`}
                      className="flex items-center justify-between rounded-xl border border-border-soft px-3.5 py-2.5"
                    >
                      <div>
                        <p className="text-[13.5px] font-bold">{song.title}</p>
                        <p className="text-[12px] text-ink-soft">{song.artist}</p>
                      </div>
                      <span className="text-[12px] font-bold text-blue-deep">Revisar →</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
