'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_color', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11),
            },
            product_id: {
                allowNull: false,
                type: Sequelize.INTEGER(11),
            }, 
            color: {
                allowNull: false,
                type: Sequelize.STRING(20),
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
        return queryInterface.dropTable('product_color');
    }
}