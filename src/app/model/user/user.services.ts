import { User } from '@prisma/client';
import prisma from '../../../constants/prisma';

const getAllUser = async (): Promise<User[]> => {
  const results = await prisma.user.findMany();

  return results;
};

export const UserServices = {
  getAllUser,
};
