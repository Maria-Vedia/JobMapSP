import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/aspirantes', label: 'Aspirantes' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/profesiones', label: 'Profesiones' },
];

const desktopLink = ({ isActive }) =>
  [
    'border-b-2 py-1 text-[15px] transition-colors',
    isActive
      ? 'border-brand font-semibold text-ink'
      : 'border-transparent text-muted hover:text-brand',
  ].join(' ');

const mobileLink = ({ isActive }) =>
  [
    'block rounded-md px-3 py-2.5 text-[15px] transition-colors',
    isActive ? 'bg-surface font-semibold text-ink' : 'text-muted hover:bg-surface hover:text-brand',
  ].join(' ');

const btnSecondary =
  'inline-flex h-10 items-center justify-center rounded-md border border-brand bg-white px-5 text-sm font-semibold text-brand transition-colors hover:bg-surface active:bg-line/60';
const btnPrimary =
  'inline-flex h-10 items-center justify-center rounded-md border border-brand bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary hover:border-brand-secondary active:bg-[#1d3159]';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const buttonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-[78px] max-w-[1296px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="rounded-sm text-2xl font-semibold tracking-tight text-brand">
          JOBMAP SP
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className={btnSecondary}>
            Ingresar
          </Link>
          <Link to="/register" className={btnPrimary}>
            Crear cuenta
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-brand transition-colors hover:bg-surface md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="menu-movil" className="border-t border-line bg-white md:hidden">
          <nav aria-label="Navegación móvil" className="mx-auto max-w-[1296px] px-4 py-3 sm:px-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={mobileLink}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3">
              <Link to="/login" className={btnSecondary}>
                Ingresar
              </Link>
              <Link to="/register" className={btnPrimary}>
                Crear cuenta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
