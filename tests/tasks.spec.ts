import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../src/models/User';
import TaskModel from '../src/models/Task';
import TaskService from '../src/services/Task.service';
import { expect } from 'chai';

process.env.NODE_ENV = 'test';

interface User {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

describe('Task Service', async () => {
  const task = new TaskService();
  let john: User;

  before(async () => {
    await TaskModel.destroy({ truncate: true, cascade: false });
    john = (await UserModel.create({ name: 'John Doe' }, { raw: true })).toJSON() as User;
  });

  it('should return an empty list of tasks assigned to John Doe', async () => {
    const result = await task.getTasks(john.id);
    expect(result.length).to.equal(0);
  });

  it('should create 3 different "to do" tasks assigned to John Doe', async () => {
    const tasks = [
      {
        state: 'to do',
        description: 'Learn python programming',
        userId: john.id
      },
      {
        state: 'to do',
        description: 'Learn Vue.js',
        userId: john.id
      },
      {
        state: 'to do',
        description: 'Learn Node.js',
        userId: john.id
      }
    ];
    await task.createTask(tasks[0]);
    await task.createTask(tasks[1]);
    await task.createTask(tasks[2]);

    const result = await task.getTasks(john.id);
    expect(result.length).to.equal(3);
  });

  it('should update the status of "Learn python programming" to "done"', async () => {
    const tasks = await task.getTasks(john.id);
    const pythonTask = tasks.find((u: TaskModel) => u.description === 'Learn python programming');

    expect(pythonTask).to.not.equal(undefined);
    if (pythonTask) {
      const result = await task.updateTask(pythonTask?.id, { state: 'done' });
      expect(result?.state).to.equal('done');
      expect(result?.description).to.equal('Learn python programming');
    }
  });

  it('should delete "Learn Node.js" task', async () => {
    const tasks = await task.getTasks(john.id);
    const nodeTask = tasks.find((u: TaskModel) => u.description === 'Learn Node.js');

    expect(nodeTask).to.not.equal(undefined);
    if (nodeTask) {
      await task.deleteTask(nodeTask?.id);
      const result = await task.getTasks(john.id);
      expect(result.length).to.equal(2);
    }
  });
});
