import express from "express"

import orderController from '../controllers/order.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.route("/")
.get(orderController.getOrders)
.post(authenticate, orderController.createOrder);

router.get('/my', authenticate, orderController.getMyOrders);

router.route("/:id")
.get(orderController.getOrderById)
.patch(orderController.updateOrderStatus);

router.patch('/:id/status', orderController.updateOrderStatus);

export default router;
