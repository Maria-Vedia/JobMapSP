import { Router } from 'express';
import { getEmpresas } from '../controllers/collections.controller.js';

const router = Router();

// GET /api/empresas
router.get('/', getEmpresas);

export default router;
