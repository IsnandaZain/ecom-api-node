import express from 'express';
import HttpStatus from 'http-status-codes';
import multer from 'multer';

import paramValidation from '../../validator/product.validation';
import * as productCtrl from '../../controllers/product.controller';

const router = express.Router();

router.route('/create')
    /** POST /api/v1/dashboard/product/create - Create new product */
    .post( (req, res, next) => {
        const error = paramValidation.create(req);
        if (error) {
            const response = {
                "status": HttpStatus.BAD_REQUEST,
                "messages": error.details[0].message,
            }
            return res.json(response)
        } else {
            productCtrl.create(req, res, next);
        }
    });

export default router;