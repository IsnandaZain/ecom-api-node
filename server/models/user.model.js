import crypto from 'crypto';
import { create } from 'domain';
import { Sequelize } from 'sequelize';

/**
 * User Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(45),
        },
        roles: {
            type: DataTypes.STRING(15),
            allowNull: false,
            defaultValue: 'user',
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        },
        avatar: {
            type: DataTypes.STRING(50),
        },
        avatar_ext: {
            type: DataTypes.STRING(6),
        },
        is_suspended: {
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
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        freezeTableName: true,
    });

    User.associate = (models) => {
        User.hasMany(models.UserTokens, {
            as: 'usertokens',
            foreignKey: 'id',
        });  

        User.hasMany(models.VerifyEmailToken, {
            as: 'verify_email',
            foreignKey: 'id',
        });
    };

    // Class methods
    User.getByEmail = function getByEmail(email) {

        return this.findOne({
            where: {
                email: email,
                is_deleted: 0,
            },
        });
    };

    User.generatePassword = function generatePassword(password, salt) {
        password += salt

        return crypto.createHash('md5').update(password).digest('hex');  
    };

    User.generateSalt = function generateSalt() {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < 5; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    // Instance Method
    User.prototype.checkPassword = function checkPassword(password) {
        let regex = /^\w+([\.-]?\w+)*@/;
        let userInfo = password.concat(this.email.match(regex)[0].split("@")[0]);
        console.log("userInfo : ", userInfo);

        let input_password = crypto.createHash('md5').update(userInfo).digest('hex');
        return this.password === input_password;
    };

    return User;
};