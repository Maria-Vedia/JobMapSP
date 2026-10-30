import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1160px] px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand-secondary">Error 404</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Página no encontrada</h1>
      <p className="mt-3 max-w-xl text-muted">
        La dirección que ingresaste no existe o fue movida. Volvé al inicio para seguir explorando.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-10 items-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
