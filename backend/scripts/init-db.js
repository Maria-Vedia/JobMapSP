import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.error('Completá DB_HOST, DB_USER y DB_NAME en backend/.env antes de ejecutar este script.');
  process.exit(1);
}

if (!/^[A-Za-z0-9_]+$/.test(DB_NAME)) {
  console.error('DB_NAME solo puede contener letras, números y guion bajo.');
  process.exit(1);
}

const schemaPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'database', 'schema.sql');

let connection;
try {
  const schema = await fs.readFile(schemaPath, 'utf8');

  connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT) || 3306,
    user: DB_USER,
    password: DB_PASSWORD ?? '',
    multipleStatements: true,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await connection.query(`USE \`${DB_NAME}\``);
  await connection.query(schema);

  console.log(`Base de datos "${DB_NAME}" lista: tablas creadas o ya existentes.`);
} catch (error) {
  console.error('No se pudo inicializar la base de datos:', error.code || error.message);
  process.exitCode = 1;
} finally {
  if (connection) await connection.end();
}
