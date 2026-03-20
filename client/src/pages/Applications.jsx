import { useMemo, useState } from "react";
import ApplicationModal from "../components/ApplicationModal.jsx";
import ApplicationTable from "../components/ApplicationTable.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApplications } from "../context/ApplicationsContext.jsx";

const STATUSES = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function Applications() {
  const {
    applications,
    loading,
    submitting,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useApplications();

  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return [...applications]
      .filter((a) => (status === "All" ? true : a.status === status))
      .filter((a) => {
        if (!q) return true;
        return (
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [applications, status, query]);

  function handleOpenAdd() {
    setEditingItem(null);
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditingItem(item);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditingItem(null);
  }

  async function handleSubmit(formValues) {
    const result = editingItem
      ? await updateApplication(editingItem.id, formValues)
      : await addApplication(formValues);

    if (result.success) {
      handleCloseModal();
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    const result = await deleteApplication(deleteTarget.id);

    if (result.success) {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-sm font-medium text-cyan-300">Manage</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            Applications
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Search, filter, and manage your applications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-95"
        >
          + Add application
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-slate-300">Search</label>
            <div className="mt-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400/40"
                placeholder="Search by company or role..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <div className="mt-2">
              <select
                className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-400/40"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-slate-900">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-400 shadow-lg shadow-black/20 backdrop-blur-xl">
          Loading applications...
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matching applications"
          subtitle="Try clearing your filters or add a new application to keep your tracker up to date."
          action={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-95"
            >
              Add application
            </button>
          }
        />
      ) : (
        <ApplicationTable
          items={filtered}
          onEdit={handleOpenEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <ApplicationModal
        open={modalOpen}
        mode={editingItem ? "edit" : "add"}
        initialValues={editingItem}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete application?"
        message={
          deleteTarget
            ? `This will permanently remove ${deleteTarget.company} — ${deleteTarget.role} from your tracker.`
            : ""
        }
        confirmText={submitting ? "Deleting..." : "Delete"}
        cancelText="Keep it"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}