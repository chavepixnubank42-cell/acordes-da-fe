"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllSongs } from "@/data/songs";
import { chords } from "@/data/chords";
import { rhythms } from "@/data/rhythms";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const songResults = useMemo(() => {
    if (!q) return [];
    return getAllSongs().filter(
      (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q),
    );
  }, [q]);

  const chordResults = useMemo(() => {
    if (!q) return [];
    return chords.filter((c) => c.name.toLowerCase().includes(q) || c.id.includes(q));
  }, [q]);

  const rhythmResults = useMemo(() => {
    if (!q) return [];
    return rhythms.filter((r) => r.name.toLowerCase().includes(q));
  }, [q]);

  const hasResults = songResults.length > 0 || chordResults.length > 0 || rhythmResults.length > 0;

  return (
    <main className="px-5 pb-6 pt-7">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <h1 className="font-display text-[24px] font-semibold text-blue-deep">Buscar</h1>
      </div>

      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Música, artista, acorde ou ritmo"
        className="mb-6 w-full rounded-full border border-border-soft bg-white px-4 py-3 text-sm outline-none dark:bg-[#1F2E3B]"
      />

      {q === "" && (
        <p className="text-sm text-ink-soft">
          Digite para buscar em todo o catálogo — músicas, artistas, acordes e ritmos.
        </p>
      )}

      {q !== "" && !hasResults && (
        <p className="text-sm text-ink-soft">Nenhum resultado para "{query}".</p>
      )}

      {songResults.length > 0 && (
        <section className="mb-6">
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Músicas</p>
          <div className="flex flex-col gap-2">
            {songResults.map((song) => (
              <Link
                key={song.id}
                href={`/musicas/${song.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-border-soft bg-white p-3 dark:bg-[#1F2E3B]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card-alt">
                  🎵
                </span>
                <div>
                  <p className="text-[14px] font-bold">{song.title}</p>
                  <p className="text-[12px] text-ink-soft">{song.artist}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {chordResults.length > 0 && (
        <section className="mb-6">
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Acordes</p>
          <div className="flex flex-wrap gap-2">
            {chordResults.map((chord) => (
              <Link
                key={chord.id}
                href={`/acordes/${chord.id}`}
                className="flex items-center gap-2 rounded-full border border-border-soft bg-white py-2 pl-3 pr-4 dark:bg-[#1F2E3B]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-card-alt text-xs">
                  🎸
                </span>
                <span className="text-[13px] font-bold">{chord.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {rhythmResults.length > 0 && (
        <section className="mb-6">
          <p className="mb-3 text-[13px] font-bold text-ink-soft">Ritmos</p>
          <div className="flex flex-col gap-2">
            {rhythmResults.map((rhythm) => (
              <Link
                key={rhythm.id}
                href={`/treino/ritmos/${rhythm.id}`}
                className="flex items-center gap-3 rounded-2xl border border-border-soft bg-white p-3 dark:bg-[#1F2E3B]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card-alt">
                  🥁
                </span>
                <p className="text-[14px] font-bold">{rhythm.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
