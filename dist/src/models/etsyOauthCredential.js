"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EtsyOathCredential = new mongoose_1.Schema({
    codeVerifier: { type: String },
    codeChallenge: { type: String },
    state: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("EtsyOathCredential", EtsyOathCredential);
