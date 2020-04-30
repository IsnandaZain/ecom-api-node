'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(160),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
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
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['title']
            }
        ]
    });

    Product.associate = function(models) {
      // associations can be defined here
      Product.belongsTo(models.User, {
          as: 'user',
          foreignKey: 'user_id',
          constraints: false,
      });
    };

    return Product;
};