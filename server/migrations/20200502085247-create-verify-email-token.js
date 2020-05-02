'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verify_email_token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      token: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      is_verify: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
      is_deleted: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable('verify_email_token');
  }
};