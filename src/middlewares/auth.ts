import { AuthenticationError } from 'apollo-server-express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

export const auth = (req: Request, _: Response, next: NextFunction) => {
  if (req.cookies.access_token) {
    try {
      const payload = jwt.verify(
        req.cookies.access_token,
        process.env.JWT_SECRET as string
      ) as any;

      const user = User.findOne({ id: payload.userId });
      (req as any).user = user;
    } catch (err) {
      throw new AuthenticationError('Token is invalid');
    }
  }
  next();
};
