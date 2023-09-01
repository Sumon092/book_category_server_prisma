import express from 'express';
import { CategoryControllers } from './category.controllers';

const router = express.Router();

router.post('/create-category', CategoryControllers.createCategory);

export const CategoryRoutes = router;
