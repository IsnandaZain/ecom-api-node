import jwt from 'jsonwebtoken';

'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserTokens = sequelize.define('UserTokens', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        }
      }, {
          tableName: 'user_tokens',
          timestamps: true,
          underscored: true,
          freezeTableName: true,
          indexes: [
              {
                  fields: ['title']
              }
          ]
      });

    UserTokens.associate = function(models) {
        // associations can be defined here
        UserTokens.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id',
            constraints: false,
        })
    };

    // Class Method
    UserTokens.generateToken = function generateToken(userInfo) {
        return jwt.sign(userInfo, process.env.JWT_SECRET);
    }

  
    return UserTokens;
};