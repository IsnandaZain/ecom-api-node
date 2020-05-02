'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50)
      },
      roles: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'user',
      },
      is_deleted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0,
      },
      salt: {
        type: Sequelize.STRING(5)
      },
      is_suspended: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0,
      },
      avatar: {
        type: Sequelize.STRING(50),
      },
      avatar_ext: {
        type: Sequelize.STRING(50),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};