import { useEffect, useState } from 'react';

const MAX_LENGTH = 100;

const inputClass =
  'h-11 w-full rounded-md border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted/80 transition-colors hover:border-brand-secondary focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 disabled:cursor-not-allowed disabled:bg-surface';

export default function SearchBar({ onSearch, loading = false, initialKeyword = '', initialLocation = '' }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [error, setError] = useState('');

  useEffect(() => {
    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [initialKeyword, initialLocation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;

    const cleanKeyword = keyword.trim();
    const cleanLocation = location.trim();

    if (!cleanKeyword && !cleanLocation) {
      setError('Ingresá un puesto, habilidad o palabra clave, o una ubicación para buscar.');
      return;
    }
    if (cleanKeyword.length > MAX_LENGTH || cleanLocation.length > MAX_LENGTH) {
      setError(`Cada campo admite hasta ${MAX_LENGTH} caracteres.`);
      return;
    }

    setError('');
    onSearch({ keyword: cleanKeyword, location: cleanLocation });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      role="search"
      aria-label="Buscar oportunidades laborales"
      className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="md:flex-[1.3]">
          <label htmlFor="keyword" className="mb-2 block text-sm font-semibold text-ink">
            ¿Qué trabajo buscás?
          </label>
          <input
            id="keyword"
            name="keyword"
            type="text"
            value={keyword}
            maxLength={MAX_LENGTH}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Puesto, habilidad o palabra clave"
            autoComplete="off"
            disabled={loading}
            aria-describedby={error ? 'search-error' : undefined}
            className={inputClass}
          />
        </div>

        <div className="md:flex-1">
          <label htmlFor="location" className="mb-2 block text-sm font-semibold text-ink">
            Ubicación
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={location}
            maxLength={MAX_LENGTH}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Ciudad o zona"
            autoComplete="off"
            disabled={loading}
            aria-describedby={error ? 'search-error' : undefined}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary active:bg-[#1d3159] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Buscando…' : 'Buscar oportunidades'}
        </button>
      </div>

      {error && (
        <p id="search-error" role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
