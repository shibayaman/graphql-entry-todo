import { AuthenticationError } from 'apollo-server-express';
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
