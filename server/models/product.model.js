import { Sequelize } from 'sequelize';


'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(160),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        stok: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
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
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    Product.associate = (models) => {
        Product.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
            constraints: false,
        });

        Product.hasMany(models.ProductSize, {
            as: 'product_size',
            foreignKey: 'product_id',
        });

        Product.hasMany(models.ProductColor, {
            as: 'product_color',
            foreignKey: 'product_id',
        });

        Product.hasMany(models.ProductMaterial, {
            as: 'product_material',
            foreignKey: 'product_id'
        });
    };

    return Product;
};