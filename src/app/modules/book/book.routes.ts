import express from 'express';
import { BookControllers } from './book.controllers';

const router = express.Router();

router.post('/create-book', BookControllers.createBook);
router.get('/', BookControllers.getAllBook);

export const BookRoutes = router;
