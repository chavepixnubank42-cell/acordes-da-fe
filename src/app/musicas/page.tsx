"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import { Difficulty } from "@/types";
import SongCard from "@/components/SongCard";

const difficultyLabels: Record<Difficulty, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function MusicasPage() {
  const allSongs = getAllSongs();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "todas">("todas");

  const songs = useMemo(() => {
    return allSongs.filter((song) => {
      const matchesQuery =
        query.trim() === "" ||
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty = difficulty === "todas" || song.difficulty === difficulty;
      return matchesQuery && matchesDifficulty;
    });
  }, [allSongs, query, difficulty]);

  return (
    <main className="px-5 pb-6 pt-7">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-[26px] font-semibold text-blue-deep">Músicas</h1>
        <Link href="/favoritos" className="text-[12.5px] font-bold text-blue-deep">
          ⭐ Favoritas
        </Link>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nome ou artista"
        className="mb-3 w-full rounded-full border border-border-soft bg-white px-4 py-2.5 text-sm outline-none dark:bg-[#1F2E3B]"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {(["todas", "iniciante", "intermediario", "avancado"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold ${
              difficulty === level
                ? "border-blue-deep bg-blue-deep text-white"
                : "border-border-soft bg-white text-ink-soft dark:bg-[#1F2E3B]"
            }`}
          >
            {level === "todas" ? "Todas" : difficultyLabels[level]}
          </button>
        ))}
      </div>

      {songs.length === 0 ? (
        <p className="text-sm text-ink-soft">Nenhuma música encontrada.</p>
      ) : (
        <div>
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </main>
  );
}
