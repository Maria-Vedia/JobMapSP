import mysql from 'mysql2/promise';

let pool = null;

/** La base de datos se considera configurada si existen host, usuario y nombre. */
export function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}

export function getPool() {
  if (!isDbConfigured()) return null;

  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 5000,
    });
  }
  return pool;
}

/** Devuelve 'conectada', 'no disponible' o 'no configurada'. */
export async function getDatabaseStatus() {
  const db = getPool();
  if (!db) return 'no configurada';
  try {
    await db.query('SELECT 1');
    return 'conectada';
  } catch (error) {
    console.error('MySQL no disponible:', error.code || error.message);
    return 'no disponible';
  }
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
