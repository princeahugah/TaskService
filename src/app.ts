import config from 'config';
import express from 'express';
import setupServices from './services';
import setupMiddlewares from './middlewares';
import winsLogger from './logger';
import logger from './middlewares/logger';
import _404Controller from './controllers/404.controller';
import { tasks } from './routes/tasks';

const app = express();
const setupConfig = (): void => {
  winsLogger.debug('Setting up app config');
  app.disable('x-powered-by');
  app.set('env', process.env.NODE_ENV);
  app.set('config', config);
};

const setupRoutes = (): void => {
  winsLogger.debug('Initializing Routes');
  app.use('/api/tasks', tasks);
  app.use('/*', _404Controller);
  app.use(logger.error);
};

setupConfig();
setupServices(app);
setupMiddlewares(app);
setupRoutes();

export default app;
