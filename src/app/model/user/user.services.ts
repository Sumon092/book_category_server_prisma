import { User } from '@prisma/client';
import prisma from '../../../constants/prisma';

const getAllUser = async (): Promise<User[]> => {
  const results = await prisma.user.findMany();

  return results;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  return result;
};

export const UserServices = {
  getAllUser,
  getSingleUser,
};
