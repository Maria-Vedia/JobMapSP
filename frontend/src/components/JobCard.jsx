export default function JobCard({ job }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-card">
      <h3 className="text-lg font-semibold text-brand">{job.title || 'Puesto sin título'}</h3>
      {(job.company || job.location) && (
        <p className="mt-1 text-sm text-muted">
          {[job.company, job.location].filter(Boolean).join(' · ')}
        </p>
      )}
      {job.description && <p className="mt-3 text-ink">{job.description}</p>}
    </article>
  );
}
