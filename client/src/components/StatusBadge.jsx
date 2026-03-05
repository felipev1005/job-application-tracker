const styles = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-200",
  Interview: "bg-amber-50 text-amber-800 ring-amber-200",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function StatusBadge({ status }) {
  const cls =
    styles[status] ?? "bg-slate-50 text-slate-700 ring-slate-200";

  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}