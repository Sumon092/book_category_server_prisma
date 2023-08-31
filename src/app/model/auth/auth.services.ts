import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../constants/prisma';
const signUp = async (userData: User): Promise<User> => {
  const { password, ...userInfo } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data: {
      ...userInfo,
      password: hashedPassword,
    },
  });
  return result;
};

export const AuthServices = {
  signUp,
};
