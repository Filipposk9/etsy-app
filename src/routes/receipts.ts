import express from "express";

import * as ReceiptsController from "../controllers/receipts";

const router = express.Router();

router.get("/:receiptId", ReceiptsController.getReceipt);
router.post("/", ReceiptsController.createReceipt);

export default router;
