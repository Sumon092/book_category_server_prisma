import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
const createCategory = async (categoryData: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: categoryData,
  });
  return result;
};

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });

  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const exist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const exist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const exist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
