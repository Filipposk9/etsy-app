import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str(),
  ETSY_AUTH_CALLBACK: str(),
  ETSY_API_KEY: str(),
});
