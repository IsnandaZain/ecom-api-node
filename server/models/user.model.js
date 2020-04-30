import crypto from 'crypto';

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
    }, {
        tableName: 'users',
        timestamps: true,
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

    User.generateVerifyToken = function generateVerifyToken(userInfo) {
        return crypto.createHash('md5').update(userInfo).digest('hex');
    };

    return User;
};