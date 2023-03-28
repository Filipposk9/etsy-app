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
exports.getData = exports.getEtsyAccessToken = exports.setEtsyAccessToken = exports.getEtsyCredentials = exports.setEtsyCredentials = void 0;
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
const etsyOauthCredential_1 = __importDefault(require("../models/etsyOauthCredential"));
const etsyToken_1 = __importDefault(require("../models/etsyToken"));
const pkce_1 = require("../utils/pkce");
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const setEtsyCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield etsyOauthCredential_1.default.findOne().exec();
        if (!credentials) {
            throw (0, http_errors_1.default)(404, "EtsyOauthCredential credentials not found");
        }
        credentials.codeVerifier = pkce_1.codeVerifier;
        credentials.codeChallenge = pkce_1.codeChallenge;
        credentials.state = pkce_1.state;
        const updatedCredentials = yield credentials.save();
        res.status(200).json(updatedCredentials);
    }
    catch (error) {
        next(error);
    }
});
exports.setEtsyCredentials = setEtsyCredentials;
const getEtsyCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const etsyCredentials = yield etsyOauthCredential_1.default.findOne({}).exec();
        res.status(200).json(etsyCredentials);
    }
    catch (error) {
        next(error);
    }
});
exports.getEtsyCredentials = getEtsyCredentials;
const setEtsyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield etsyOauthCredential_1.default.findOne().exec();
        if (!credentials) {
            throw (0, http_errors_1.default)(404, "Etsy oauth credentials missing");
        }
        const requestOptions = {
            grant_type: "authorization_code",
            client_id: validateEnv_1.default.ETSY_API_KEY,
            redirect_uri: validateEnv_1.default.ETSY_AUTH_CALLBACK,
            code: req.body.code,
            code_verifier: credentials.codeVerifier,
        };
        const response = yield axios_1.default.post("https://api.etsy.com/v3/public/oauth/token", requestOptions, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const token = yield etsyToken_1.default.findOne().exec();
        if (!token) {
            throw (0, http_errors_1.default)(404, "Oauth tokens missing");
        }
        token.access_token = response.data.access_token;
        token.token_type = response.data.token_type;
        token.expires_in = response.data.expires_in;
        token.refresh_token = response.data.refresh_token;
        const updatedToken = yield token.save();
        res.status(200).json(updatedToken);
    }
    catch (error) {
        next(error);
    }
});
exports.setEtsyAccessToken = setEtsyAccessToken;
const getEtsyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const etsyToken = yield etsyToken_1.default.findOne({}).exec();
        res.status(200).json(etsyToken);
    }
    catch (error) {
        next(error);
    }
});
exports.getEtsyAccessToken = getEtsyAccessToken;
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield etsyToken_1.default.findOne({}).exec();
        if (!token) {
            throw (0, http_errors_1.default)(404, "Oauth tokens missing");
        }
        const response = yield axios_1.default.get(`https://api.etsy.com/v3/application/shops/${validateEnv_1.default.ETSY_SHOP_ID}/receipts?is_shipped=true&limit=50`, {
            headers: {
                "x-api-key": validateEnv_1.default.ETSY_API_KEY,
                Authorization: `${token.token_type} ${token.access_token}`,
            },
        });
        res.status(200).json(response.data.results);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getData = getData;
