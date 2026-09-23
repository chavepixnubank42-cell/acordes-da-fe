import { Rhythm } from "@/types";

export const rhythms: Rhythm[] = [
  {
    id: "balada-basica",
    name: "Balada básica",
    pattern: ["down", "down", "up", "up", "down", "up"],
    count: "1 . 2 e 3 e",
    suggestedSpeed: "moderado",
  },
  {
    id: "worship-lento",
    name: "Worship lento",
    pattern: ["down", "up", "down", "up"],
    count: "1 e 2 e",
    suggestedSpeed: "lento",
  },
  {
    id: "ritmo-simples",
    name: "Ritmo simples (só descidas)",
    pattern: ["down", "down", "down", "down"],
    count: "1 2 3 4",
    suggestedSpeed: "lento",
  },
];

export function getRhythmById(id: string): Rhythm | undefined {
  return rhythms.find((r) => r.id === id);
}
