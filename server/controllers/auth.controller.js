import moment from 'moment';

import HttpStatus from 'http-status-codes';
import db from '../../config/sequelize_master';
import cron from '../scheduler/cron';

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
                    "messages": "email sudah digunakan",
                }

                return res.json(response);
            } else {
                let generatedPassword = User.generatePassword(req.body.password, req.body.email);
                User.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: generatedPassword,
                }).then( (user_saved) => {
                    // create verify token
                    let user_createdat_timestamp = moment(user_saved.created_at).unix();
                    user_saved.update({
                        verify_token: User.generateVerifyToken(user_saved.email, user_createdat_timestamp)
                    })

                    // send email verification
                    cron.sendEmailVerification(user_saved.email);

                    // create token for user
                    const usertoken_info = {
                        id: user_saved.id,
                        email: user_saved.email,
                        created_at: user_createdat_timestamp
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
                                "avatar": user_saved.avatar + "." + user_saved.avatar_ext
                            }
                        }

                        return res.json(response);
                    })
                })
            }
        }).catch( error => next(error));
}

function verify_token(req, res, next) {
    User.getByVerifyToken(req.params.verify_token)
        .then( (user) => {
            if (!user) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "messages": "token verifikasi tidak ditemukan"
                }

                return res.json(response)
            } else {
                if (user.is_verify === 1) {
                    const response = {
                        "status": HttpStatus.BAD_REQUEST,
                        "messages": "email sudah pernah diverifikasi"
                    }

                    return res.json(response)
                } else {
                    user.update({
                        is_verify: 1
                    })
    
                    const response = {
                        "status": HttpStatus.OK,
                        "message": "email berhasil di verifikasi",
                    }
    
                    return res.json(response);
                }
            }
    }).catch(error => next(error));
}

function login(req, res, next) {
    User.findOne({
        where: { email: 'isnandamz'}
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
    verify_token,
};