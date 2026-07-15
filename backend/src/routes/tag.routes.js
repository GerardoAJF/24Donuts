import express from "express"

import tagController from '../controllers/tag.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.route("/")
.get(tagController.getTags)
.post(validateAuth(["admin", "employee"]), tagController.createTag);

router.route("/:id")
.put(validateAuth(["admin", "employee"]), tagController.updateTag)
.delete(validateAuth(["admin", "employee"]), tagController.deleteTag);

export default router;
