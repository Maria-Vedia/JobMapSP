import { getPool } from '../config/db.js';

/**
 * Solo expone datos no sensibles. No se incluyen contacto ni datos personales
 * adicionales: un listado público de aspirantes requerirá autenticación.
 */
export async function findAspirantes() {
  const [rows] = await getPool().execute(
    `SELECT id, titulo, ubicacion
       FROM aspirantes
      ORDER BY created_at DESC
      LIMIT 50`,
  );
  return rows;
}
