import crypto from 'crypto';
import { Sequelize } from 'sequelize';

/**
 * User Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const VerifyEmailToken = sequelize.define('VerifyEmailToken', {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    token: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(5),
    },
    is_verify: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
    },
    is_deleted: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
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
      tableName: 'verify_email_token',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      freezeTableName: true,
  });


  VerifyEmailToken.associate = function(models) {
      // associations can be defined here
      VerifyEmailToken.belongsTo(models.User, {
          as: 'user',
          foreignKey: 'user_id',
          constraints: false,
      });
  };

  // Class Method
  VerifyEmailToken.generateUrl = function generateUrl(email, salt) {
      email += salt;

      return crypto.createHash('md5').update(email).digest('hex');
  }

  VerifyEmailToken.generateSalt = function generateSalt() {
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < 5; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
      return result;
  }

  VerifyEmailToken.generateToken = function generateToken() {
      let min = Math.ceil(0);
      let max = Math.floor(9);
      let stringtoken = "";
      for (let i = 0; i < 4; i++) {
          stringtoken += Math.floor(Math.random() * (max - min)).toString();
      }

      // convert string to integer
      let inttoken = parseInt(stringtoken);

      // make sure token is not exists
      const exists_token = VerifyEmailToken.findOne({
          where: Sequelize.and(
            {token: inttoken},
            {is_deleted: 0}
          )
      })

      if (!exists_token.token){
          return inttoken;
      } else {
          generateToken();
      }
  };


  return VerifyEmailToken;
};