import { SongProgress, UserStats } from "@/types";

/**
 * Antes de existir login, todo progresso é gravado sob este userId fixo.
 * Quando a autenticação for adicionada (seção 17 do briefing), só o
 * valor de LOCAL_USER_ID muda para o id real da conta — nada mais
 * no restante do app precisa ser alterado.
 */
export const LOCAL_USER_ID = "usuario-local";

// Nenhum progresso de exemplo — todo mundo começa do zero.
export const songProgress: SongProgress[] = [];

export const userStats: UserStats = {
  userId: LOCAL_USER_ID,
  chordsLearned: 0,
  songsStudied: 0,
  rhythmsPracticed: 0,
  practiceDaysStreak: 0,
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
