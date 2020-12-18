import { makeExecutableSchema } from 'apollo-server-express';
import * as userSchema from './user';

const typeDefs = [userSchema.typeDefs];
const resolvers = [userSchema.resolvers];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
