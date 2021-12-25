import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = async ({ context: { req } }, next) => {
  if (!req.session.userId) {
    throw new Error('Access denied: Not Authenticated!');
  }

  return next();
};
