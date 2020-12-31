import { Request, Response } from 'express';
import { User } from './entities/User';
import { retrieveUserFromCookie } from './auth';

export interface Context {
  req: Request;
  res: Response;
  user: User;
}

export const createContext = async (req: Request, res: Response) => {
  const user = await retrieveUserFromCookie(req);

  return { req, res, user };
};
