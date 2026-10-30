import { listAspirantes, listEmpresas, listProfesiones } from '../services/collections.service.js';

function handler(service) {
  return async (_req, res, next) => {
    try {
      const { data, source, message } = await service();
      res.status(200).json({ data, total: data.length, source, message });
    } catch (error) {
      next(error);
    }
  };
}

export const getAspirantes = handler(listAspirantes);
export const getEmpresas = handler(listEmpresas);
export const getProfesiones = handler(listProfesiones);
