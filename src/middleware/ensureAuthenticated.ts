import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '../config/jwt';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Missing authorization, you must log in! (No JWT found)');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const decode = verify(token, secret);
    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub
    }
  } catch {
    throw new Error('Invalid JWT token! You must log in again!');
  }


  return next();
}
