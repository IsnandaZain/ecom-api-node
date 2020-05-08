'use strict';
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('products', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER(11),
          },
          user_id: {
              allowNull: false,
              type: Sequelize.INTEGER(11),
          },
          title: {
              allowNull: false,
              type: Sequelize.STRING(160),
          },
          description: {
              allowNull: false,
              type: Sequelize.STRING(500),
          },
          price: {
              defaultValue: 0,
              type: Sequelize.INTEGER,
          },
          stok: {
              defaultValue: 1,
              type: Sequelize.INTEGER,
          },
          is_deleted: {
              type: Sequelize.INTEGER(1),
              defaultValue: 0,
          },
          created_at: {
              type: Sequelize.DATE,
          },
          updated_at: {
              type: Sequelize.DATE
          }
      });
   },
   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('products');
   }
};