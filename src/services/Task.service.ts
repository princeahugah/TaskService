
import UserModel from '../models/User';
import TaskModel from '../models/Task';
import { Sequelize } from 'sequelize';

interface Task {
  [key: string]: string | null;
}

export default class TaskService {
  getTasks(userId: string): Promise<TaskModel[]> {
    return TaskModel.findAll({
      where: {
        userId
      },
      include: [
        {
          model: UserModel,
          as: 'user'
        }
      ],
      order: Sequelize.literal('createdAt DESC'),
      raw: true
    });
  }

  createTask(payload: Task): Promise<TaskModel> {
    return TaskModel.create(payload, { raw: true });
  }

  async deleteTask(id: string): Promise<void> {
    const task: TaskModel | null = await TaskModel.findByPk(id);
    if (task) return task.destroy();
  }

  async updateTask(id: string, payload: Task): Promise<TaskModel|null> {
    const task: TaskModel | null = await TaskModel.findByPk(id);
    if (task) {
      return task.update(payload, {
        where: {
          userId: payload.userid
        },
        raw: true
      });
    }
    return null;
  }
}
