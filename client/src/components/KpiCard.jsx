export default function KpiCard({ label, value, hint }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.07]">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
        {value}
      </div>
      {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}