import { Router } from 'express';
import { getProfesiones } from '../controllers/collections.controller.js';

const router = Router();

// GET /api/profesiones
router.get('/', getProfesiones);

export default router;
