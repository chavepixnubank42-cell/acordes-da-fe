import { Song } from "@/types";

/**
 * Catálogo inicial. Todas as músicas comerciais começam com
 * status "em_analise" e publiclyVisible: false por padrão — nenhuma
 * letra/cifra ou áudio deve ser publicada sem que a licença de cada
 * uma seja resolvida individualmente (ver seção 21/22 do briefing).
 * A UI deve sempre checar `rights.publiclyVisible` antes de mostrar
 * `lyricsChordSheet` ou `audioUrl`.
 */
export const songs: Song[] = [
  {
    id: "maranata",
    slug: "maranata",
    title: "Maranata",
    artist: "Avivah",
    difficulty: "intermediario",
    key: "G",
    capo: 2,
    category: ["adoracao"],
    chordsUsed: ["g", "d", "em", "c"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["g", "d", "em", "c"] },
      { section: "verso", chords: ["g", "d", "em", "c"] },
      { section: "refrao", chords: ["em", "c", "g", "d"] },
    ],
    rights: {
      status: "em_analise",
      composer: "a confirmar",
      source: "a confirmar",
      notes: "Aguardando verificação de licença antes de qualquer publicação.",
      publiclyVisible: false,
    },
  },
  {
    id: "todas-as-coisas",
    slug: "todas-as-coisas",
    title: "Todas as Coisas",
    artist: "Fernandinho",
    difficulty: "iniciante",
    key: "D",
    category: ["louvor"],
    chordsUsed: ["d", "g", "a", "em"],
    rhythm: "balada-basica",
    structure: [
      { section: "intro", chords: ["d", "g", "a", "em"] },
      { section: "verso", chords: ["d", "g", "a", "em"] },
      { section: "refrao", chords: ["g", "d", "em", "a"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "eu-cuido-de-ti",
    slug: "eu-cuido-de-ti",
    title: "Eu Cuido de Ti",
    artist: "Amanda",
    difficulty: "iniciante",
    key: "C",
    category: ["adoracao"],
    chordsUsed: ["c", "am", "f", "g"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["c", "am", "f", "g"] },
      { section: "verso", chords: ["c", "am", "f", "g"] },
      { section: "refrao", chords: ["f", "c", "g", "am"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "e-tudo-sobre-voce",
    slug: "e-tudo-sobre-voce",
    title: "É Tudo Sobre Você",
    artist: "Morada",
    difficulty: "intermediario",
    key: "G",
    category: ["adoracao"],
    chordsUsed: ["g", "em", "c", "d"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["g", "em", "c", "d"] },
      { section: "verso", chords: ["g", "em", "c", "d"] },
      { section: "refrao", chords: ["c", "g", "d", "em"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "ousado-amor",
    slug: "ousado-amor",
    title: "Ousado Amor",
    artist: "Isaias Saad",
    difficulty: "intermediario",
    key: "A",
    category: ["adoracao"],
    chordsUsed: ["a", "e", "f", "dm"],
    rhythm: "balada-basica",
    structure: [
      { section: "intro", chords: ["a", "e", "f", "dm"] },
      { section: "verso", chords: ["a", "e", "f", "dm"] },
      { section: "refrao", chords: ["f", "a", "dm", "e"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "santo-pra-sempre",
    slug: "santo-pra-sempre",
    title: "Santo Pra Sempre",
    artist: "Gabriel Guedes",
    difficulty: "avancado",
    key: "E",
    category: ["adoracao"],
    chordsUsed: ["e", "a", "f", "dm"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["e", "a", "f", "dm"] },
      { section: "verso", chords: ["e", "a", "f", "dm"] },
      { section: "refrao", chords: ["f", "e", "dm", "a"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "grande-e-o-senhor",
    slug: "grande-e-o-senhor",
    title: "Grande é o Senhor",
    artist: "Adhemar de Campos",
    difficulty: "intermediario",
    key: "D",
    category: ["louvor"],
    chordsUsed: ["d", "g", "a", "dm"],
    rhythm: "ritmo-simples",
    structure: [
      { section: "intro", chords: ["d", "g", "a", "dm"] },
      { section: "verso", chords: ["d", "g", "a", "dm"] },
      { section: "refrao", chords: ["g", "d", "dm", "a"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "yahweh-se-manifestara",
    slug: "yahweh-se-manifestara",
    title: "Yahweh Se Manifestará",
    artist: "Diversos",
    difficulty: "intermediario",
    key: "C",
    category: ["adoracao"],
    chordsUsed: ["c", "f", "am", "g"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["c", "f", "am", "g"] },
      { section: "verso", chords: ["c", "f", "am", "g"] },
      { section: "refrao", chords: ["am", "f", "c", "g"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "bondade-de-deus",
    slug: "bondade-de-deus",
    title: "Bondade de Deus",
    artist: "Isaias Saad",
    difficulty: "iniciante",
    key: "G",
    category: ["adoracao"],
    chordsUsed: ["g", "d", "em", "c"],
    rhythm: "balada-basica",
    structure: [
      { section: "intro", chords: ["g", "d", "em", "c"] },
      { section: "verso", chords: ["g", "d", "em", "c"] },
      { section: "refrao", chords: ["em", "c", "g", "d"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
  {
    id: "oceanos",
    slug: "oceanos",
    title: "Oceanos",
    artist: "Hillsong United",
    difficulty: "intermediario",
    key: "D",
    category: ["adoracao"],
    chordsUsed: ["d", "g", "a", "dm"],
    rhythm: "worship-lento",
    structure: [
      { section: "intro", chords: ["d", "g", "a", "dm"] },
      { section: "verso", chords: ["d", "g", "a", "dm"] },
      { section: "refrao", chords: ["g", "d", "dm", "a"] },
    ],
    rights: { status: "em_analise", publiclyVisible: false },
  },
];

export function getSongBySlug(slug: string): Song | undefined {
  return songs.find((s) => s.slug === slug);
}

export function getAllSongs(): Song[] {
  return songs;
}
