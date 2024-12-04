import { Router } from "express";

import UserTokenAccess from "../middleware/UserTokeAccess.js";
import { logoutUser, OtpValidation, ResendOtp, UserLogin, UserRegister, validUser } from "../controllers/userControllers.js";

export const userRouter = Router()

userRouter.route("/userRegister").post(UserRegister)
userRouter.route("/registerWithOtp").post(OtpValidation)
userRouter.route("/userLogin").post(UserLogin)
userRouter.route("/userValidation").get(UserTokenAccess, validUser)
userRouter.route("/logoutUser").get(logoutUser)
userRouter.route("/resendotp").post(ResendOtp)