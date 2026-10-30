import { getPool } from '../config/db.js';

const LIMIT = 50;

/** Escapa los comodines de LIKE para que el texto del usuario se busque literalmente. */
export function escapeLike(value) {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export async function findJobs({ keyword, location }) {
  const pool = getPool();
  const keywordLike = `%${escapeLike(keyword)}%`;
  const locationLike = `%${escapeLike(location)}%`;

  const [rows] = await pool.execute(
    `SELECT o.id,
            o.titulo      AS title,
            e.nombre      AS company,
            o.ubicacion   AS location,
            o.descripcion AS description
       FROM ofertas o
       JOIN empresas e ON e.id = o.empresa_id
      WHERE o.activa = 1
        AND (? = '' OR o.titulo LIKE ? OR o.descripcion LIKE ? OR o.habilidades LIKE ?)
        AND (? = '' OR o.ubicacion LIKE ?)
      ORDER BY o.created_at DESC
      LIMIT ${LIMIT}`,
    [keyword, keywordLike, keywordLike, keywordLike, location, locationLike],
  );
  return rows;
}
