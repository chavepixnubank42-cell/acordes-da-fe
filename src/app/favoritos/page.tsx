"use client";

import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import { useFavorites } from "@/lib/useFavorites";
import SongCard from "@/components/SongCard";

export default function FavoritosPage() {
  const { favorites, loaded } = useFavorites();
  const songs = getAllSongs().filter((s) => favorites.includes(s.id));

  return (
    <main className="px-5 pb-6 pt-7">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/musicas"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <h1 className="font-display text-[26px] font-semibold text-blue-deep">⭐ Minhas favoritas</h1>
      </div>

      {!loaded ? null : songs.length === 0 ? (
        <p className="text-sm text-ink-soft">
          Você ainda não favoritou nenhuma música. Toque na estrela ☆ ao lado de uma música para
          guardá-la aqui.
        </p>
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
