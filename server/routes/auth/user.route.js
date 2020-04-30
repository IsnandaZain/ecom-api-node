import express from 'express';
import * as userCtrl from '../../controllers/user.controller';

const router = express.Router();

router.route('/:id')
    /** GET /api/v1/user/:id - Get user by id */
    .get( (req, res, next) => {
        userCtrl.get(req, res, next)
    });

export default router;