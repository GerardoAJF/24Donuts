import express from "express"

import ingredientController from '../controllers/ingredient.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.use(validateAuth(["admin", "employee"]));

router.route("/")
.get(ingredientController.getIngredients)
.post(ingredientController.createIngredient);

router.route("/:id")
.put(ingredientController.updateIngredient)
.delete(ingredientController.deleteIngredient);

export default router;
