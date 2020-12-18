import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schemas';

dotenv.config();

const startServer = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema,
  });

  const app = express();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen({ port }, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

startServer().catch(err => console.error(err));
