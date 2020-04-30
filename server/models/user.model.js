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
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING(45),
            unique: true,
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
        is_verify: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        },
        verify_token: {
            type: DataTypes.STRING(150),
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
    };

    // Class methods
    User.getByEmail = function getByEmail(email) {

        return this.findOne({
            where: {
                email
            },
        });
    };

    User.getByVerifyToken = function getByVerifyToken(verify_token) {
        return this.findOne({
            where: {
                verify_token,
            }
        });
    };

    User.generateVerifyToken = function generateVerifyToken(email, created_at) {
        let regex = /^\w+([\.-]?\w+)*@/;
        let userInfo = created_at.toString().concat(email.match(regex)[0].split("@")[0]);

        return crypto.createHash('md5').update(userInfo).digest('hex');
    };

    User.generatePassword = function generatePassword(password, email) {
        let regex = /^\w+([\.-]?\w+)*@/;
        let userInfo = password.concat(email.match(regex)[0].split("@")[0]);

        return crypto.createHash('md5').update(userInfo).digest('hex');  
    };

    // Instance Method
    User.prototype.checkPassword = function checkPassword() {
        return this.password;
    };

    return User;
};