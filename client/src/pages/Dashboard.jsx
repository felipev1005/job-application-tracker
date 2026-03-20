import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import KpiCard from "../components/KpiCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useApplications } from "../context/ApplicationsContext.jsx";

function countByStatus(items, status) {
  return items.filter((x) => x.status === status).length;
}

export default function Dashboard() {
  const { applications, loading, error } = useApplications();

  const total = applications.length;
  const applied = countByStatus(applications, "Applied");
  const interview = countByStatus(applications, "Interview");
  const offer = countByStatus(applications, "Offer");
  const rejected = countByStatus(applications, "Rejected");

  const recent = [...applications]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-medium text-indigo-300">Overview</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Quick overview of your job search progress.
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-95"
          >
            View applications
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total" value={loading ? "..." : total} />
        <KpiCard label="Applied" value={loading ? "..." : applied} />
        <KpiCard label="Interview" value={loading ? "..." : interview} />
        <KpiCard label="Offer" value={loading ? "..." : offer} />
        <KpiCard label="Rejected" value={loading ? "..." : rejected} />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Recent applications</h2>
            <p className="mt-1 text-sm text-slate-400">
              Your latest activity from real saved data.
            </p>
          </div>

          <Link
            to="/applications"
            className="text-sm text-slate-300 underline underline-offset-4 hover:text-white"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-400 shadow-lg shadow-black/20 backdrop-blur-xl">
            Loading applications...
          </div>
        ) : recent.length === 0 ? (
          <EmptyState
            title="No applications yet"
            subtitle="Add your first application to start tracking your progress and populate your dashboard."
            action={
              <Link
                to="/applications"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-95"
              >
                Go to Applications
              </Link>
            }
          />
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-xl">
            <ul className="divide-y divide-white/5">
              {recent.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-medium text-white">
                      {a.company} — {a.role}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
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