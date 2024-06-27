import { RequestHandler } from "express";
import axios from "axios";

import env from "../utils/validateEnv";
import { normalizeAddress } from "../utils/normalizeAddress";
import { normalizeCountry } from "../utils/normalizeCountry";

type Transaction = {
  quantity: number;
  price: number;
};

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
  // console.log("FORM DATA: ", req.body);
  const customerRequestOptions = {
    appId: env.GO_PROSVASIS_APPID,
    filters: "",
    token: env.GO_PROSVASIS_TOKEN,
    data: {
      CUSTOMER: [
        {
          // TODO: GIVE THE CORRECT CUSTOMER NAME INSTEAD OF DUMMY WHEN FINISHED
          NAME: req.body.name,
          // NAME: "ARIS TEST",
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

    const deliveryCost = normalizeCountry(req.body.country_iso)?.isEu
      ? (
          req.body.total_shipping_cost /
          (normalizeCountry(req.body.country_iso)?.deliveryCostVat || 0)
        ).toFixed(2)
      : req.body.total_shipping_cost;

    const deliveryCostVat = normalizeCountry(req.body.country_iso)?.isEu
      ? (req.body.total_shipping_cost - deliveryCost).toFixed(2)
      : 0;

    const invoiceRequestOptions = {
      appId: env.GO_PROSVASIS_APPID,
      filters: "",
      token: env.GO_PROSVASIS_TOKEN,
      data: {
        SALDOC: [
          {
            SERIES: normalizeCountry(req.body.country_iso)?.isEu ? 7076 : 7071,
            TRDR: customer.data.id,
            PAYMENT: 800,
          },
        ],
        ITELINES: req.body.transactions.map((t: Transaction, index: number) => {
          return {
            LINENUM: index + 1,
            LINEVAL:
              t.price +
              (index === 0 && req.body.gift_wrap_price
                ? parseInt(req.body.gift_wrap_price, 10)
                : 0),
            MTRL: 75,
            QTY1: t.quantity,
            MTRUNIT: 101,
            VAT: 0,
            MTRL_ITEM_CODE: 0,
          };
        }),
        EXPANAL: [
          req.body.total_shipping_cost !== 0
            ? {
                EXPN: normalizeCountry(req.body.country_iso)?.isEu
                  ? 600
                  : 10001,
                EXPVAL: deliveryCost,
                EXPVATVAL: deliveryCostVat,
                LINENUM: 1,
              }
            : {},
        ],
        SRVLINES: [],
      },
    };

    const invoice = await axios.post(
      "https://go.s1cloud.net/s1services/set/saldoc",
      invoiceRequestOptions,

      {
        headers: {
          "Content-Type": "application/json",
          s1code: env.GO_PROSVASIS_CODE,
        },
      }
    );

    const printOptions = {
      appId: env.GO_PROSVASIS_APPID,
      key: invoice.data.id,
      token: env.GO_PROSVASIS_TOKEN,
      service: "einvoice",
    };

    const print = await axios.post(
      "https://go.s1cloud.net/s1services/set/saldoc",
      printOptions,
      {
        headers: {
          "Content-Type": "application/json",
          s1code: env.GO_PROSVASIS_CODE,
        },
      }
    );

    // console.log("INVOICE CREATED: ", invoice.data);
    console.log("PRINT: ", print.data);

    // console.log("DATA: ", req.body);
    // console.log("DOCUMENT: ", invoiceRequestOptions.data.SALDOC);
    // console.log("ITEMS: ", invoiceRequestOptions.data.ITELINES);
    // console.log("EXPENSES: ", invoiceRequestOptions.data.EXPANAL);

    // res.status(200).json({});
    res.status(200).json({ data: print.data });
  } catch (error) {
    next(error);
  }
};
