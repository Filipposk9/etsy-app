import axios from "axios";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { LATEST_API_VERSION } from "@shopify/shopify-api";

import env from "../utils/validateEnv";

export const getData: RequestHandler = async (req, res, next) => {
  try {
    const token = env.SHOPIFY_ACCESS_TOKEN;

    if (!token) {
      throw createHttpError(404, "Token is missing");
    }

    const response = await axios.get(
      `https://theholyart.myshopify.com/admin/api/${LATEST_API_VERSION}/orders.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
      }
    );

    res.status(200).json(response.data.orders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
