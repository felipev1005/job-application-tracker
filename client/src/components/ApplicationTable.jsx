import StatusBadge from "./StatusBadge.jsx";

export default function ApplicationTable({ items }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-left text-slate-600">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">
              Location
            </th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">
              Date Applied
            </th>
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
                    className="text-xs text-slate-500 hover:text-slate-900 underline underline-offset-2"
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
              <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                {a.location || "—"}
              </td>
              <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">
                {a.dateApplied || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}