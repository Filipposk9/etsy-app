"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const etsyToken = new mongoose_1.Schema({
    access_token: { type: String },
    token_type: { type: String },
    expires_in: { type: Number },
    refresh_token: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("EtsyToken", etsyToken);
