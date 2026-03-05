export default function KpiCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}