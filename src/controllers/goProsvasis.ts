import { RequestHandler } from "express";
import axios from "axios";

import env from "../utils/validateEnv";
import { normalizeAddress } from "../utils/normalizeAddress";
import { normalizeCountry } from "../utils/normalizeCountry";

export const getOrders: RequestHandler = async (req, res, next) => {
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
          s1code: env.GO_PROSVASIS_CODE,
        },
      }
    );

    console.log(invoices.data);

    res.status(200).json(invoices.data);
  } catch (error) {
    next(error);
  }
};

export const generateInvoice: RequestHandler = async (req, res, next) => {
  const customerRequestOptions = {
    appId: env.GO_PROSVASIS_APPID,
    filters: "",
    token: env.GO_PROSVASIS_TOKEN,
    data: {
      CUSTOMER: [
        {
          // TODO: GIVE THE CORRECT CUSTOMER NAME INSTEAD OF DUMMY WHEN FINISHED
          // NAME: req.body.name,
          NAME: "MAKIS TEST",
          EMAIL: req.body.buyer_email,
          ADDRESS: normalizeAddress(req.body.formatted_address, req.body.name),
          CITY: req.body.city,
          ZIP: req.body.zip,
          COUNTRY: normalizeCountry(req.body.country_iso)?.code,
          VATSTS: normalizeCountry(req.body.country_iso)?.isEu ? 1 : 0,
          VATPROVISIONS: normalizeCountry(req.body.country_iso)?.isEu ? "" : 8,
        },
      ],
    },
  };

  try {
    const customer = await axios.post(
      "https://go.s1cloud.net/s1services/set/customer",
      customerRequestOptions,

      {
        headers: {
          "Content-Type": "application/json",
          s1code: env.GO_PROSVASIS_CODE,
        },
      }
    );

    console.log("CREATED CUSTOMER: ", customer.data);
    console.log("DATA", req.body);

    // const invoiceRequestOptions = {
    //   appId: env.GO_PROSVASIS_APPID,
    //   filters: "",
    //   token: env.GO_PROSVASIS_TOKEN,
    //   data: {
    //     SALDOC: [
    //       {
    //         SERIES: 7071,
    //         TRDR: customer.data.id,
    //       },
    //     ],
    //     ITELINES: [
    //       {
    //         LINENUM: 1,
    //         LINEVAL: req.body.subtotal.amount,
    //         MTRL: 75,
    //         QTY1: 1,
    //         MTRUNIT: 101,
    //         VAT: 0,
    //         MTRL_ITEM_CODE: 0,
    //       },
    //     ],
    //     SRVLINES: [],
    //   },
    // };
    //
    // console.log("OPTIONS: ", invoiceRequestOptions.data);
    //
    // const invoice = await axios.post(
    //   "https://go.s1cloud.net//s1services/set/saldoc",
    //   invoiceRequestOptions,
    //
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       s1code: env.GO_PROSVASIS_CODE,
    //     },
    //   }
    // );
    //
    // console.log("INVOICE CREATED: ", invoice.data);

    res.status(200);
  } catch (error) {
    next(error);
  }
};
