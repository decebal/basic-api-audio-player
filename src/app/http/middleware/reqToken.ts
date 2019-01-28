import { AuthenticationError } from 'apollo-server-koa';
import * as jwt from 'jsonwebtoken';
// import { JWT_PUBLIC_CERT } from '../../environment/const';

export const reqToken = (request, headerKey = 'Bearer') => {
  const { header } = request;

  let token;

  if (header && header.authorization) {
    const parts = header.authorization.split(' ');
    if (parts.length === 2 && parts[0] === headerKey) {
      token = parts[1];
    }
  }

  // const publicKey = JWT_PUBLIC_CERT.trim().replace(/\\n/gm, '\n');
  const publicKey = "";

  if (token == null) {
    return;
  }

  try {
    return jwt.verify(token, publicKey);
  } catch (err) {
    throw new AuthenticationError('you must be logged in !');
  }
};

