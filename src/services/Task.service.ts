
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
          attributes: ['name'],
          required: true
        }
      ],
      order: Sequelize.literal('Task.createdAt DESC'),
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
      Object.keys(payload).forEach((key: any) => {
        task.set(key, payload[key]);
      });
      return task.save();
    }
    return null;
  }
}
