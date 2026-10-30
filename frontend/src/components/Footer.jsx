import { Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/aspirantes', label: 'Aspirantes' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/profesiones', label: 'Profesiones' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <p className="text-xl font-semibold text-brand">JOBMAP SP</p>
          <p className="mt-2 text-muted">Conectando perfiles con oportunidades laborales.</p>
          <p className="mt-6 text-xs text-muted">Versión inicial de la plataforma JOBMAP SP</p>
        </div>
        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="rounded-sm text-muted transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
