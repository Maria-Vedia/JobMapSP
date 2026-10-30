import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import JobCard from '../components/JobCard.jsx';
import Loading from '../components/Loading.jsx';
import { getJobs } from '../services/api.js';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = (searchParams.get('keyword') || '').trim();
  const location = (searchParams.get('location') || '').trim();
  const hasQuery = Boolean(keyword || location);

  const [status, setStatus] = useState('idle');
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!hasQuery) {
      setStatus('idle');
      setJobs([]);
      return undefined;
    }

    const controller = new AbortController();
    setStatus('loading');
    setMessage('');

    getJobs({ keyword, location }, { signal: controller.signal })
      .then((body) => {
        setJobs(Array.isArray(body?.data) ? body.data : []);
        setMessage(body?.message || '');
        setStatus('success');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setMessage(error.message || 'Ocurrió un error inesperado.');
        setStatus('error');
      });

    return () => controller.abort();
  }, [keyword, location, hasQuery]);

  const handleSearch = ({ keyword: nextKeyword, location: nextLocation }) => {
    const params = {};
    if (nextKeyword) params.keyword = nextKeyword;
    if (nextLocation) params.location = nextLocation;
    setSearchParams(params);
  };

  const loading = status === 'loading';

  return (
    <div className="mx-auto max-w-[1160px] px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Resultados de búsqueda</h1>
      <p className="mt-2 text-muted">Buscá por puesto, habilidad, palabra clave o ubicación.</p>

      <div className="mt-6">
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          initialKeyword={keyword}
          initialLocation={location}
        />
      </div>

      <section aria-live="polite" className="mt-8">
        {status === 'idle' && (
          <p className="text-muted">Ingresá un criterio de búsqueda para ver oportunidades.</p>
        )}

        {loading && <Loading label="Buscando oportunidades…" />}

        {status === 'error' && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-semibold">No pudimos completar la búsqueda</p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
        )}

        {status === 'success' && jobs.length === 0 && (
          <div className="rounded-lg border border-line bg-white p-5">
            <p className="font-semibold text-ink">No encontramos oportunidades para tu búsqueda.</p>
            <p className="mt-1 text-sm text-muted">
              {message || 'Probá con otras palabras clave o con una ubicación distinta.'}
            </p>
          </div>
        )}

        {status === 'success' && jobs.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted">
              {jobs.length} {jobs.length === 1 ? 'resultado' : 'resultados'}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job, index) => (
                <JobCard key={job.id ?? index} job={job} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
