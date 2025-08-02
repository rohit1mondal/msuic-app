import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.post("/logout", isLoggedIn, logout);
userRouter.get("/is-auth", isLoggedIn, isAuthenticated);

export default userRouter;
