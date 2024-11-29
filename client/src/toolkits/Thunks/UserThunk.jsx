/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const server = "http://localhost:8080/api"

export const UserRegisterHandler = createAsyncThunk(
  "UserRegisterHandler",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/userRegister`, { formData })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const registerWithOtpHandler = createAsyncThunk(
  "registerWithOtpHandler",
  async ({ otpPin }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/registerWithOtp", { otpPin })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const UserLoginHandler = createAsyncThunk(
  "UserLoginHandler",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/userLogin`, { formData })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const UserValidationHandler = createAsyncThunk(
  "UserValidationHandler",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/userValidation')
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const UserLogoutHandler = createAsyncThunk(
  "UserLogoutHandler",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/logoutUser')
      return res.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)