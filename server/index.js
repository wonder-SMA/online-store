import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';

import sequelize from './db.js';
import { routers } from './routes';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';

const dirname = path.resolve();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', routers());
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`The server has been started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
