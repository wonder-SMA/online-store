import { Router } from 'express';
import { typeService } from './type.logic.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
import { ApiError } from '../../error/ApiError.js';

const typeRouter = () => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res, next) => {
      const types = await typeService.getAll();
      res.json(types);
    })
    .post(roleMiddleware('ADMIN'), async (req, res, next) => {
      try {
        const { name } = req.body;
        const type = await typeService.create(name);
        res.json(type);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  return router;
};

export { typeRouter };