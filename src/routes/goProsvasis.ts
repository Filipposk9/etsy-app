import express from "express";

import * as GoProsvasisController from "../controllers/goProsvasis";

const router = express.Router();

router.post("/", GoProsvasisController.getOrders);
router.post("/invoice", GoProsvasisController.generateInvoice);

export default router;
