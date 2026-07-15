import express from "express"

import promotionController from '../controllers/promotion.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';
const router = express.Router()

router.route("/")
.get(promotionController.getPromotions)
.post(validateAuth(["admin", "employee"]), promotionController.createPromotion);

router.route("/:id")
.get(promotionController.getPromotionById)
.put(validateAuth(["admin", "employee"]), promotionController.updatePromotion)
.delete(validateAuth(["admin", "employee"]), promotionController.deletePromotion);

export default router;
