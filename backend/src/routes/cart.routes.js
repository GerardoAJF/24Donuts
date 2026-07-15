import express from "express"
import carController from '../controllers/cart.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.use(validateAuth(["customer"]));

router.get('/', carController.getCart);
router.post('/add', carController.addToCart);
router.put('/update', carController.updateCartItem);
router.delete('/remove/:productId', carController.removeFromCart);

export default router;
