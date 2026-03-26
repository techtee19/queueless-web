const STATUS_STYLES = {
  WAITING: "bg-stone-100 text-stone-600 border-stone-200",
  CALLED: "bg-amber-50 text-amber-700 border-amber-200",
  CHECKED_IN: "bg-blue-50 text-blue-700 border-blue-200",
  SERVING: "bg-teal-50 text-teal-700 border-teal-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  SKIPPED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-stone-100 text-stone-400 border-stone-200",
  EXPIRED: "bg-red-50 text-red-700 border-red-200",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status as keyof typeof STATUS_STYLES] || STATUS_STYLES.WAITING;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
      {status.replace("_", " ")}
    </span>
  );
}
