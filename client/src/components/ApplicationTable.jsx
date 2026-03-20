import StatusBadge from "./StatusBadge.jsx";

export default function ApplicationTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-sm font-medium text-white">
          {items.length} application{items.length === 1 ? "" : "s"}
        </div>
        <div className="mt-1 text-xs text-slate-400">
          Track and manage your current job search pipeline.
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr className="text-left text-slate-400">
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Location</th>
              <th className="hidden px-5 py-3 font-medium lg:table-cell">Date Applied</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((a) => (
              <tr
                key={a.id}
                className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-5 py-4 align-top">
                  <div className="font-medium text-white">{a.company}</div>
                  {a.link ? (
                    <a
                      className="mt-1 inline-block text-xs text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                      href={a.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open job link
                    </a>
                  ) : (
                    <div className="mt-1 text-xs text-slate-500">No link</div>
                  )}
                </td>

                <td className="px-5 py-4 align-top text-slate-200">{a.role}</td>

                <td className="px-5 py-4 align-top">
                  <StatusBadge status={a.status} />
                </td>

                <td className="hidden px-5 py-4 align-top text-slate-300 md:table-cell">
                  {a.location || "—"}
                </td>

                <td className="hidden px-5 py-4 align-top text-slate-300 lg:table-cell">
                  {a.dateApplied || "—"}
                </td>

                <td className="px-5 py-4 align-top">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(a)}
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/5"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(a)}
                      className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}