/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AdminLoginHandler } from "../Thunks/AdminThunk";

const Slice = createSlice({
  name: "AdminSlice",
  initialState: {
    loading: false,
    adminLogin: false,
  },

  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(AdminLoginHandler.pending, (state) => {
        state.loading = true
      })
      .addCase(AdminLoginHandler.fulfilled, (state, action) => {
        const { process, message } = action.payload
        state.loading = false
        state.adminLogin = process
        toast.success(message)
      })
      .addCase(AdminLoginHandler.rejected, (state, action) => {
        const { process, message } = action.payload
        state.loading = false
        state.adminLogin = process
        toast.error(message)
      })
  }
})

export const AdminSlice = Slice.reducer;
export const { } = Slice.actions;
