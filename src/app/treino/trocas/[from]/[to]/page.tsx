import { notFound } from "next/navigation";
import { getChordById } from "@/data/chords";
import TrocaExercise from "@/components/TrocaExercise";

export default function TrocaPage({ params }: { params: { from: string; to: string } }) {
  const from = getChordById(params.from);
  const to = getChordById(params.to);
  if (!from || !to) notFound();

  return <TrocaExercise from={from} to={to} />;
}
