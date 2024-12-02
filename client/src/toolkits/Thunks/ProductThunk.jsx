import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk(
  "GetProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/product/getProducts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
