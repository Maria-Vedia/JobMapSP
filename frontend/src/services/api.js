/**
 * Capa central de comunicación con la API de JOBMAP SP.
 * Todas las solicitudes HTTP del frontend pasan por este archivo.
 */
const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, { status = null, cause = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() !== '') {
      query.set(key, value.trim());
    }
  });
  const text = query.toString();
  return text ? `?${text}` : '';
}

async function request(path, { params, signal } = {}) {
  const url = `${API_URL}${path}${buildQuery(params)}`;

  let response;
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' }, signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('No se pudo conectar con el servidor. Verificá tu conexión e intentá de nuevo.', {
      cause: error,
    });
  }

  let body = null;
  try {
    body = await response.json();
  } catch (error) {
    if (response.ok) {
      throw new ApiError('El servidor devolvió una respuesta que no se pudo interpretar.', {
        status: response.status,
        cause: error,
      });
    }
  }

  if (!response.ok) {
    const message =
      body?.error?.message || `La solicitud falló (código ${response.status}). Intentá de nuevo más tarde.`;
    throw new ApiError(message, { status: response.status });
  }

  return body;
}

export function getHealth(options) {
  return request('/health', options);
}

export function getJobs({ keyword = '', location = '' } = {}, options = {}) {
  return request('/jobs', { params: { keyword, location }, ...options });
}

export function getAspirantes(options) {
  return request('/aspirantes', options);
}

export function getEmpresas(options) {
  return request('/empresas', options);
}

export function getProfesiones(options) {
  return request('/profesiones', options);
}
