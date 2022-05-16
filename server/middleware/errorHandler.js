import { ApiError } from '../error/ApiError.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  err instanceof ApiError
    ? res.status(err.status).json({ message: err.message })
    : res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export { errorHandlerMiddleware };
