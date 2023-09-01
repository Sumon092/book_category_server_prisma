import express from 'express';
import { CategoryControllers } from './category.controllers';

const router = express.Router();

router.post('/create-category', CategoryControllers.createCategory);
router.patch('/:id', CategoryControllers.updateCategory);
router.get('/', CategoryControllers.getAllCategory);
router.get('/:id', CategoryControllers.getSingleCategory);

export const CategoryRoutes = router;
