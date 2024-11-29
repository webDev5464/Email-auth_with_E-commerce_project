import { Router } from "express";
import { logoutUser, OtpValidation, UserLogin, UserRegister, validUser } from "../controllers/userControllers.js";
import UserTokenAccess from "../middleware/UserTokeAccess.js";

export const userRouter = Router()

userRouter.route("/userRegister").post(UserRegister)
userRouter.route("/registerWithOtp").post(OtpValidation)
userRouter.route("/userLogin").post(UserLogin)
userRouter.route("/userValidation").get(UserTokenAccess, validUser)
userRouter.route("/logoutUser").get(logoutUser)