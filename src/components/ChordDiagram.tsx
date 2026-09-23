import { Chord } from "@/types";

const stringOrder = ["E6", "A", "D", "G", "B", "E1"] as const;
const stringX: Record<string, number> = {
  E6: 20,
  A: 46,
  D: 72,
  G: 98,
  B: 124,
  E1: 150,
};

const fretY = [20, 57, 94, 131, 168];

export default function ChordDiagram({ chord }: { chord: Chord }) {
  return (
    <svg width="150" height="190" viewBox="0 0 150 190" role="img" aria-label={`Diagrama do acorde ${chord.name}`}>
      <g stroke="var(--text-muted)" strokeWidth={1.5}>
        {stringOrder.map((s) => (
          <line key={s} x1={stringX[s]} y1={20} x2={stringX[s]} y2={170} />
        ))}
      </g>
      <g stroke="var(--text-muted)" strokeWidth={1.5}>
        <line x1={18} y1={20} x2={152} y2={20} strokeWidth={4} />
        {fretY.slice(1).map((y) => (
          <line key={y} x1={18} y1={y} x2={152} y2={y} />
        ))}
      </g>

      {chord.fingers.map((f) => {
        const x = stringX[f.string];
        const y = fretY[f.fret - 1] + (fretY[f.fret] - fretY[f.fret - 1]) / 2;
        return (
          <g key={`${f.string}-${f.finger}`}>
            <circle cx={x} cy={y} r={9} fill="var(--gold)" />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill="#fff"
              fontFamily="var(--font-manrope), sans-serif"
            >
              {f.finger}
            </text>
          </g>
        );
      })}

      {stringOrder.map((s) => {
        if (chord.openStrings.includes(s)) {
          return (
            <text
              key={s}
              x={stringX[s]}
              y={12}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--green-text)"
              fontFamily="var(--font-manrope), sans-serif"
            >
              O
            </text>
          );
        }
        if (chord.mutedStrings?.includes(s)) {
          return (
            <text
              key={s}
              x={stringX[s]}
              y={12}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--text-muted)"
              fontFamily="var(--font-manrope), sans-serif"
            >
              X
            </text>
          );
        }
        return null;
      })}

      <g fontSize={10.5} fill="var(--text-soft)" fontFamily="var(--font-manrope), sans-serif" textAnchor="middle">
        {stringOrder.map((s) => (
          <text key={s} x={stringX[s]} y={185}>
            {s.replace("6", "").replace("1", "")}
          </text>
        ))}
      </g>
    </svg>
  );
}
