import { gql, IResolvers } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { attemptLogin } from '../auth';
import { Context } from '../apolloContext';

export const typeDefs = gql`
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Mutation {
    register(input: RegisterInput): User
    login(input: LoginInput): LoginResponse
  }
`;

export const resolvers: IResolvers<any, Context> = {
  Mutation: {
    register: async (_, { input }) => {
      const { name, email, password } = input;
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();
      return user;
    },
    login: async (_, { input }, { res }) => {
      const user = await attemptLogin(input);

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '2h',
        }
      );

      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 2,
        //TODO: HTTPS化したらSecure属性つける
        // secure: true,
        httpOnly: true,
      });
      return { token, user };
    },
  },
};
