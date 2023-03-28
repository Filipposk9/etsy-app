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
exports.refreshToken = void 0;
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
const etsyToken_1 = __importDefault(require("../models/etsyToken"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield etsyToken_1.default.findOne().exec();
        if (!token || !token.expires_in) {
            throw (0, http_errors_1.default)(404, "Oauth tokens missing");
        }
        const tokenDate = new Date(token.createdAt || token.updatedAt);
        const tokenTimestamp = tokenDate.getTime();
        const tokenExpirationTimestamp = tokenTimestamp + token.expires_in * 1000;
        if (Date.now() > tokenExpirationTimestamp) {
            const requestOptions = {
                grant_type: "refresh_token",
                client_id: validateEnv_1.default.ETSY_API_KEY,
                refresh_token: token.refresh_token,
            };
            const response = yield axios_1.default.post("https://api.etsy.com/v3/public/oauth/token", requestOptions, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            token.access_token = response.data.access_token;
            token.token_type = response.data.token_type;
            token.expires_in = response.data.expires_in;
            token.refresh_token = response.data.refresh_token;
            yield token.save();
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
