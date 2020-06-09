import { Application } from 'express';
import TaskService from './Task.service';
import logger from '../logger';

export default (app: Application): void => {
  logger.debug('Bootstrapping app services');
  app.set('task-service', new TaskService());
};

