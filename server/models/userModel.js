import { model, Schema } from "mongoose";

export const userModel = model(
  "user",
  Schema({
    username: { type: String },
    email: { type: String },
    pass: { type: String },
    token: { type: String, default: "" },
  })
)