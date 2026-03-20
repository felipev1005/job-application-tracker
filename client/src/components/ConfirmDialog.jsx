export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-xl">
            🗑️
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}