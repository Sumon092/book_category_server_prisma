import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

// function exclude<User, Key extends keyof User>(
//   user: User,
//   keys: Key[]
// ): Omit<User, Key> {
//   const result: Partial<User> = {};
//   for (const key of Object.keys(user) as Key[]) {
//     if (!keys.includes(key)) {
//       result[key] = user[key];
//     }
//   }
//   return result as Omit<User, Key>;
// }
const signUp = async (userData: User): Promise<Partial<User>> => {
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

const login = async (email: string, providedPassword: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.OK, 'User no found');
  }
  const isPasswordValid = await bcrypt.compare(providedPassword, user.password);
  const { role, id: userId } = user;
  if (isPasswordValid) {
    const accessToken = jwtHelpers.createToken(
      { role, userId },
      config.jwt.secret as Secret,
      config.jwt.jwt_expires as string
    );
    return accessToken;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
  }
};

export const AuthServices = {
  signUp,
  login,
};
