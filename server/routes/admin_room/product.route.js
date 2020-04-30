import express from 'express';
import validate from 'express-validation';
import * as productCtrl from '../../controllers/product.controller';

const router = express.Router();

router.route('/create')
    /** POST /api/v1/dashboard/product/create - Create new product for store */
    .get( (req, res) => {
        return res.json({"message": "This is create endpoint from product dashboard"});
    });

export default router;