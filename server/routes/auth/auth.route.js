import express from 'express';
import HttpStatus from 'http-status-codes';

import paramValidation from '../../validator/auth.validation';
import * as authCtrl from '../../controllers/auth.controller';

const router = express.Router();

router.route('/register')
    /** POST /api/v1/auth/register - Create new user */
    .post( (req, res, next) => {
        const error = paramValidation.register(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "message": error.details[0].message,
            }
            return res.json(response)
        } else {
            authCtrl.register(req, res, next)
        }
    });

router.route('/verify-email/:verify_token')
    /** GET /api/v1/auth/verify-email/:verify_token - Verify Email new user */
    .get( (req, res, next) => {
         authCtrl.verify_token(req, res, next)
    });

export default router;