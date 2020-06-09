import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import _404Controller from '../controllers/404.controller';

export const tasks = Router();

tasks.get('/:userId', TaskController.getTasks);
tasks.post('/:userId', TaskController.createTask);
tasks.put('/:id', TaskController.updateTask);
tasks.delete('/:id', TaskController.deleteTask);
tasks.all('/*', _404Controller);
