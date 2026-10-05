import express from "express"

import productController from '../controllers/product.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';
import { uploadProductImage } from '../middlewares/upload.middleware.js';

const router = express.Router()

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Primero se valida el rol y luego se procesa la imagen (no se sube nada a Cloudinary sin permiso)
router.post('/', validateAuth(["admin", "employee"]), uploadProductImage, productController.createProduct);
router.put('/:id', validateAuth(["admin", "employee"]), uploadProductImage, productController.updateProduct);
router.delete('/:id', validateAuth(["admin", "employee"]), productController.deleteProduct);

export default router;
