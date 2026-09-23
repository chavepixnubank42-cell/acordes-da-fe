import { RightsStatus } from "@/types";

const config: Record<RightsStatus, { label: string; dot: string; bg: string; text: string }> = {
  liberada: { label: "Liberada", dot: "🟢", bg: "bg-green/20", text: "text-green-text" },
  em_analise: { label: "Em análise", dot: "🟡", bg: "bg-gold/20", text: "text-[#8A6A2E]" },
  pessoal: { label: "Conteúdo pessoal", dot: "🔵", bg: "bg-card-alt", text: "text-blue-deep" },
  nao_publicar: { label: "Não publicar", dot: "🔴", bg: "bg-red-100", text: "text-red-700" },
};

export default function RightsBadge({ status }: { status: RightsStatus }) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${c.bg} ${c.text}`}
    >
      {c.dot} {c.label}
    </span>
  );
}
