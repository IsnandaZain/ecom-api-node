'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
      },
      user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      title: {
          type: Sequelize.STRING(160),
          allowNull: false,
      },
      description: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      price: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
      },
      stok: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};