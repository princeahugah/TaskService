import { Model, DataTypes } from 'sequelize';
import db from '../sequelize';


export default class Task extends Model<Task> {
  public id!: string;
  public state!: string;
  public description!: string
  public userId!: string

  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  state: {
    type: DataTypes.ENUM,
    values: ['to do', 'done'],
    defaultValue: 'to do',
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'tasks',
  timestamps: true,
  paranoid: true
});
