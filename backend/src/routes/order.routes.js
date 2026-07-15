import express from "express"

import orderController from '../controllers/order.controller.js'
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.route("/")
.get(validateAuth(["admin", "employee"]), orderController.getOrders)
.post(validateAuth(["customer"]), orderController.createOrder);

router.get('/my', validateAuth(["customer"]), orderController.getMyOrders);

router.get('/:id', validateAuth(["admin", "employee"]), orderController.getOrderById);
router.patch('/:id/status', validateAuth(["admin", "employee"]), orderController.updateOrderStatus);

export default router;
