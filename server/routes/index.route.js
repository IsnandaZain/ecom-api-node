import express from 'express';
import authRoutes from './auth/auth.route';
import searchRoutes from './search.route';
import adminProduct from './admin_room/product.route';
import adminCategory from './admin_room/category.route';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/search', searchRoutes);

router.use('/dashboard/product', adminProduct);

router.use('/dashboard/category', adminCategory);

export default router;