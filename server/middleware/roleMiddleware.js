import jwt from 'jsonwebtoken';
import { ApiError } from '../error/ApiError.js';

const roleMiddleware = (role) => {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return next(ApiError.unauthorized('Пользователь не авторизован'));
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        next(ApiError.forbidden('У вас нет доступа'));
      }
      req.user = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (e) {
      next(ApiError.unauthorized('Пользователь не авторизован'));
    }
  };
};

export { roleMiddleware };