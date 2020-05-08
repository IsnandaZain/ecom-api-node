import {Sequelize} from 'sequelize';

import db from '../../config/sequelize_master';

const User = db.User;
const UserTokens = db.UserTokens;

const dataUser = {}

function userInfo(token) {
    UserTokens.findOne({
        where: {
            token: token,
        },
        include: [{
            model: User,
            as: 'user'
        }],
    }).then( (user_token) => {
        dataUser['token'] = user_token.token,
        dataUser['user'] = {
            "id": user_token.user.id,
            "username": user_token.user.username,
            "fullname": user_token.user.fullname,
            "email": user_token.user.email,
            "role": user_token.user.roles,
        }
    })
}

export {
    userInfo,
    dataUser,
};