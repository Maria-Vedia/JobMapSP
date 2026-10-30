import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import jobsRoutes from './routes/jobs.routes.js';
import aspirantesRoutes from './routes/aspirantes.routes.js';
import empresasRoutes from './routes/empresas.routes.js';
import profesionesRoutes from './routes/profesiones.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { getDatabaseStatus, closePool } from './config/db.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.disable('x-powered-by');
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', async (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'jobmap-sp-backend',
    database: await getDatabaseStatus(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/jobs', jobsRoutes);
app.use('/api/aspirantes', aspirantesRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/profesiones', profesionesRoutes);

app.use('/api', notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`JOBMAP SP API escuchando en http://localhost:${PORT}`);
});

async function shutdown() {
  server.close();
  await closePool();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
