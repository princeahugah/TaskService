import logger from '../logger';
import { Request, Response } from 'express';
import TaskModel from '../models/Task';

export default {

  getTasks: (req: Request, res: Response): void => {
    req.app.get('task-service')
        .getTasks()
        .then((tasks: TaskModel[]) => {
          req.payload = [...tasks];
          res.status(200).json(tasks).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in getTasks handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  deleteTask: (req: Request, res: Response): void => {
    req.app.get('task-service')
        .deleteTask(req.params.id)
        .then(() => {
          req.payload = {
            id: req.params.id
          };
          res.status(200).json({ id: req.params.id }).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in deleteTask handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  updateTask: (req: Request, res: Response): void => {
    req.app.get('task-service')
        .updateTask(req.params.id, req.body)
        .then((task: TaskModel | null) => {
          req.payload = task?.toJSON();
          res.status(200).json( task?.toJSON() ).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in updateTask handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  createTask: (req: Request, res: Response): void => {
    req.app.get('task-service')
        .createTask(req.body)
        .then((task: TaskModel) => {
          req.payload = {
            ...task.toJSON()
          };
          res.status(200).json( task.toJSON() ).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in createTask handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  }
};
