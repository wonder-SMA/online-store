import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { ApiError } from '../../error/ApiError.js';
import { Basket, User } from '../../models/models.js';

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

const userRouter = () => {
  const router = Router();

  router
    .route('/registration')
    .post([
      check('email', 'Имя пользователя не может быть пустым').notEmpty(),
      check('password', 'Пароль должен быть больше 4 символов').isLength({ min: 4 })
    ], async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(ApiError.badRequest(`Ошибка при регистрации: ${JSON.stringify(errors)}`));
        }
        const { email, password, role } = req.body;
        if (!email || !password) {
          return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
          return next(ApiError.badRequest('Пользователь с таким именем уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        res.json(token);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  router
    .route('/login')
    .post(async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return next(ApiError.badRequest('Пользователь не найден'));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
          return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        res.json(token);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  router
    .route('/auth')
    .get(authMiddleware, async (req, res, next) => {
      try {
        const { id, email, role } = req.user;
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return next(ApiError.badRequest('Пользователь не найден'));
        }
        const token = generateJwt(id, email, role);
        res.json(token);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  return router;
};

export { userRouter };