/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  bookSearchableFields,
  generateNumericFilterCondition,
} from './book.constants';
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
  const { searchTerm, ...filterData } = filters;

  const andConditions: (Prisma.BookWhereInput | {})[] = [];
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

  // const filterConditions = Object.keys(filterData).map(key => {
  //   if (key === 'category') {
  //     return {
  //       category: {
  //         title: (filterData as any)[key],
  //       },
  //     };
  //   } else if (key === 'minPrice') {
  //     return {
  //       price: {
  //         gte: parseFloat((filterData as any)[key]),
  //       },
  //     };
  //   } else if (key === 'maxPrice') {
  //     return {
  //       price: {
  //         lte: parseFloat((filterData as any)[key]),
  //       },
  //     };
  //   } else if (bookRelationalFields.includes(key)) {
  //     return {
  //       [bookRelationalFieldsMapper[key]]: {
  //         id: (filterData as any)[key],
  //       },
  //     };
  //   } else {
  //     return {
  //       [key]: {
  //         equals: (filterData as any)[key],
  //       },
  //     };
  //   }
  // });

  const filterConditions = Object.keys(filterData)
    .map(key => {
      if (key === 'category') {
        return {
          category: {
            title: (filterData as any)[key],
          },
        };
      } else if (key === 'minPrice') {
        return generateNumericFilterCondition(
          key,
          (filterData as any)[key],
          'gte'
        );
      } else if (key === 'maxPrice') {
        return generateNumericFilterCondition(
          key,
          (filterData as any)[key],
          'lte'
        );
      } else {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }
    })
    .filter(condition => condition !== null);

  andConditions.push({
    AND: filterConditions,
  });

  const whereConditions: Prisma.BookWhereInput | undefined =
    andConditions.length > 0 ? { AND: andConditions } : undefined;
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
    include: {
      category: true,
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

const getBookByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });
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

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookServices = {
  createBook,
  getAllBook,
  getBookByCategoryId,
  getSingleBook,
  updateBook,
  deleteBook,
};
