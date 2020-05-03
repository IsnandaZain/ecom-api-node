import moment from 'moment';
import {Sequelize} from 'sequelize';

import HttpStatus from 'http-status-codes';
import db from '../../config/sequelize_master';
import cron from '../schedulers/cron';

const User = db.User;
const UserTokens = db.UserTokens;
const VerifyEmailToken = db.VerifyEmailToken;

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
                User.create({
                    username: req.body.fullname.toLowerCase().split(" ").slice(0,2).join('.'),
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: req.body.password,
                }).then( (user_saved) => {
                    let user_salt = User.generateSalt();
                    let verify_email_salt = VerifyEmailToken.generateSalt();

                    user_saved.update({
                        password: User.generatePassword(req.body.password, user_salt),
                        salt: user_salt,
                    })
    
                    // create verify email
                    VerifyEmailToken.create({
                        user_id: user_saved.id,
                        token: VerifyEmailToken.generateToken(),
                        url: VerifyEmailToken.generateUrl(user_saved.id, verify_email_salt),
                        salt: verify_email_salt,
                    })

                    // create user_tokens
                    const usertoken_info = {
                        id: user_saved.id,
                        email: user_saved.email,
                        created_at: moment().unix(),
                    };

                    UserTokens.create({
                        user_id: user_saved.id,
                        token: UserTokens.generateToken(usertoken_info),
                    }).then( (usertokens_saved) => {
                        // send email verification
                        cron.sendEmailVerification(user_saved.id);
                        const response = {
                            "status": HttpStatus.OK,
                            "result": {
                                "id": user_saved.id,
                                "username": user_saved.username,
                                "fullname": user_saved.fullname,
                                "token": usertokens_saved.token,
                                "is_suspended": user_saved.is_suspended,
                            }
                        }
                        return res.json(response);
                    })
                })
            }
        }).catch( error => next(error));   
}

function verify_email(req, res, next) {
    VerifyEmailToken.findOne({
        where: Sequelize.and(
            {url:req.params.verify_url},
            {token:req.body.token}
        ), include: [{
            model: User,
            as: 'user'
        }]
    })
        .then( (token) => {
            if (!token) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "messages": "token verifikasi tidak ditemukan"
                }

                return res.json(response)
            } else {
                if (token.is_verify === 1) {
                    const response = {
                        "status": HttpStatus.BAD_REQUEST,
                        "messages": "email sudah pernah diverifikasi"
                    }

                    return res.json(response)
                } else {
                    token.update({
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
        where: Sequelize.and(
            {is_deleted: 0},
            Sequelize.or(
                {email:req.body.username},
                {username:req.body.username}
            )
        ), include: [{
            model: VerifyEmailToken,
            as: 'verify_email',
            order: [
                ['id', 'desc']
            ]
        }]
    })
    .then( (user) => {
        if (!user) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": "user tidak ditemukan"
            }

            return res.json(response);
        } else {
            if (user.verify_email[0].is_verify === 0) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "messages": "email akun belum diverifikasi"
                }

                return res.json(response);
            } else {
                Promise.all([
                    user.checkPassword(req.body.password),
                    UserTokens.findOne({
                        where: {user_id: user.id}, 
                        order: [
                            ['id','desc'] 
                    ]})
                ]).then( ([checkedPassword, generatedToken]) => {
                    if (!checkedPassword) {
                        const response = {
                            "status": HttpStatus.UNAUTHORIZED,
                            "messages": "password yang diinputkan salah"
                        }
    
                        return res.json(response);
                    } else {
                        const response = {
                            "status": HttpStatus.OK,
                            "result": {
                                "id": user.id,
                                "fullname": user.fullname,
                                "email": user.email,
                                "token": generatedToken.token,
                                "is_suspended": user.is_suspended,
                            }
                        }
    
                        return res.json(response);
                    }
                }).catch(error => next(error));
            }
        }
    })
}

export {
    register,
    login,
    verify_email,
};