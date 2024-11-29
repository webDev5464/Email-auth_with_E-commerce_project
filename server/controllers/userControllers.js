import { userModel } from "../models/userModel.js"
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { createTransport } from 'nodemailer'

const transportMail = createTransport({
  service: "gmail",
  auth: {
    user: "devendhagat0@gmail.com",
    pass: "tknt pmif gsjo zedw ",
  }
})

function generateNumericOtp(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

const otpStorage = new Map()

export const UserRegister = async (req, res) => {
  try {
    const { username, email, pass, conPass } = req.body.formData

    if (!username) throw new Error('Username is required')
    if (!email) throw new Error('Email is required')
    if (!pass) throw new Error('Password is required')
    if (!conPass) throw new Error('Confirm Password is required')
    if (pass !== conPass) throw new Error('Passwords do not match')

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] })

    if (existingUser) throw new Error("User already exist...")

    const otp = generateNumericOtp(6)
    const expireOTP = new Date().getTime() + 60000 // 1 minute

    const hashPass = await hash(pass, 10)

    otpStorage.set(email,
      {
        otp, expireOTP, userData:
          { username, email, pass: hashPass }
      }
    )

    await transportMail.sendMail({
      from: "devendhagat0@gmail.com",
      to: email,
      subject: "Your OTP for registration",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #efefef;">
          <h1 style="color: #4CAF50;">Welcome to JatssDev Technology</h1>
          <p>Dear <strong>${username}</strong>,</p>
          <p>Your OTP for registration is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #FF5722;">${otp}</p>
          <p>This OTP will expire in <strong>1 minute</strong>. Please do not share it with anyone.</p>
          <br/>
          <p>Thanks,</p>
          <p><strong>JatssDev Technology Team</strong></p>
        </div>
      `,
    })

    console.log(otpStorage)

    res.status(200).send({
      process: true,
      message: "Check your email for OTP",
      data: { username, email, pass, conPass }
    })
  } catch (err) {
    res.status(400).send({
      process: false,
      message: err.message
    })
  }
}

export const OtpValidation = async (req, res) => {
  try {
    const { pin1, pin2, pin3, pin4, pin5, pin6, email } = req.body.otpPin
    const otp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
    console.log(email)
    const storedUserOtpDetail = otpStorage.get(email)

    console.log(storedUserOtpDetail)

    if (!storedUserOtpDetail) throw new Error('Somethings wrong! Please try again to send OTP')

    if (new Date().getTime() > storedUserOtpDetail.expireOTP) {
      // otpStorage.delete(email)
      console.log(otpStorage.get(email))
      throw new Error('OTP has expired')
    }

    if (storedUserOtpDetail.otp !== otp) throw new Error("Wrong OTP")

    if (storedUserOtpDetail.otp == otp) {
      await userModel.create(storedUserOtpDetail.userData)
      otpStorage.delete(email)
      res.status(200).send({
        process: true,
        message: "OTP is correct",
      })
    }

  } catch (err) {
    res.status(400).send({
      process: false,
      message: err.message
    })
  }
}

export const UserLogin = async (req, res) => {
  try {
    const { username, pass } = req.body.formData
    if (!username) throw new Error("Username is required.")
    if (!pass) throw new Error("Password is required.")

    const findUser = await userModel.findOne({ username: username })

    if (!findUser) throw new Error("User not found.")

    const checkPass = await compare(pass, findUser.pass)

    if (!checkPass) throw new Error("Password is wrong.")

    const genToken = jwt.sign({ userId: findUser._id }, "secureKey", { expiresIn: "30s" })

    await userModel.findByIdAndUpdate(findUser._id, { token: genToken }, { new: true })

    res.status(200).cookie("userToke", genToken, { httpOnly: true }).send({
      process: true,
      message: "User Login Successfully",
      data: findUser
    })

  } catch (err) {
    res.status(400).send({
      process: false,
      message: err.message
    })
  }
}

export const validUser = async (req, res) => {
  try {
    const Id = req.userKey
    const findUser = await userModel.findById(Id)
    res.status(200).send({
      process: true,
      message: "User Valid",
      userData: findUser
    })
  } catch (err) {
    res.status(400).send({
      process: false,
      message: err.message
    })
  }
}

export const logoutUser = async (req, res) => {
  res.clearCookie("userToke")
  res.status(200).send({
    process: true,
    message: "User Logout Successfully"
  })
}
