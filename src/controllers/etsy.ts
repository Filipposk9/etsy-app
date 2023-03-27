import axios from "axios";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

import env from "../utils/validateEnv";

import EtsyOauthCredentialModel from "../models/etsyOauthCredential";
import EtsyTokenModel from "../models/etsyToken";
import { codeVerifier, codeChallenge, state } from "../utils/pkce";

export const setEtsyCredentials: RequestHandler = async (req, res, next) => {
  try {
    const credentials = await EtsyOauthCredentialModel.findOne().exec();

    if (!credentials) {
      throw createHttpError(404, "EtsyOauthCredential credentials not found");
    }

    credentials.codeVerifier = codeVerifier;
    credentials.codeChallenge = codeChallenge;
    credentials.state = state;

    const updatedCredentials = await credentials.save();
    res.status(200).json(updatedCredentials);
  } catch (error) {
    next(error);
  }
};
export const getEtsyCredentials: RequestHandler = async (req, res, next) => {
  try {
    const etsyCredentials = await EtsyOauthCredentialModel.findOne({}).exec();
    res.status(200).json(etsyCredentials);
  } catch (error) {
    next(error);
  }
};

export const setEtsyAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const credentials = await EtsyOauthCredentialModel.findOne().exec();

    if (!credentials) {
      throw createHttpError(404, "Etsy oauth credentials missing");
    }

    const requestOptions = {
      grant_type: "authorization_code",
      client_id: env.ETSY_API_KEY,
      redirect_uri: env.ETSY_AUTH_CALLBACK,
      code: req.body.code,
      code_verifier: credentials.codeVerifier,
    };

    const response = await axios.post(
      "https://api.etsy.com/v3/public/oauth/token",
      requestOptions,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("TOKEN: ", response.data);

    const token = await EtsyTokenModel.findOne().exec();

    if (!token) {
      throw createHttpError(404, "Oauth tokens missing");
    }

    token.access_token = response.data.access_token;
    token.token_type = response.data.token_type;
    token.expires_in = response.data.expires_in;
    token.refresh_token = response.data.refresh_token;

    const updatedToken = await token.save();
    res.status(200).json(updatedToken);
  } catch (error) {
    next(error);
  }
};

export const getEtsyAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const etsyToken = await EtsyTokenModel.findOne({}).exec();
    res.status(200).json(etsyToken);
  } catch (error) {
    next(error);
  }
};
