import express from 'express';
import { BookControllers } from './book.controllers';

const router = express.Router();

router.post('/create-book', BookControllers.createBook);
router.get('/', BookControllers.getAllBook);
router.get('/:categoryId', BookControllers.getBookByCategoryId);
router.get('/book/:id', BookControllers.getBookById);

export const BookRoutes = router;
