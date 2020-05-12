import { Sequelize, DATE } from 'sequelize';

'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductSize = sequelize.define("ProductSize", {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        }, 
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        size_: {
            type: DataTypes.STRING(10),
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
        tableName: 'product_size',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    })

    ProductSize.associate = (models) => {
        ProductSize.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            constraints: false,
        })
    };

    return ProductSize
};