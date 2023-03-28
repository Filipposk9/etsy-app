import express from "express";

import * as EtsyController from "../controllers/etsy";

import { refreshToken } from "../middleware/refreshToken";

const router = express.Router();

router.get("/", EtsyController.getEtsyCredentials);
router.post("/", EtsyController.setEtsyCredentials);
router.post("/token", EtsyController.setEtsyAccessToken);
router.get("/token", EtsyController.getEtsyAccessToken);
router.get("/data", refreshToken, EtsyController.getData);

export default router;
