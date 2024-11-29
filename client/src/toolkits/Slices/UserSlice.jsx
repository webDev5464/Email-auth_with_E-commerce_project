/* eslint-disable react-refresh/only-export-components */

import { createSlice } from "@reduxjs/toolkit";
import { registerWithOtpHandler, UserLoginHandler, UserLogoutHandler, UserRegisterHandler, UserValidationHandler } from "../Thunks/UserThunk";
import { toast } from "react-toastify";

const Slice = createSlice({
  name: "UserSlice",
  initialState: {
    userLoading: false,
    userData: null,
    newUserLogin: false,
    registerProcess: false,
    otpProcess: false
  },

  reducers: {
    OtpCancelButton: (state, action) => {
      state.registerProcess = action.payload
    },
    OtpProcessHandler: (state, action) => {
      state.otpProcess = action.payload
    }
    // logoutButton: (state) => {
    //   state.userData = null
    // }
  },

  extraReducers: (builder) => {
    //* User Register
    builder
      .addCase(UserRegisterHandler.pending, (state) => {
        state.userLoading = true
      })
      .addCase(UserRegisterHandler.fulfilled, (state, action) => {
        const { message, process } = action.payload
        state.userLoading = false
        state.registerProcess = process
        toast.success(message)
      })
      .addCase(UserRegisterHandler.rejected, (state, action) => {
        const { message, process } = action.payload
        state.userLoading = false
        state.registerProcess = process
        toast.error(message)
      })

      //* Register OTP validation
      .addCase(registerWithOtpHandler.pending, (state) => {
        state.userLoading = true
      })
      .addCase(registerWithOtpHandler.fulfilled, (state, action) => {
        const { message, process } = action.payload
        state.userLoading = false
        state.otpProcess = process
        toast.success(message)
      })
      .addCase(registerWithOtpHandler.rejected, (state, action) => {
        const { message, process } = action.payload
        state.userLoading = false
        state.otpProcess = process
        toast.error(message)
      })

      //* User Login
      .addCase(UserLoginHandler.pending, (state) => {
        state.userLoading = true
      })
      .addCase(UserLoginHandler.fulfilled, (state, action) => {
        const { message, data } = action.payload
        state.userLoading = false
        state.userData = data
        state.newUserLogin = true
        toast.success(message)
      })
      .addCase(UserLoginHandler.rejected, (state, action) => {
        const { message } = action.payload
        state.userLoading = false
        toast.error(message)
      })

      //* UserValidation
      .addCase(UserValidationHandler.pending, (state) => {
        state.userLoading = true
      })
      .addCase(UserValidationHandler.fulfilled, (state, action) => {
        const { userData } = action.payload
        state.userLoading = false
        state.userData = userData
      })
      .addCase(UserValidationHandler.rejected, (state, action) => {
        const { message } = action.payload.data
        state.userLoading = false
        state.userData = null
        state.newUserLogin = false
        // toast.error(message)
      })

      .addCase(UserLogoutHandler.pending, (state) => {
        state.userLoading = true
      })
      .addCase(UserLogoutHandler.fulfilled, (state, action) => {
        const { message } = action.payload
        state.userLoading = false
        state.userData = null
        state.newUserLogin = false
        toast.success(message)
      })
      .addCase(UserLogoutHandler.rejected, (state, action) => {
        const { message } = action.payload
        state.userLoading = false
        toast.error(message)
      })
  }
})

export const UserSlice = Slice.reducer;
export const { logoutButton, OtpCancelButton, OtpProcessHandler } = Slice.actions;
