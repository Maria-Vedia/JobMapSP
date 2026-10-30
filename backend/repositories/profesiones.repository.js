import { getPool } from '../config/db.js';

export async function findProfesiones() {
  const [rows] = await getPool().execute(
    `SELECT id, nombre, area, descripcion, requisitos
       FROM profesiones
      ORDER BY nombre ASC
      LIMIT 100`,
  );
  return rows;
}
