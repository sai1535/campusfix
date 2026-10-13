type StatCardProps = {
  label: string;
  value: number | string;
  accent?: "neutral" | "success" | "warning";
};

const colorMap: Record<NonNullable<StatCardProps["accent"]>, string> = {
  neutral: "bg-slate-100 text-slate-900",
  success: "bg-green-100 text-green-900",
  warning: "bg-amber-100 text-amber-900",
};

export const StatCard = ({ label, value, accent = "neutral" }: StatCardProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <div className="mt-2 inline-flex items-center gap-2">
      <span className="text-3xl font-semibold text-gray-900">{value}</span>
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${colorMap[accent]}`}>
        {accent === "success" ? "✔" : accent === "warning" ? "•" : "⏱"}
      </span>
    </div>
  </div>
);


