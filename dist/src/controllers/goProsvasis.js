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
exports.getInvoices = void 0;
const axios_1 = __importDefault(require("axios"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const getInvoices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        appId: validateEnv_1.default.GO_PROSVASIS_APPID,
        filters: "",
        token: validateEnv_1.default.GO_PROSVASIS_TOKEN,
    };
    try {
        const invoices = yield axios_1.default.post("https://go.s1cloud.net/s1services/list/customer", requestOptions, {
            headers: {
                "Content-Type": "application/json",
                s1code: "10502629293121",
            },
        });
        console.log(invoices.data);
        res.status(200).json(invoices.data);
    }
    catch (error) {
        next(error);
    }
});
exports.getInvoices = getInvoices;
