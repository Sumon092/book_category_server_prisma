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

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: { id },
  });

  return result;
};

export const UserServices = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
