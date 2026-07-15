import express from "express"

import billController from '../controllers/bill.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.use(validateAuth(["admin", "employee"]));

router.route("/")
.get(billController.getBills)
.post(billController.createBill);

router.route("/:id")
.get(billController.getBillById)
.put(billController.updateBill)
.delete(billController.deleteBill);

export default router;
