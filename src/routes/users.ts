import express, { Router } from "express";
import {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} from "../controller/UserController.js";

const userRouter: Router = express.Router();

userRouter.use(express.json());

userRouter.post("/join", join);
userRouter.post("/login", login);
userRouter.post("/reset", passwordResetRequest);
userRouter.put("/reset", passwordReset);

export default userRouter;
