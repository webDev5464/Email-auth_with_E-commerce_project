import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AdminLoginHandler = createAsyncThunk(
  "AdminLoginHandler",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/admin/adminLogin", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)