import express from 'express';

import * as searchCtrl from '../controllers/search.controller';

const router = express.Router();

router.route('/category')
    /** GET /api/v1/search/category - Search category */
    .get( (req, res) => {
        searchCtrl.search_category(req, res);
    });

export default router;