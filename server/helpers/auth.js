import HttpStatus from 'http-status-codes';

import db from '../../config/sequelize_master';

const User = db.User;
const UserTokens = db.UserTokens;

const dataUser = {}

async function userInfo(res, token) {
    await UserTokens.findOne({
        where: {
            token: token,
        },
        include: [{
            model: User,
            as: 'user'
        }],
    }).then( (user_token) => {
        if (!user_token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                "status": HttpStatus.UNAUTHORIZED,
                "messages": "token tidak valid"
            });
        } else {
            dataUser['id'] = user_token.user.id;
            dataUser["username"] = user_token.user.username;
            dataUser["fullname"] = user_token.user.fullname;
            dataUser["email"] = user_token.user.email;
            dataUser["role"] = user_token.user.roles;
            dataUser["token"] = user_token.token;

            return dataUser;
        }
    })
}


function checkPermission(res, role) {
    if (dataUser.role != role) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            "status": HttpStatus.UNAUTHORIZED,
            "messages": "You have not permission to do this action"
        })
    }
}

export {
    userInfo,
    checkPermission,
    dataUser,
};