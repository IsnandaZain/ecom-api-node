'use strict';
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('product_size', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER(11)
          },
          product_id: {
              allownull: false,
              type: Sequelize.INTEGER(11),
          },
          size_: {
              allowNull: false,
              type: Sequelize.STRING(10)
          },
          is_deleted: {
              allowNull: false,
              type: Sequelize.INTEGER(1),
              defaultValue: 0,
          },
          created_at: {
              type: Sequelize.DATE,
          },
          updated_at: {
              type: Sequelize.DATE,
          }
      })
   },
   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('product_size');
   }
}