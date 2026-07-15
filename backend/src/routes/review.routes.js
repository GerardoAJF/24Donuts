import express from "express"

import reviewController from '../controllers/review.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', validateAuth(["customer"]), reviewController.createReview);

export default router;
