import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSongs, getSongBySlug } from "@/data/songs";
import { getChordById } from "@/data/chords";
import { Chord } from "@/types";
import PlaySong from "@/components/PlaySong";

export function generateStaticParams() {
  return getAllSongs().map((song) => ({ slug: song.slug }));
}

export default function TocarPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { modo?: string };
}) {
  const song = getSongBySlug(params.slug);
  if (!song) notFound();

  const chordsById: Record<string, Chord> = {};
  song.chordsUsed.forEach((id) => {
    const chord = getChordById(id);
    if (chord) chordsById[id] = chord;
  });

  return (
    <main className="px-5 pb-6 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href={`/musicas/${song.slug}`}
          className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full border border-border-soft bg-white text-sm dark:bg-[#1F2E3B]"
        >
          ←
        </Link>
        <span className="text-[13px] font-bold text-ink-soft">{song.title}</span>
      </div>

      <h1 className="mb-6 font-display text-[24px] font-semibold text-blue-deep">
        {searchParams.modo === "devagar" ? "Praticar devagar" : "Tocar a música"}
      </h1>

      <PlaySong song={song} chordsById={chordsById} initialSlow={searchParams.modo === "devagar"} />
    </main>
  );
}
