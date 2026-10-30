import { useNavigate } from 'react-router-dom';
import { UserRound, Building2, Briefcase } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';

const profiles = [
  {
    icon: UserRound,
    title: 'Aspirantes',
    description: 'Creá tu perfil y destacá tus habilidades.',
    to: '/aspirantes',
  },
  {
    icon: Building2,
    title: 'Empresas',
    description: 'Publicá búsquedas y encontrá talento.',
    to: '/empresas',
  },
  {
    icon: Briefcase,
    title: 'Profesiones',
    description: 'Explorá áreas laborales y requisitos.',
    to: '/profesiones',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = ({ keyword, location }) => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-[1160px] px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8">
      <section aria-labelledby="titulo-principal">
        <p className="text-sm font-semibold tracking-wide text-brand-secondary">
          CONECTAMOS TALENTO CON OPORTUNIDADES
        </p>
        <h1
          id="titulo-principal"
          className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[40px]"
        >
          Encontrá tu próxima oportunidad laboral
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          JOBMAP SP te ayuda a conectar tu perfil con empleos que se ajustan a tus habilidades.
        </p>
      </section>

      <div className="mt-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <section aria-labelledby="explora-perfil" className="mt-14">
        <h2 id="explora-perfil" className="text-2xl font-semibold text-ink sm:text-3xl">
          Explorá por perfil
        </h2>
        <p className="mt-1 text-muted">Accesos rápidos para comenzar tu búsqueda</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.to} {...profile} />
          ))}
        </div>
      </section>

      <HowItWorks />
    </div>
  );
}
