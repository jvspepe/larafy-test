import { User } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
