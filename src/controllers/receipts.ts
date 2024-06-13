import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import ReceiptModel from "../models/receipt";

interface CreateReceipt {
  receiptId: number;
  legalDocSeries: string;
  legalDocNumber: string;
}

export const createReceipt: RequestHandler<
  unknown,
  unknown,
  CreateReceipt,
  unknown
> = async (req, res, next) => {
  const receiptId = req.body.receiptId;
  const legalDocSeries = req.body.legalDocSeries;
  const legalDocNumber = req.body.legalDocNumber;

  try {
    const newReceipt = await ReceiptModel.create({
      receiptId: receiptId,
      legalDocSeries: legalDocSeries,
      legalDocNumber: legalDocNumber,
    });
    res.status(201).json(newReceipt);
  } catch (error) {
    next(error);
  }
};

export const getReceipt: RequestHandler = async (req, res, next) => {
  try {
    const receipt = await ReceiptModel.findOne({
      receiptId: req.params.receiptId,
    });

    if (!receipt) {
      // throw createHttpError(404, "Receipt not found");
      return res.status(200).json({});
    }

    res.status(200).json(receipt);
  } catch (error) {
    next(error);
  }
};
