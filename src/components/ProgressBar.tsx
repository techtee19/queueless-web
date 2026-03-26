export function ProgressBar({ position, total }: { position: number; total: number }) {
  const percentage = total > 0 ? Math.max(0, Math.min(100, ((total - position + 1) / total) * 100)) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-stone-500 mb-1 font-medium">
        <span>Position {position} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
