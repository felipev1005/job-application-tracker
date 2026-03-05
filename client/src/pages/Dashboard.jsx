import { mockApplications } from "../data/mockApplications.js";
import KpiCard from "../components/KpiCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { Link } from "react-router-dom";

function countByStatus(items, status) {
  return items.filter((x) => x.status === status).length;
}

export default function Dashboard() {
  const items = mockApplications;

  const total = items.length;
  const applied = countByStatus(items, "Applied");
  const interview = countByStatus(items, "Interview");
  const offer = countByStatus(items, "Offer");
  const rejected = countByStatus(items, "Rejected");

  const recent = [...items]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quick overview of your job search progress.
          </p>
        </div>

        <Link
          to="/applications"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        >
          View applications
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Total" value={total} />
        <KpiCard label="Applied" value={applied} />
        <KpiCard label="Interview" value={interview} />
        <KpiCard label="Offer" value={offer} />
        <KpiCard label="Rejected" value={rejected} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent applications
          </h2>
          <Link
            to="/applications"
            className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            See all
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            title="No applications yet"
            subtitle="Add your first application to see stats and recent activity."
            action={
              <Link
                to="/applications"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Go to Applications
              </Link>
            }
          />
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {recent.map((a) => (
                <li key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">
                      {a.company} — {a.role}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {a.location || "—"} • {a.dateApplied || "—"}
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}