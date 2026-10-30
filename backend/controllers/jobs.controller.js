import { searchJobs } from '../services/jobs.service.js';
import { HttpError } from '../middleware/errorHandler.js';

const MAX_LENGTH = 100;

function readParam(value, name) {
  if (value === undefined) return '';
  if (typeof value !== 'string') {
    throw new HttpError(400, `El parámetro "${name}" debe ser un texto.`);
  }
  const clean = value.trim();
  if (clean.length > MAX_LENGTH) {
    throw new HttpError(400, `El parámetro "${name}" no puede superar ${MAX_LENGTH} caracteres.`);
  }
  return clean;
}

export async function getJobs(req, res, next) {
  try {
    const keyword = readParam(req.query.keyword, 'keyword');
    const location = readParam(req.query.location, 'location');

    const { data, source, message } = await searchJobs({ keyword, location });

    res.status(200).json({
      data,
      total: data.length,
      filters: { keyword, location },
      source,
      message,
    });
  } catch (error) {
    next(error);
  }
}
