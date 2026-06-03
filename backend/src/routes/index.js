import express from "express"

import authRoutes from "./auth.routes.js"
import productRoutes from "./product.routes.js"
import tagRoutes from "./tag.routes.js"
import cartRoutes from "./cart.routes.js"
import orderRoutes from "./order.routes.js"
import promotionRoutes from "./product.routes.js"
import ingredientRoutes from "./ingredient.routes.js"
import billRoutes from "./bill.routes.js"
import userRoutes from "./user.routes.js"

const router = express.Router()

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/promotions', promotionRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/bills', billRoutes);
router.use('/users', userRoutes);

export default router;
