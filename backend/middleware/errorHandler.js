/**
 * Error con código HTTP asociado. Los controladores lo lanzan
 * para que el middleware responda de forma consistente.
 */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

const DB_UNAVAILABLE_CODES = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'ETIMEDOUT',
  'PROTOCOL_CONNECTION_LOST',
  'ER_ACCESS_DENIED_ERROR',
  'ER_DBACCESS_DENIED_ERROR',
  'ER_BAD_DB_ERROR',
  'ER_NO_SUCH_TABLE',
]);

function isDatabaseUnavailable(err) {
  return typeof err?.code === 'string' && DB_UNAVAILABLE_CODES.has(err.code);
}

export function notFoundHandler(req, _res, next) {
  next(new HttpError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const isJsonSyntaxError = err instanceof SyntaxError && err.status === 400;
  const dbDown = isDatabaseUnavailable(err);
  const status = isJsonSyntaxError ? 400 : dbDown ? 503 : err.status || 500;

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      status,
      message: dbDown
        ? 'La base de datos no está disponible en este momento. Intentá de nuevo más tarde.'
        : status >= 500
          ? 'Error interno del servidor.'
          : isJsonSyntaxError
            ? 'El cuerpo de la solicitud no es un JSON válido.'
            : err.message,
    },
  });
}
