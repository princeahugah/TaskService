import { Sequelize } from 'sequelize';
import logger from './logger';
import * as config from '../migrations/config.json';

const dbConfig = (config as any)[process.env.NODE_ENV as string];
const sequelize = new Sequelize(
  process.env.NODE_ENV as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    ...dbConfig,
    logging: (log: string): void => {
      logger.debug(`SQL: ${log}`);
    }
  }
);
export default sequelize;
