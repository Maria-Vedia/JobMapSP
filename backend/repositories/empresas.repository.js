import { getPool } from '../config/db.js';

export async function findEmpresas() {
  const [rows] = await getPool().execute(
    `SELECT id, nombre, descripcion, ubicacion, sitio_web
       FROM empresas
      ORDER BY nombre ASC
      LIMIT 50`,
  );
  return rows;
}
