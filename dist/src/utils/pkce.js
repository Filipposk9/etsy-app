"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = exports.codeChallenge = exports.codeVerifier = void 0;
const crypto = __importStar(require("crypto"));
// The next two functions help us generate the code challenge
// required by EtsyOauthCredential’s OAuth implementation.
const base64URLEncode = (str) => str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest();
// We’ll use the verifier to generate the challenge.
// The verifier needs to be saved for a future step in the OAuth flow.
exports.codeVerifier = base64URLEncode(crypto.randomBytes(32));
// With these functions, we can generate
// the values needed for our OAuth authorization grant.
exports.codeChallenge = base64URLEncode(sha256(exports.codeVerifier));
exports.state = Math.random().toString(36).substring(7);
