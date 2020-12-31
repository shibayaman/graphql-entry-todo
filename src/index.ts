import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schemas';
import { createContext } from './apolloContext';

dotenv.config();

const startServer = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => createContext(req, res),
  });

  const app = express();

  app.use(cookieParser());

  const port = process.env.PORT || 4000;
  server.applyMiddleware({
    app,
    cors: { origin: true, credentials: true },
  });

  app.listen({ port }, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

startServer().catch(err => console.error(err));
