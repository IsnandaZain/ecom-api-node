import { Sequelize, DataTypes } from 'sequelize';

'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        image_thumb: {
            type: DataTypes.STRING(60)
        },
        image_icon: {
            type: DataTypes.STRING(60)
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
        tableName: 'product_image',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            constraints: false,
        })
    };

    return ProductImage;
}