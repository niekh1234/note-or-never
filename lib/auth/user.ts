import { User } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import prisma from '../prisma';

const SALT_ROUNDS = 10;

export const createUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const nUsers = await prisma.user.count();

  if (nUsers > 1) {
    throw new Error('There is already a registered user. Did you mean to log in?');
  }

  const salt = await genSalt(SALT_ROUNDS);
  const hashedPassword = await hash(password, salt);

  const newUser = {
    username,
    password: hashedPassword,
  };

  return await prisma.user.create({ data: newUser });
};

export const findUser = async ({ username }: { username: string }) => {
  return await prisma.user.findFirst({ where: { username } });
};

export const validatePassword = async (user: User, inputPassword: string) => {
  return await compare(inputPassword, user.password);
};
