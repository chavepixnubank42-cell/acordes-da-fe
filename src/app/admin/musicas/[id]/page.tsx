import { notFound } from "next/navigation";
import { getAllSongs } from "@/data/songs";
import { chords } from "@/data/chords";
import { rhythms } from "@/data/rhythms";
import SongForm from "@/components/SongForm";

export function generateStaticParams() {
  return getAllSongs().map((s) => ({ id: s.id }));
}

export default function EditarMusicaPage({ params }: { params: { id: string } }) {
  const song = getAllSongs().find((s) => s.id === params.id);
  if (!song) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-blue-deep">{song.title}</h1>
      <SongForm song={song} allChords={chords} allRhythms={rhythms} />
    </div>
  );
}
