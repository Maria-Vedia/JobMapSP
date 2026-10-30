export default function Loading({ label = 'Cargando…' }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 text-muted">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-brand"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
