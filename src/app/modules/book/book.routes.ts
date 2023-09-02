import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleWares/auth';
import { BookControllers } from './book.controllers';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookControllers.createBook
);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookControllers.updateBook);
router.get('/', BookControllers.getAllBook);
router.get('/:categoryId', BookControllers.getBookByCategoryId);
router.get('/book/:id', BookControllers.getBookById);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookControllers.deleteBook);

export const BookRoutes = router;
