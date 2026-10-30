import { Router } from 'express';
import { getAspirantes } from '../controllers/collections.controller.js';

const router = Router();

// GET /api/aspirantes
router.get('/', getAspirantes);

export default router;
