import "dotenv/config";
import MongoStore from "connect-mongo";
import express, { Express, NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import path from "path";

import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import etsyRoutes from "./routes/etsy";
import goProsvasisRoutes from "./routes/goProsvasis";

import { requiresAuth } from "./middleware/auth";

import env from "./utils/validateEnv";

const app: Express = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/notes", requiresAuth, notesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/etsy", etsyRoutes);
app.use("/api/goProsvasis", goProsvasisRoutes);

// if (env.NODE_ENV === "production") {
//   app.use(express.static("/app/client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "/app/client", "build", "index.html"));
//   });
// }

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://etsy-acroj3a3z-avnikolaou.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

export default app;
