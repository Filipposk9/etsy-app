import { RequestHandler } from "express";
import axios from "axios";

import env from "../utils/validateEnv";

export const getInvoices: RequestHandler = async (req, res, next) => {
  const requestOptions = {
    appId: env.GO_PROSVASIS_APPID,
    filters: "",
    token: env.GO_PROSVASIS_TOKEN,
  };

  try {
    const invoices = await axios.post(
      "https://go.s1cloud.net/s1services/list/customer",
      requestOptions,

      {
        headers: {
          "Content-Type": "application/json",
          s1code: "10502629293121",
        },
      }
    );

    console.log(invoices.data);

    res.status(200).json(invoices.data);
  } catch (error) {
    next(error);
  }
};
