import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas';

dotenv.config();

const startServer = async () => {
  const connection = await createConnection();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen({ port }, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

startServer().catch(err => console.error(err));
