import express from 'express';
import HttpStatus from 'http-status-codes';

import paramValidation from '../../validator/category.validation';
import * as categoryCtrl from '../../controllers/category.controller';
import * as auth from '../../helpers/auth';

const router = express.Router();

router.route('/create')
    /** POST /api/v1/dashboard/category/create - Create new category */
    .post( (req, res) => {
        const authorize = auth.checkPermission(res, "administrator");
        if (!authorize) {
            const error = paramValidation.create(req);
            if (error) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "messages": error.details[0].message,
                }
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            } else {
                categoryCtrl.create(req, res);
            }
        }
    });

router.route('/:id')
    /** GET /api/v1/dashboard/category/:id - Get category*/
    .get( (req, res) => {
        const authorize = auth.checkPermission(res, "administrator");
        if (!authorize) {
            categoryCtrl.get(req, res);
        }
    });

router.route('/update')
    /** PUT /api/v1/dashboard/category/update - Update category */
    .put( (req, res) => {
        const authorize = auth.checkPermission(res, "administrator");
        if (!authorize) {
            const error = paramValidation.update(req);
            if (error) {
                const response = {
                    "status": HttpStatus.BAD_REQUEST,
                    "messages": error.details[0].message,
                }
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            } else {
                categoryCtrl.update(req, res);
            }
        }
    });

router.route('/delete/:id')
    /** DELETE /api/v1/dashboard/category/update - Delete category */
    .delete( (req, res) => {
        const authorize = auth.checkPermission(res, "administrator");
        if (!authorize) {
            categoryCtrl.remove(req ,res);
        }
    });

export default router;