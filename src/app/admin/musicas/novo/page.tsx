import { chords } from "@/data/chords";
import { rhythms } from "@/data/rhythms";
import SongForm from "@/components/SongForm";

export default function NovaMusicaPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-blue-deep">Nova música</h1>
      <SongForm allChords={chords} allRhythms={rhythms} />
    </div>
  );
}
