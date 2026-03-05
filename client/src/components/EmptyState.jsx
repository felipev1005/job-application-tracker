export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100" />
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}