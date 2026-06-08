import express from "express"

import ingredientController from '../controllers/ingredient.controller.js';

const router = express.Router()

router.route("/")
.get(ingredientController.getIngredients)
.post(ingredientController.createIngredient);

router.route("/:id")
.put(ingredientController.updateIngredient)
.delete(ingredientController.deleteIngredient);

export default router;
