import { Router } from 'express';
import { userRouter } from '../modules/user';
import { deviceRouter } from '../modules/device';
import { brandRouter } from '../modules/brand';
import { typeRouter } from '../modules/type';

const routers = () => {
  const router = Router();

  router.use('/user', userRouter());
  router.use('/device', deviceRouter());
  router.use('/brand', brandRouter());
  router.use('/type', typeRouter());

  return router;
};

export { routers };