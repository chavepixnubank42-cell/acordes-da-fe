"use client";

import Link from "next/link";
import { Song } from "@/types";
import { getSongProgress, progressPercentage } from "@/data/progress";
import { useFavorites } from "@/lib/useFavorites";

const difficultyStars: Record<Song["difficulty"], string> = {
  iniciante: "⭐",
  intermediario: "⭐⭐",
  avancado: "⭐⭐⭐",
};

export default function SongCard({ song }: { song: Song }) {
  const percentage = progressPercentage(getSongProgress(song.id));
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(song.id);

  return (
    <div className="flex items-center gap-2 border-b border-border-soft py-3 last:border-none">
      <Link href={`/musicas/${song.slug}`} className="flex min-w-0 flex-1 items-center gap-3.5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-card-alt text-lg">
          🎵
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-bold">{song.title}</p>
          <p className="text-[12.5px] text-ink-soft">
            {song.artist} · {difficultyStars[song.difficulty]}
          </p>
        </div>
        <span
          className={`flex-shrink-0 font-display text-sm font-semibold ${
            percentage === 100 ? "text-green-text" : "text-blue-deep"
          }`}
        >
          {percentage}%
        </span>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(song.id);
        }}
        aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-lg"
      >
        {favorited ? "⭐" : "☆"}
      </button>
    </div>
  );
}
