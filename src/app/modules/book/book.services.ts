import { Book } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createBook = async (bookData: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: bookData,
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });
  return result;
};

export const BookServices = {
  createBook,
};
