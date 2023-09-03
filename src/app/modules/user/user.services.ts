import { User } from '@prisma/client';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';

const getAllUser = async (): Promise<User[]> => {
  const results = await prisma.user.findMany();

  return results;
};

const getSingleUser = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  if (!result) {
    throw new ApiError(404, 'User not exist');
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  if (!result) {
    throw new ApiError(404, 'User not exist');
  }
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
