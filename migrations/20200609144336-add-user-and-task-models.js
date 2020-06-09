'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const queries = [
      queryInterface.sequelize.query(
          `CREATE TABLE users (
            "id" UUID PRIMARY KEY NOT NULL,
            "name" VARCHAR(100) NOT NULL,
            "createdAt" DATETIME NOT NULL,
            "updatedAt" DATETIME NOT NULL,
            "deletedAt" DATETIME NULL
          )`
      ),
      queryInterface.sequelize.query(
          `CREATE TABLE tasks (
            "id" UUID PRIMARY KEY NOT NULL,
            "state" ENUM ['to do', 'done'] NOT NULL DEFAULT 'to do',
            "description" VARCHAR(255) NULL,
            "userId" uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            "createdAt" DATETIME NOT NULL,
            "updatedAt" DATETIME NOT NULL,
            "deletedAt" DATETIME NULL
          )`
      )
    ];
    return await Promise.all(queries);
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.sequelize.query('DROP TABLE `users`'),
      queryInterface.sequelize.query('DROP TABLE `tasks`')
    ]);
  }
};
