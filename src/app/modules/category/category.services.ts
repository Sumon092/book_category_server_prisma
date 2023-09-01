import { Category } from '@prisma/client';
import prisma from '../../../constants/prisma';
const createCategory = async (categoryData: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: categoryData,
  });
  return result;
};

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
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
};
