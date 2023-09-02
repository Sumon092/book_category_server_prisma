import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../constants/prisma';

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const result: Partial<User> = {};
  for (const key of Object.keys(user) as Key[]) {
    if (!keys.includes(key)) {
      result[key] = user[key];
    }
  }
  return result as Omit<User, Key>;
}
const signUp = async (userData: User): Promise<Partial<User>> => {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const excludePassword = exclude(userData, ['password']);
  await prisma.user.create({
    data: {
      ...excludePassword,
      password: hashedPassword,
    },
  });
  return excludePassword;
};

export const AuthServices = {
  signUp,
};
