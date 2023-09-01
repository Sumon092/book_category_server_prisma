import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleWares/auth';
import { CategoryControllers } from './category.controllers';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryControllers.createCategory
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryControllers.updateCategory
);

router.get('/', CategoryControllers.getAllCategory);
router.get('/:id', CategoryControllers.getSingleCategory);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryControllers.deleteCategory
);

export const CategoryRoutes = router;
