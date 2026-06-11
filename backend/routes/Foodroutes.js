import { Router } from 'express';
import { getAllFoods, getFoodById, postFood, deleteFood, updateFood } from '../controllers/Foodcontroller.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = Router();

router.post('/', postFood);
router.get('/', verifyToken, getAllFoods);
router.get('/:id', getFoodById);
router.delete('/:id', deleteFood);
router.put('/:id', updateFood);

export default router;
