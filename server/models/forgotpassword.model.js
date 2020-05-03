import crypto from 'crypto';
import { Sequelize } from 'sequelize';

/**
 * ForgotPassword Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const ForgotPassword = sequelize.define('ForgotPassword', {
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
            allowNUll: false,
        },
        salt: {
            type: DataTypes.STRING(5),
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
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
        tableName: 'forgot_passwords',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });


    ForgotPassword.associate = function(models) {
        // associations can be defined here
        ForgotPassword.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id',
            constraints: false,
        });
    };


    // Class Method
    ForgotPassword.generateUrl = function generateUrl(email, salt) {
        email += salt;

        return crypto.createHash('md5').update(email).digest('hex');
    }

    ForgotPassword.generateSalt = function generateSalt() { 
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
        
        return result;
    }

    return ForgotPassword;
}