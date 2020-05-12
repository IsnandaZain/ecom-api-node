import { Sequelize } from 'sequelize';

'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define("ProductColor", {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        color: {
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
            defaultValue: Sequelize.NOW(),
        }
    }, {
        tableName: 'product_color',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    ProductColor.associate = (models) => {
        ProductColor.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            constraints: false,
        })
    };

    return ProductColor;
};