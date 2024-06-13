import { Receipt } from "../models/receipt";
import { fetchData } from "../utils/fetchData";

export interface ReceiptInput {
  receiptId: number;
  legalDocSeries: string;
  legalDocNumber: string;
}

export async function getReceipt(receiptId: number): Promise<Receipt> {
  const response = await fetchData(`/api/receipts/${receiptId}`, {
    method: "GET",
  });
  return await response.json();
}

export async function createReceipt(receipt: ReceiptInput): Promise<Receipt> {
  const response = await fetchData("/api/receipts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receipt),
  });

  return response.json();
}

export const updateReceipt = async (
  receiptId: string,
  voucherNumber: string
): Promise<Receipt> => {
  const response = await fetchData(`/api/receipts/${receiptId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voucherNumber),
  });

  return response.json();
};
