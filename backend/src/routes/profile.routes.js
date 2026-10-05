import express from "express"

import profileController from '../controllers/profile.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.use(validateAuth());

router.route("/")
.get(profileController.getProfile)
.put(profileController.updateProfile);

router.put('/password', profileController.changePassword);

export default router;
