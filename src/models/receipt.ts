import { InferSchemaType, model, Schema } from "mongoose";

const receiptSchema = new Schema({
  receiptId: { type: String, required: true, unique: true },
  legalDocSeries: { type: String },
  legalDocNumber: { type: String },
});

type Receipt = InferSchemaType<typeof receiptSchema>;

export default model<Receipt>("Receipt", receiptSchema);
