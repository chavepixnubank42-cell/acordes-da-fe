import { Chord } from "@/types";

/**
 * Formatos de acordes abertos padrão (domínio público — posições de dedos
 * são fatos musicais, não conteúdo autoral). Fácil de estender: basta
 * adicionar um novo objeto a este array.
 */
export const chords: Chord[] = [
  {
    id: "em",
    name: "Em",
    explanation:
      "O Em (Mi menor) é um dos acordes mais fáceis de aprender: só usa dois dedos, deixando quatro cordas soltas tocarem livremente. Por isso costuma ser o primeiro acorde ensinado a iniciantes.",
    fingers: [
      { finger: 2, string: "D", fret: 2, label: "2ª casa da corda D (4ª corda)" },
      { finger: 3, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
    ],
    openStrings: ["E6", "A", "B", "E1"],
  },
  {
    id: "g",
    name: "G",
    explanation:
      "O G (Sol maior) usa três dedos e é muito comum em músicas de louvor. Vale praticar a troca dele para o Em, já que é uma das primeiras trocas que a maioria dos alunos aprende.",
    fingers: [
      { finger: 2, string: "E6", fret: 3, label: "3ª casa da corda E grave (6ª corda)" },
      { finger: 1, string: "A", fret: 2, label: "2ª casa da corda A (5ª corda)" },
      { finger: 3, string: "E1", fret: 3, label: "3ª casa da corda E aguda (1ª corda)" },
    ],
    openStrings: ["D", "G", "B"],
  },
  {
    id: "c",
    name: "C",
    explanation:
      "O C (Dó maior) aparece em quase todo repertório iniciante. A dificuldade comum é abafar sem querer a corda solta do meio — vale praticar devagar antes de tentar trocar rápido para outro acorde.",
    fingers: [
      { finger: 3, string: "A", fret: 3, label: "3ª casa da corda A (5ª corda)" },
      { finger: 2, string: "D", fret: 2, label: "2ª casa da corda D (4ª corda)" },
      { finger: 1, string: "B", fret: 1, label: "1ª casa da corda B (2ª corda)" },
    ],
    openStrings: ["G", "E1"],
    mutedStrings: ["E6"],
  },
  {
    id: "d",
    name: "D",
    explanation:
      "O D (Ré maior) forma um pequeno triângulo com os dedos. É um acorde compacto, então preste atenção para não encostar sem querer na corda G ao lado.",
    fingers: [
      { finger: 1, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
      { finger: 3, string: "B", fret: 3, label: "3ª casa da corda B (2ª corda)" },
      { finger: 2, string: "E1", fret: 2, label: "2ª casa da corda E aguda (1ª corda)" },
    ],
    openStrings: ["D"],
    mutedStrings: ["E6", "A"],
  },
  {
    id: "am",
    name: "Am",
    explanation:
      "O Am (Lá menor) é parecido em formato com o C, o que facilita aprender os dois em sequência. É um acorde com som mais introspectivo, comum em versos mais suaves.",
    fingers: [
      { finger: 2, string: "D", fret: 2, label: "2ª casa da corda D (4ª corda)" },
      { finger: 3, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
      { finger: 1, string: "B", fret: 1, label: "1ª casa da corda B (2ª corda)" },
    ],
    openStrings: ["A", "E1"],
    mutedStrings: ["E6"],
  },
  {
    id: "dm",
    name: "Dm",
    explanation:
      "O Dm (Ré menor) tem o mesmo formato de mão do D maior, só muda uma nota — bom exercício para perceber como pequenas mudanças alteram o som do acorde.",
    fingers: [
      { finger: 1, string: "E1", fret: 1, label: "1ª casa da corda E aguda (1ª corda)" },
      { finger: 2, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
      { finger: 3, string: "B", fret: 3, label: "3ª casa da corda B (2ª corda)" },
    ],
    openStrings: ["D"],
    mutedStrings: ["E6", "A"],
  },
  {
    id: "e",
    name: "E",
    explanation:
      "O E (Mi maior) tem um som cheio, já que usa quase todas as cordas soltas ou pressionadas nas primeiras casas. É um bom acorde para ganhar confiança rápido.",
    fingers: [
      { finger: 2, string: "A", fret: 2, label: "2ª casa da corda A (5ª corda)" },
      { finger: 3, string: "D", fret: 2, label: "2ª casa da corda D (4ª corda)" },
      { finger: 1, string: "G", fret: 1, label: "1ª casa da corda G (3ª corda)" },
    ],
    openStrings: ["E6", "B", "E1"],
  },
  {
    id: "a",
    name: "A",
    explanation:
      "O A (Lá maior) exige que três dedos fiquem lado a lado na mesma casa — um bom treino de coordenação para quem está começando.",
    fingers: [
      { finger: 1, string: "D", fret: 2, label: "2ª casa da corda D (4ª corda)" },
      { finger: 2, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
      { finger: 3, string: "B", fret: 2, label: "2ª casa da corda B (2ª corda)" },
    ],
    openStrings: ["A", "E1"],
    mutedStrings: ["E6"],
  },
  {
    id: "f",
    name: "F",
    explanation:
      "O F (Fá maior) é o primeiro acorde com pestana que a maioria dos alunos encontra: o dedo indicador pressiona todas as cordas de uma vez na 1ª casa. É normal levar mais tempo para soar limpo — vale a pena não pular direto para ele antes de dominar os acordes abertos.",
    fingers: [
      { finger: 1, string: "E6", fret: 1, label: "pestana na 1ª casa, cobrindo todas as cordas" },
      { finger: 2, string: "G", fret: 2, label: "2ª casa da corda G (3ª corda)" },
      { finger: 3, string: "A", fret: 3, label: "3ª casa da corda A (5ª corda)" },
      { finger: 4, string: "D", fret: 3, label: "3ª casa da corda D (4ª corda)" },
    ],
    openStrings: [],
    barre: { fret: 1, fromString: "E6", toString: "E1" },
  },
];

export function getChordById(id: string): Chord | undefined {
  return chords.find((c) => c.id === id);
}

export function getChordsBySongIds(ids: string[]): Chord[] {
  return ids.map(getChordById).filter((c): c is Chord => Boolean(c));
}
