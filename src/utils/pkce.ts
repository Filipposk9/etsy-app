import * as crypto from "crypto";

// The next two functions help us generate the code challenge
// required by EtsyOauthCredential’s OAuth implementation.
export const base64URLEncode = (str: Buffer): string =>
  str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

export const sha256 = (buffer: string) =>
  crypto.createHash("sha256").update(buffer).digest();

// We’ll use the verifier to generate the challenge.
// The verifier needs to be saved for a future step in the OAuth flow.
export const codeVerifier: string = base64URLEncode(crypto.randomBytes(32));

// With these functions, we can generate
// the values needed for our OAuth authorization grant.
export const codeChallenge = base64URLEncode(sha256(codeVerifier));
export const state = Math.random().toString(36).substring(7);
