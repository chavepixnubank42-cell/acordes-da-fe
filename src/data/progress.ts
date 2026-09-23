import { SongProgress, UserStats } from "@/types";

/**
 * Antes de existir login, todo progresso é gravado sob este userId fixo.
 * Quando a autenticação for adicionada (seção 17 do briefing), só o
 * valor de LOCAL_USER_ID muda para o id real da conta — nada mais
 * no restante do app precisa ser alterado.
 */
export const LOCAL_USER_ID = "usuario-local";

export const songProgress: SongProgress[] = [
  {
    userId: LOCAL_USER_ID,
    songId: "maranata",
    steps: { chords: true, chordChanges: true, rhythm: true, slowPractice: true, fullSong: false },
  },
  {
    userId: LOCAL_USER_ID,
    songId: "oceanos",
    steps: { chords: true, chordChanges: true, rhythm: false, slowPractice: false, fullSong: false },
  },
  {
    userId: LOCAL_USER_ID,
    songId: "ousado-amor",
    steps: { chords: true, chordChanges: true, rhythm: true, slowPractice: true, fullSong: true },
  },
  {
    userId: LOCAL_USER_ID,
    songId: "bondade-de-deus",
    steps: { chords: true, chordChanges: false, rhythm: false, slowPractice: false, fullSong: false },
  },
];

export const userStats: UserStats = {
  userId: LOCAL_USER_ID,
  chordsLearned: 8,
  songsStudied: 4,
  rhythmsPracticed: 3,
  practiceDaysStreak: 12,
};

export function getSongProgress(songId: string): SongProgress | undefined {
  return songProgress.find((p) => p.songId === songId && p.userId === LOCAL_USER_ID);
}

/** Converte o checklist de etapas em uma porcentagem (cada etapa vale 20%). */
export function progressPercentage(progress?: SongProgress): number {
  if (!progress) return 0;
  const steps = Object.values(progress.steps);
  const done = steps.filter(Boolean).length;
  return Math.round((done / steps.length) * 100);
}
