import express from 'express';
import { CategoryControllers } from './category.controllers';

const router = express.Router();

router.post('/create-category', CategoryControllers.createCategory);
router.get('/', CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
