"use client";

import { useState } from "react";
import { Chord, Difficulty, Rhythm, RightsStatus, Song } from "@/types";

interface SongFormValues {
  title: string;
  artist: string;
  composer: string;
  difficulty: Difficulty;
  key: string;
  capo: string;
  chordsUsed: string[];
  rhythm: string;
  learningNotes: string;
  audioUrl: string;
  lyricsChordSheet: string;
  rightsStatus: RightsStatus;
  rightsSource: string;
  rightsLicense: string;
  rightsNotes: string;
}

function toFormValues(song?: Song): SongFormValues {
  return {
    title: song?.title ?? "",
    artist: song?.artist ?? "",
    composer: song?.rights.composer ?? "",
    difficulty: song?.difficulty ?? "iniciante",
    key: song?.key ?? "",
    capo: song?.capo?.toString() ?? "",
    chordsUsed: song?.chordsUsed ?? [],
    rhythm: song?.rhythm ?? "",
    learningNotes: "",
    audioUrl: song?.audioUrl ?? "",
    lyricsChordSheet: song?.lyricsChordSheet ?? "",
    rightsStatus: song?.rights.status ?? "em_analise",
    rightsSource: song?.rights.source ?? "",
    rightsLicense: song?.rights.license ?? "",
    rightsNotes: song?.rights.notes ?? "",
  };
}

export default function SongForm({
  song,
  allChords,
  allRhythms,
}: {
  song?: Song;
  allChords: Chord[];
  allRhythms: Rhythm[];
}) {
  const [values, setValues] = useState<SongFormValues>(toFormValues(song));
  const [saved, setSaved] = useState(false);

  function update<K extends keyof SongFormValues>(key: K, value: SongFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function toggleChord(id: string) {
    update(
      "chordsUsed",
      values.chordsUsed.includes(id)
        ? values.chordsUsed.filter((c) => c !== id)
        : [...values.chordsUsed, id],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Ainda não há banco de dados conectado (ver seção "Banco de dados" do
    // README): por enquanto isto só mostra o objeto que seria persistido.
    // eslint-disable-next-line no-console
    console.log("Música pronta para salvar:", values);
    setSaved(true);
  }

  const canShowContent = values.rightsStatus === "liberada";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]">
        <h2 className="mb-4 text-sm font-bold text-ink-soft">Informações básicas</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Título">
            <input
              required
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Artista">
            <input
              required
              value={values.artist}
              onChange={(e) => update("artist", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Compositor">
            <input
              value={values.composer}
              onChange={(e) => update("composer", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Dificuldade">
            <select
              value={values.difficulty}
              onChange={(e) => update("difficulty", e.target.value as Difficulty)}
              className="input"
            >
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </Field>
          <Field label="Tom">
            <input value={values.key} onChange={(e) => update("key", e.target.value)} className="input" />
          </Field>
          <Field label="Capotraste (casa)">
            <input
              type="number"
              min={0}
              value={values.capo}
              onChange={(e) => update("capo", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Ritmo">
            <select value={values.rhythm} onChange={(e) => update("rhythm", e.target.value)} className="input">
              <option value="">Selecione</option>
              {allRhythms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]">
        <h2 className="mb-4 text-sm font-bold text-ink-soft">Acordes usados</h2>
        <div className="flex flex-wrap gap-2">
          {allChords.map((chord) => (
            <button
              type="button"
              key={chord.id}
              onClick={() => toggleChord(chord.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-bold ${
                values.chordsUsed.includes(chord.id)
                  ? "border-blue-deep bg-blue-deep text-white"
                  : "border-border-soft bg-white text-ink-soft dark:bg-[#17222D]"
              }`}
            >
              {chord.name}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]">
        <h2 className="mb-4 text-sm font-bold text-ink-soft">Conteúdo de aprendizado</h2>
        <Field label="Observações para quem estiver estudando esta música">
          <textarea
            rows={3}
            value={values.learningNotes}
            onChange={(e) => update("learningNotes", e.target.value)}
            className="input"
            placeholder="Ex: atenção na troca G → D, o dedo 3 não precisa sair da corda..."
          />
        </Field>
      </section>

      <section className="rounded-card border border-border-soft bg-white p-5 dark:bg-[#1F2E3B]">
        <h2 className="mb-1 text-sm font-bold text-ink-soft">Direitos autorais</h2>
        <p className="mb-4 text-[12.5px] text-ink-soft">
          Letra, cifra completa e áudio só ficam visíveis para os alunos quando o status estiver
          "Liberada".
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <select
              value={values.rightsStatus}
              onChange={(e) => update("rightsStatus", e.target.value as RightsStatus)}
              className="input"
            >
              <option value="liberada">🟢 Liberada</option>
              <option value="em_analise">🟡 Em análise</option>
              <option value="pessoal">🔵 Conteúdo pessoal</option>
              <option value="nao_publicar">🔴 Não publicar</option>
            </select>
          </Field>
          <Field label="Fonte">
            <input
              value={values.rightsSource}
              onChange={(e) => update("rightsSource", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Licença/autorização">
            <input
              value={values.rightsLicense}
              onChange={(e) => update("rightsLicense", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Observações sobre os direitos">
            <input
              value={values.rightsNotes}
              onChange={(e) => update("rightsNotes", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field label={`Letra/cifra ${!canShowContent ? "(bloqueado até liberar os direitos)" : ""}`}>
            <textarea
              rows={3}
              disabled={!canShowContent}
              value={values.lyricsChordSheet}
              onChange={(e) => update("lyricsChordSheet", e.target.value)}
              className="input disabled:opacity-50"
            />
          </Field>
          <Field label={`URL do áudio ${!canShowContent ? "(bloqueado até liberar os direitos)" : ""}`}>
            <input
              disabled={!canShowContent}
              value={values.audioUrl}
              onChange={(e) => update("audioUrl", e.target.value)}
              className="input disabled:opacity-50"
            />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-blue-deep px-6 py-3 text-sm font-bold text-white">
          Salvar música
        </button>
        {saved && (
          <span className="text-[13px] text-green-text">
            Pronto para salvar — conecte um banco de dados para persistir (ver README).
          </span>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border-soft);
          background: var(--bg-page);
          padding: 10px 12px;
          font-size: 13.5px;
          outline: none;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-bold text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
