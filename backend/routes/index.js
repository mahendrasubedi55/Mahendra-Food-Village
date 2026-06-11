import { Router } from 'express';
import { getAbout, getHome } from '../controllers/indexController.js';

const router = Router();

router.get('/', getHome);
router.get('/about', getAbout);

export default router;
