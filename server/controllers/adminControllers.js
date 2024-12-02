import { compare } from "bcrypt"
import { userModel } from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const AdminLoginAPI = async (req, res) => {
  try {
    const { email, pass } = req.body
    if (!email || !pass) throw new Error("Email and password is required...")
    const user = await userModel.findOne({ email })

    if (!user) throw new Error("User not found")

    if (!user.isAdmin) throw new Error("User not admin")
    const isValidPassword = await compare(pass, user.pass)

    if (!isValidPassword) throw new Error("Invalid password")

    const token = jwt.sign({ adminId: user._id }, "adminKey",
      { expiresIn: "1h" }
    )

    res.status(200).cookie("adminToken", token, { httpOnly: true, secure: true }).send({
      process: true,
      message: "Admin logged in successfully",
    })

  } catch (err) {
    res.status(400).send({
      process: false,
      message: err.message
    })
  }
}