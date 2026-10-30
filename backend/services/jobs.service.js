import { isDbConfigured } from '../config/db.js';
import { findJobs } from '../repositories/jobs.repository.js';

/**
 * Busca oportunidades laborales.
 * Sin base de datos configurada devuelve una lista vacía (no se inventan ofertas).
 */
export async function searchJobs({ keyword, location }) {
  if (!isDbConfigured()) {
    return {
      data: [],
      source: 'sin-base-de-datos',
      message: 'No hay oportunidades disponibles: la base de datos no está configurada.',
    };
  }

  const data = await findJobs({ keyword, location });
  return { data, source: 'mysql' };
}
