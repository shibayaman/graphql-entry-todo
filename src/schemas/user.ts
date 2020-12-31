import { gql, IResolvers, AuthenticationError } from 'apollo-server-express';
import { User } from '../entities/User';
import { Context } from '../apolloContext';

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

export const resolvers: IResolvers<any, Context> = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('not logged in');
      }
      return user;
    },
  },
};
