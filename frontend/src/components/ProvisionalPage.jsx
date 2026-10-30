import { Link } from 'react-router-dom';

export default function ProvisionalPage({ title, description }) {
  return (
    <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 lg:px-8">
      <p className="inline-block rounded-md border border-line bg-white px-3 py-1 text-sm font-semibold text-brand-secondary">
        Sección provisional
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{description}</p>
      <p className="mt-2 max-w-2xl text-muted">
        Esta sección todavía no está disponible: no hay funcionalidades conectadas en esta versión inicial.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-10 items-center rounded-md border border-brand bg-white px-5 text-sm font-semibold text-brand transition-colors hover:bg-surface"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
