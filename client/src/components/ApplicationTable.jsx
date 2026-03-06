import StatusBadge from "./StatusBadge.jsx";

export default function ApplicationTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">
              Location
            </th>
            <th className="hidden px-4 py-3 font-medium lg:table-cell">
              Date Applied
            </th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((a) => (
            <tr
              key={a.id}
              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">{a.company}</div>
                {a.link ? (
                  <a
                    className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-900"
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Job link
                  </a>
                ) : (
                  <div className="text-xs text-slate-400">No link</div>
                )}
              </td>

              <td className="px-4 py-3 text-slate-700">{a.role}</td>

              <td className="px-4 py-3">
                <StatusBadge status={a.status} />
              </td>

              <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                {a.location || "—"}
              </td>

              <td className="hidden px-4 py-3 text-slate-600 lg:table-cell">
                {a.dateApplied || "—"}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(a)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(a)}
                    className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50"
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
  );
}