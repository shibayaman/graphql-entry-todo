import { makeExecutableSchema } from 'apollo-server-express';
import * as userSchema from './user';
import * as authSchema from './auth';

const typeDefs = [userSchema.typeDefs, authSchema.typeDefs];
const resolvers = [userSchema.resolvers, authSchema.resolvers];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
