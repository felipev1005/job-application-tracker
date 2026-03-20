import { useEffect, useState } from "react";

const DEFAULT_FORM = {
  company: "",
  role: "",
  status: "Applied",
  location: "",
  link: "",
  dateApplied: "",
  notes: "",
};

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialValues || DEFAULT_FORM);
      setErrors({});
      setSaving(false);
    }
  }, [open, initialValues]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};

    if (!form.company.trim()) {
      nextErrors.company = "Company is required.";
    }

    if (!form.role.trim()) {
      nextErrors.role = "Role is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {mode === "edit" ? "Edit application" : "Add application"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Company *
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Acme Inc."
              />
              {errors.company ? (
                <p className="mt-1 text-xs text-rose-600">{errors.company}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Role *</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Frontend Developer"
              />
              {errors.role ? (
                <p className="mt-1 text-xs text-rose-600">{errors.role}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Remote / Moncton, NB"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Job link
              </label>
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Date applied
              </label>
              <input
                type="date"
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Any notes about the application..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? mode === "edit"
                  ? "Saving..."
                  : "Adding..."
                : mode === "edit"
                ? "Save changes"
                : "Add application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}