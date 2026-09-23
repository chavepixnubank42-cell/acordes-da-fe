export type Difficulty = "iniciante" | "intermediario" | "avancado";

export type RightsStatus =
  | "liberada" // 🟢 pode ser exibida publicamente
  | "em_analise" // 🟡 licença/autorização em andamento
  | "pessoal" // 🔵 conteúdo apenas para uso pessoal
  | "nao_publicar"; // 🔴 não disponibilizar publicamente

export interface SongRights {
  status: RightsStatus;
  composer?: string;
  source?: string;
  license?: string;
  notes?: string;
  /** Controla se audioUrl/lyricsChordSheet podem ser exibidos na UI. */
  publiclyVisible: boolean;
}

export interface ChordFinger {
  finger: 1 | 2 | 3 | 4;
  string: "E6" | "A" | "D" | "G" | "B" | "E1"; // E6 = mi grave, E1 = mi agudo
  fret: number;
  label: string; // descrição em linguagem simples, ex: "2ª casa da corda D"
}

export interface Chord {
  id: string; // ex: "em", "g", "c"
  name: string; // ex: "Em", "G", "C"
  explanation: string;
  fingers: ChordFinger[];
  openStrings: string[]; // cordas tocadas soltas, ex: ["E6","A","B","E1"]
  mutedStrings?: string[];
  barre?: { fret: number; fromString: string; toString: string };
}

export type RhythmArrow = "down" | "up";

export interface Rhythm {
  id: string;
  name: string;
  pattern: RhythmArrow[];
  count: string; // ex: "1 e 2 e 3 e 4 e"
  suggestedSpeed: string; // ex: "lento", "moderado"
}

export interface SongStructureSection {
  section: string; // "intro" | "verso" | "refrao" | ...
  chords: string[]; // ids de Chord, na ordem
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  artist: string;
  difficulty: Difficulty;
  key: string; // tom, ex: "G"
  capo?: number;
  category: string[];
  chordsUsed: string[]; // ids de Chord
  rhythm: string; // id de Rhythm
  structure: SongStructureSection[];
  rights: SongRights;
  audioUrl?: string;
  lyricsChordSheet?: string;
}

export interface SongProgress {
  userId: string;
  songId: string;
  steps: {
    chords: boolean;
    chordChanges: boolean;
    rhythm: boolean;
    slowPractice: boolean;
    fullSong: boolean;
  };
}

export interface UserStats {
  userId: string;
  chordsLearned: number;
  songsStudied: number;
  rhythmsPracticed: number;
  practiceDaysStreak: number;
}

/** Base para o futuro treino inteligente / professor virtual (seções 9 e 11 do briefing). */
export interface ChordPairDifficulty {
  userId: string;
  from: string; // Chord.id
  to: string; // Chord.id
  attempts: number;
  strugglingScore: number; // 0-1, quanto maior, mais dificuldade
}
