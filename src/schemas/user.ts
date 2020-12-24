import { gql, IResolvers, AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { User } from '../entities/User';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getAllUsers: [User]!
    me: User!
  }
`;

export const resolvers: IResolvers<any, { req: Request }> = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    me: async (_, __, { req }) => {
      const user = (req as any).user;
      if (!user) {
        throw new AuthenticationError('not logged in');
      }
      return user;
    },
  },
};
