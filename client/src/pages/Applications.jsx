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
          a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Applications</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and manage your applications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        >
          + Add application
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700">Search</label>
          <div className="mt-2">
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Search by company or role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Status</label>
          <div className="mt-2">
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Loading applications...
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matching applications"
          subtitle="Try clearing your filters or add a new application."
          action={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
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
            ? `Are you sure you want to delete ${deleteTarget.company} — ${deleteTarget.role}?`
            : ""
        }
        confirmText={submitting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}