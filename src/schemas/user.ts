import { gql, IResolvers } from 'apollo-server-express';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';

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

  type Query {
    getAllUsers: [User]!
  }

  type Mutation {
    register(input: RegisterInput): User
  }
`;

export const resolvers: IResolvers = {
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
  },
};
