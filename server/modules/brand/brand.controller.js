import { Router } from 'express';
import { brandService } from './brand.logic.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
import { ApiError } from '../../error/ApiError.js';

const brandRouter = () => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res, next) => {
      const brands = await brandService.getAll();
      res.json(brands);
    })
    .post(roleMiddleware('ADMIN'), async (req, res, next) => {
      try {
        const { name } = req.body;
        const brand = await brandService.create(name);
        res.json(brand);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  return router;
};

export { brandRouter };