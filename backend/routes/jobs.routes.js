import { Router } from 'express';
import { getJobs } from '../controllers/jobs.controller.js';

const router = Router();

// GET /api/jobs?keyword=desarrollador&location=Jujuy
router.get('/', getJobs);

export default router;
