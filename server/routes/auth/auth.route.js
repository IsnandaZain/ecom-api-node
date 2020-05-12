import express from 'express';
import HttpStatus from 'http-status-codes';

import paramValidation from '../../validator/auth.validation';
import * as authCtrl from '../../controllers/auth.controller';

const router = express.Router();

router.route('/register')
    /** POST /api/v1/auth/register - Create new user */
    .post( (req, res, next) => {
        if (!req.body.roles) {
            req.body.roles = 'user'
        }

        const error = paramValidation.register(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            authCtrl.register(req, res, next)
        }
    });


router.route('/login')
    /** POST /api/v1/auth/login - Login user */
    .post( (req, res, next) => {
        const error = paramValidation.login(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            authCtrl.login(req, res, next)
        }
    });


router.route('/logout')
    /** POST /api/v1/auth/logout - Logout user */
    .post( (req, res, next) => {
        const error = paramValidation.logout(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            authCtrl.logout(req, res, next)
        }
    });


router.route('/verify-email/:verify_url')
    /** POST /api/v1/auth/verify-email/:verify_token - Verify Email new user */
    .post( (req, res, next) => {
         authCtrl.verify_email(req, res, next)
    });


router.route('/forgot-password/')
    /** POST /api/v1/auth/forgot-password - Request Change Password via Forgot Password */
    .post( (req, res, next) => {
        const error = paramValidation.forgot_password(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            authCtrl.forgot_password(req, res, next)
        }
    });


router.route('/forgot-password/:forgot_url')
    /** POST /api/v1/auth/forgot-password/:forgot_url - Change Password */
    .post( (req, res, next) => {
        const error = paramValidation.change_password_forgot(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            authCtrl.change_password_forgot(req, res, next)
        }
    });


router.route('/me')
    /** GET /api/v1/auth/me - mendapatkan data user menggunakan token */
    .post( (req, res, next) => {
        authCtrl.me(req, res, next)
    });

export default router;