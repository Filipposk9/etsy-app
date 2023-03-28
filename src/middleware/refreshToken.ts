import axios from "axios";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

import EtsyTokenModel from "../models/etsyToken";
import env from "../utils/validateEnv";

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const token = await EtsyTokenModel.findOne().exec();

    if (!token || !token.expires_in) {
      throw createHttpError(404, "Oauth tokens missing");
    }

    const tokenDate = new Date(token.createdAt || token.updatedAt);
    const tokenTimestamp = tokenDate.getTime();
    const tokenExpirationTimestamp = tokenTimestamp + token.expires_in * 1000;

    if (Date.now() > tokenExpirationTimestamp) {
      const requestOptions = {
        grant_type: "refresh_token",
        client_id: env.ETSY_API_KEY,
        refresh_token: token.refresh_token,
      };

      const response = await axios.post(
        "https://api.etsy.com/v3/public/oauth/token",
        requestOptions,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      token.access_token = response.data.access_token;
      token.token_type = response.data.token_type;
      token.expires_in = response.data.expires_in;
      token.refresh_token = response.data.refresh_token;

      await token.save();
    }
    next();
  } catch (error) {
    next(error);
  }
};
