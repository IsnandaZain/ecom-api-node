import express from 'express';

const router = express.Router();

router.route('/:id')
    /** GET /api/v1/user/:id - Get user by id */
    .get( (req, res, next) => {
        return res.json({
            "status": 200,
            "messages": "Sebagai bukti bahwa sukses running" 
        })
    });

export default router;