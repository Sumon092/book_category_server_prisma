import { User } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';

const getProfile = async (reqUserId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: reqUserId,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.OK, 'User not found');
  }
  if (user.id === reqUserId) {
    return await prisma.user.findUnique({
      where: {
        id: reqUserId,
      },
    });
  }
  throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
};

export const ProfileService = {
  getProfile,
};
