import { isDbConfigured } from '../config/db.js';
import { findAspirantes } from '../repositories/aspirantes.repository.js';
import { findEmpresas } from '../repositories/empresas.repository.js';
import { findProfesiones } from '../repositories/profesiones.repository.js';

async function list(resource, finder) {
  if (!isDbConfigured()) {
    return {
      data: [],
      source: 'sin-base-de-datos',
      message: `Todavía no hay ${resource} disponibles: la base de datos no está configurada.`,
    };
  }
  return { data: await finder(), source: 'mysql' };
}

export const listAspirantes = () => list('aspirantes', findAspirantes);
export const listEmpresas = () => list('empresas', findEmpresas);
export const listProfesiones = () => list('profesiones', findProfesiones);
