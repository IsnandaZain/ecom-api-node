import express from 'express';
import authRoutes from './auth/auth.route';
import adminProduct from './admin_room/product.route';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/dashboard/product', adminProduct);

export default router;