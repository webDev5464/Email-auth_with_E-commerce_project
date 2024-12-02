import { Router } from "express";
import { AdminLoginAPI } from "../controllers/adminControllers.js";

export const AdminRouter = Router()

AdminRouter.route("/adminLogin").post(AdminLoginAPI)