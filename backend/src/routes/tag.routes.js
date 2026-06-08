import express from "express"

import tagController from '../controllers/tag.controller.js';

const router = express.Router()

router.route("/")
.get(tagController.getTags)
.post(tagController.createTag);

router.route("/:id")
.put(tagController.updateTag)
.delete(tagController.deleteTag);

export default router;
