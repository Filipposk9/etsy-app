import { InferSchemaType, model, Schema } from "mongoose";

const etsyToken = new Schema(
  {
    access_token: { type: String },
    token_type: { type: String },
    expires_in: { type: Number },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

type EtsyToken = InferSchemaType<typeof etsyToken>;

export default model<EtsyToken>("EtsyToken", etsyToken);
