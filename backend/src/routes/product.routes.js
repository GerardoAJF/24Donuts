import express from "express"

import productController from '../controllers/product.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

router.post('/', validateAuth(["admin", "employee"]), productController.createProduct);
router.put('/:id', validateAuth(["admin", "employee"]), productController.updateProduct);
router.delete('/:id', validateAuth(["admin", "employee"]), productController.deleteProduct);

export default router;
