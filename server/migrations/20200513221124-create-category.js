'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('category', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11),
            },
            parent_id: {
                type: Sequelize.INTEGER(11),
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            is_deleted: {
                type: Sequelize.INTEGER(1),
                defaultValue: 0,
            },
            created_at: {
                type: Sequelize.DATE,
            },
            updated_at: {
                type: Sequelize.DATE,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('category');
    }
};