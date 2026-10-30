import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProfileCard({ icon: Icon, title, description, to }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-secondary/60 hover:shadow-card-hover">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
          {Icon && <Icon size={24} aria-hidden="true" />}
        </span>
        <h3 className="text-xl font-semibold text-brand">{title}</h3>
      </div>
      <p className="mt-5 text-muted">{description}</p>
      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 self-start rounded-sm text-sm font-semibold text-brand transition-colors hover:text-brand-secondary"
      >
        Ver más
        <ArrowRight size={16} aria-hidden="true" />
        <span className="sr-only">sobre {title}</span>
      </Link>
    </article>
  );
}
