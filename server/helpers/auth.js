import db from '../../config/sequelize_master';

const User = db.User;
const UserTokens = db.UserTokens;

const dataUser = {}

async function userInfo(token) {
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
            return null;
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


export {
    userInfo,
    dataUser,
};