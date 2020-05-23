import { Sequelize } from 'sequelize';

'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define('ProductCategory', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW(),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW()
        }
    }, {
        tableName: 'product_category',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    ProductCategory.associate = (models) => {
        ProductCategory.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            constraints: false,
        })
    };

    return ProductCategory;
};