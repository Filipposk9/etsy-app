import express from "express";

import * as EtsyController from "../controllers/etsy";

const router = express.Router();

router.get("/", EtsyController.getEtsyCredentials);
router.post("/", EtsyController.setEtsyCredentials);
router.post("/token", EtsyController.setEtsyAccessToken);

export default router;
