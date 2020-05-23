'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_category', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            product_id: {
                allowNull: false,
                type: Sequelize.INTEGER(11),
            },
            category_id: {
                allowNull: false,
                type: Sequelize.INTEGER(11),
            },
            is_deleted: {
                type: Sequelize.INTEGER(11),
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
        return queryInterface.dropTable('product_category');
    }
};