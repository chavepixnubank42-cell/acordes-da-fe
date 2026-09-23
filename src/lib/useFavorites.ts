"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "acordes-da-fe:favorites";

/**
 * Favoritos ficam no localStorage do navegador enquanto não existir login
 * (seção 17 do briefing). Quando a autenticação for adicionada, esta é a
 * única peça que precisa trocar — para gravar/ler via API em vez do
 * localStorage — sem mudar quem consome o hook.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // localStorage indisponível — segue com lista vazia.
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignora falha ao salvar; a sessão atual continua funcionando.
    }
  }, []);

  const isFavorite = useCallback((songId: string) => favorites.includes(songId), [favorites]);

  const toggleFavorite = useCallback(
    (songId: string) => {
      const next = favorites.includes(songId)
        ? favorites.filter((id) => id !== songId)
        : [...favorites, songId];
      persist(next);
    },
    [favorites, persist],
  );

  return { favorites, isFavorite, toggleFavorite, loaded };
}
