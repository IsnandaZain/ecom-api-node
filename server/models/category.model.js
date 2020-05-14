import { Sequelize, DataTypes } from 'sequelize';

'use strict';
module.exports = (sequelize, DatatTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        parent_id: {
            type: DataTypes.INTEGER(11),
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW()
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW()
        }
    }, {
        tableName: 'category',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    Category.associate = (models) => {

    };

    return Category;
}