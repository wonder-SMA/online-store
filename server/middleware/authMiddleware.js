import jwt from 'jsonwebtoken';
import { ApiError } from '../error/ApiError.js';

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorized('Пользователь не авторизован'));
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (e) {
    next(ApiError.unauthorized('Пользователь не авторизован'));
  }
};

export { authMiddleware };