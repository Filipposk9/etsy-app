import express from "express";

import * as GoProsvasisController from "../controllers/goProsvasis";

const router = express.Router();

router.post("/", GoProsvasisController.getInvoices);

export default router;
