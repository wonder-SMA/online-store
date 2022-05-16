import path from 'path';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { deviceService } from './device.logic.js';
import { ApiError } from '../../error/ApiError.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';

const dirname = path.resolve();

const deviceRouter = () => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res, next) => {
      try {
        let { brandId, typeId, limit, page } = req.query;
        limit = limit || 9;
        page = page || 1;
        const offset = page * limit - limit;
        const devices = await deviceService.getAll(brandId, typeId, limit, offset);
        res.json(devices);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    })
    .post(roleMiddleware('ADMIN'), async (req, res, next) => {
      try {
        const { name, price, typeId, brandId, info } = req.body;
        const { img } = req.files;
        const filename = uuidv4() + '.jpg';
        await img.mv(path.resolve(dirname, 'static', filename));
        const device = await deviceService.create({ name, price, typeId, brandId, info, img: filename });
        res.json(device);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  router
    .route('/:id')
    .get(async (req, res, next) => {
      try {
        const { id } = req.params;
        const device = await deviceService.getOne(id);
        res.json(device);
      } catch (err) {
        next(ApiError.badRequest(err.message));
      }
    });

  return router;
};

export { deviceRouter };