import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './entities/User';

export const attemptLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('No such user exists');
  }

  const isValidCredential = await bcrypt.compare(password, user.password);
  if (!isValidCredential) {
    throw new AuthenticationError('Wrong password');
  }

  return user;
};

export const retrieveUserFromCookie = async (req: Request) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return undefined;
  }

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as any;
    return await User.findOne({ id: payload.userId });
  } catch (err) {
    throw new AuthenticationError('Access token is not valid');
  }
};
