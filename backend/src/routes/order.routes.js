import express from "express"

import orderController from '../controllers/order.controller.js'

const router = express.Router()

router.route("/")
.get(orderController.getOrders)
.post(orderController.createOrder);

router.get('/my', orderController.getMyOrders);

router.route("/:id")
.get(orderController.getOrderById)
.patch(orderController.updateOrderStatus);

export default router;
