import { Book, Prisma } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

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

const getAllBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  console.log(filtersData);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookServices = {
  createBook,
  getAllBook,
};
