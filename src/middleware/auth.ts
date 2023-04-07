import { RequestHandler } from "express";
import createHttpError from "http-errors";

import UserModel from "../models/user";

export const requiresAuth: RequestHandler = async (req, res, next) => {
  if (req.session.userId) {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();

    if (user?.isAdmin) {
      next();
    } else {
      next(createHttpError(401, "User is not administrator"));
    }
  } else {
    next(createHttpError(401, "User not authenticated"));
  }
};
