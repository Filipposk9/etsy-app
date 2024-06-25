import express from "express";

import * as ShopifyController from "../controllers/shopify";

const router = express.Router();

router.get("/data", ShopifyController.getData);

export default router;
