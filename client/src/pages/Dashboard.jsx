import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import KpiCard from "../components/KpiCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useApplications } from "../context/ApplicationsContext.jsx";

function countByStatus(items, status) {
  return items.filter((x) => x.status === status).length;
}

export default function Dashboard() {
  const { applications } = useApplications();

  const total = applications.length;
  const applied = countByStatus(applications, "Applied");
  const interview = countByStatus(applications, "Interview");
  const offer = countByStatus(applications, "Offer");
  const rejected = countByStatus(applications, "Rejected");

  const recent = [...applications]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
            className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
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
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {recent.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <div className="font-medium text-slate-900">
                      {a.company} — {a.role}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
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