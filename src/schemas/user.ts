import { gql, IResolvers, AuthenticationError } from 'apollo-server-express';
import { Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

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

  type Query {
    getAllUsers: [User]!
  }

  type Mutation {
    register(input: RegisterInput): User
    login(input: LoginInput): LoginResponse
  }
`;

export const resolvers: IResolvers<any, { res: Response }> = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
  },
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
      const { email, password } = input;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No such user exists');
      }

      const isValidCredential = await bcrypt.compare(password, user.password);
      if (!isValidCredential) {
        throw new AuthenticationError('Wrong password');
      }

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
