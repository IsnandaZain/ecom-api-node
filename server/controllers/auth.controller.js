import moment from 'moment';

import HttpStatus from 'http-status-codes';
import db from '../../config/sequelize_master';
import paramValidation from '../validator/auth.validation';

const User = db.User;
const UserTokens = db.UserTokens;

/**
 * Register a new user
 * @param {*} req 
 * @param {*} res 
 * @returns {*}
 */
function register(req, res, next) {
    User.getByEmail(req.body.email)
        .then( (user) => {
            if (user) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "message": "email sudah digunakan"
                }

                return res.json(response);
            } else {
                // generate verify token
                
                User.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: req.body.password,
                }).then( (user_saved) => {
                    // create verify token
                    const verifytoken_info = user_saved.fullname.concat(moment(user_saved.create).unix().toString());
                    user_saved.update({
                        verify_token: User.generateVerifyToken(verifytoken_info)
                    })
                    
                    // create token for user
                    const usertoken_info = {
                        id: user_saved.id,
                        email: user_saved.email,
                        created_at: moment(user_saved.create).unix(),
                    }

                    UserTokens.create({
                        user_id: user_saved.id,
                        token: UserTokens.generateToken(usertoken_info),
                    }).then( (usertokens_saved) => {
                        const response = {
                            "status": HttpStatus.OK,
                            "result": {
                                "id": user_saved.id,
                                "fullname": user_saved.fullname,
                                "email": user_saved.email,
                                "password": user_saved.password,
                                "token": usertokens_saved.token,
                                "verify_token": user_saved.verify_token,
                                "is_suspended": user_saved.suspended,
                                "avaatar": user_saved.avatar + "." + user_saved.avatar_ext
                            }
                        }
    
                        return res.json(response);
                    })
                })
            }
        }).catch( error => next(error));
}

function login(req, res, next) {
    User.findOne({
        where: { username: 'isnandamz'}
    }).then( (user) => {
        if (!user) {
            const response = {
                "message": "User does not exist!",
                "status": HttpStatus.NOT_FOUND,
            }
            return res.json(response);
        }
        return res.json(user.username);
    })
}

export {
    register,
    login,
};