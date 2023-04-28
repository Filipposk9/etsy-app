"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = exports.getOrders = void 0;
const axios_1 = __importDefault(require("axios"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const normalizeAddress_1 = require("../utils/normalizeAddress");
const normalizeCountry_1 = require("../utils/normalizeCountry");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        appId: validateEnv_1.default.GO_PROSVASIS_APPID,
        filters: "",
        token: validateEnv_1.default.GO_PROSVASIS_TOKEN,
    };
    try {
        const invoices = yield axios_1.default.post("https://go.s1cloud.net/s1services/list/customer", requestOptions, {
            headers: {
                "Content-Type": "application/json",
                s1code: validateEnv_1.default.GO_PROSVASIS_CODE,
            },
        });
        console.log(invoices.data);
        res.status(200).json(invoices.data);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const generateInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const customerRequestOptions = {
        appId: validateEnv_1.default.GO_PROSVASIS_APPID,
        filters: "",
        token: validateEnv_1.default.GO_PROSVASIS_TOKEN,
        data: {
            CUSTOMER: [
                {
                    // TODO: GIVE THE CORRECT CUSTOMER NAME INSTEAD OF DUMMY WHEN FINISHED
                    // NAME: req.body.name,
                    NAME: "MAKIS TEST",
                    EMAIL: req.body.buyer_email,
                    ADDRESS: (0, normalizeAddress_1.normalizeAddress)(req.body.formatted_address, req.body.name),
                    CITY: req.body.city,
                    ZIP: req.body.zip,
                    COUNTRY: (_a = (0, normalizeCountry_1.normalizeCountry)(req.body.country_iso)) === null || _a === void 0 ? void 0 : _a.code,
                    VATSTS: ((_b = (0, normalizeCountry_1.normalizeCountry)(req.body.country_iso)) === null || _b === void 0 ? void 0 : _b.isEu) ? 1 : 0,
                    VATPROVISIONS: ((_c = (0, normalizeCountry_1.normalizeCountry)(req.body.country_iso)) === null || _c === void 0 ? void 0 : _c.isEu) ? "" : 8,
                },
            ],
        },
    };
    try {
        const customer = yield axios_1.default.post("https://go.s1cloud.net/s1services/set/customer", customerRequestOptions, {
            headers: {
                "Content-Type": "application/json",
                s1code: validateEnv_1.default.GO_PROSVASIS_CODE,
            },
        });
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
    }
    catch (error) {
        next(error);
    }
});
exports.generateInvoice = generateInvoice;
