import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import RightsBadge from "@/components/RightsBadge";

const difficultyLabels = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function AdminMusicasPage() {
  const songs = getAllSongs();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-blue-deep">Músicas</h1>
        <Link
          href="/admin/musicas/novo"
          className="rounded-full bg-blue-deep px-5 py-2.5 text-sm font-bold text-white"
        >
          + Nova música
        </Link>
      </div>

      <div className="overflow-hidden rounded-card border border-border-soft bg-white dark:bg-[#1F2E3B]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-soft text-[12px] font-bold text-ink-soft">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Artista</th>
              <th className="px-4 py-3">Nível</th>
              <th className="px-4 py-3">Direitos</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-b border-border-soft last:border-none">
                <td className="px-4 py-3 font-bold">{song.title}</td>
                <td className="px-4 py-3 text-ink-soft">{song.artist}</td>
                <td className="px-4 py-3 text-ink-soft">{difficultyLabels[song.difficulty]}</td>
                <td className="px-4 py-3">
                  <RightsBadge status={song.rights.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/musicas/${song.id}`} className="font-bold text-blue-deep">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
