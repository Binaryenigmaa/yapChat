import express from "express";
import {
  loginController,
  signupController,
  logoutController,
  profileUpdateController,
  checkAuth,
} from "../controllers/authControllers.js";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
authRouter.post("/logout", logoutController);

authRouter.put("/profile-update", isUserLoggedIn, profileUpdateController);
authRouter.get("/check", isUserLoggedIn, checkAuth);

export default authRouter;
