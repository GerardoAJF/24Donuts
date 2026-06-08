import express from "express"

import billController from '../controllers/bill.controller.js';

const router = express.Router()

router.route("/")
.get(billController.getBills)
.post(billController.createBill);

router.route("/:id")
.get(billController.getBillById)
.put(billController.updateBill)
.delete(billController.deleteBill);

export default router;
