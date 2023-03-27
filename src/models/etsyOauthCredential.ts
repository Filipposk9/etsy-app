import { InferSchemaType, model, Schema } from "mongoose";

const EtsyOathCredential = new Schema(
  {
    codeVerifier: { type: String },
    codeChallenge: { type: String },
    state: { type: String },
    authorizationCode: { type: String },
    accessToken: { type: String },
    refreshAuthToken: { type: String },
  },
  { timestamps: true }
);

type EtsyOauthCredential = InferSchemaType<typeof EtsyOathCredential>;

export default model<EtsyOauthCredential>(
  "EtsyOathCredential",
  EtsyOathCredential
);
