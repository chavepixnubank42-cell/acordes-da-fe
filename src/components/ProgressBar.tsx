export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-alt">
      <div
        className="h-full rounded-full bg-gold"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
