import express from "express"

import productController from '../controllers/product.controller.js';

const router = express.Router()

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
