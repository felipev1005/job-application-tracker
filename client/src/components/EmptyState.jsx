const styles = {
  Applied: "border-blue-400/30 bg-blue-500/10 text-blue-300",
  Interview: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  Offer: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Rejected: "border-rose-400/30 bg-rose-500/10 text-rose-300",
};

export default function StatusBadge({ status }) {
  const cls = styles[status] || "border-slate-400/20 bg-slate-500/10 text-slate-300";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}