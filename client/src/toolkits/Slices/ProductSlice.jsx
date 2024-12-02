import { createSlice } from "@reduxjs/toolkit";
import { GetProducts } from "../Thunks/ProductThunk";

const Slice = createSlice({
  name: "ProductSlice",
  initialState: {
    loading: false,
    products: [],
    message: "",
  },
  reducers: {
    IncreseQty: (state, action) => {
      const { id, instock , outOfStock} = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.newqty < instock && !outOfStock) {
        product.newqty += 1;
      }
    },

    DecreseQty: (state, action) => {
      const { id ,outOfStock } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.newqty > 1 && !outOfStock) {
        product.newqty -= 1;
      }
    },

    AddToWatchlist: (state, action) => {
      const { id, outOfStock } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && !outOfStock) {
        product.liked = !product.liked;
      }
    },

    SelectedSize: (state, action) => {
      const { id, size, outOfStock } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && !outOfStock) {
        product.selectedSize = size;
      }
    },

    SelectedColor: (state, action) => {
      const { id, color, outOfStock } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && !outOfStock) {
        product.setColor = color;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        const { products, message } = action.payload;
        state.loading = false;
        state.products = products;
        state.message = message;
        state.products = state.products.map((product) => {
          return {
            ...product,
            price: new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(product.price * 10),
            liked: false,
            selectedSize: null,
            setColor: undefined,
            newqty: 1,
          };
        });
      })
      .addCase(GetProducts.rejected, (state, action) => {
        const { message } = action.payload;
        state.loading = false;
        state.products = [];
        state.message = message;
      });
  },
});

export const ProductSlice = Slice.reducer;
export const {
  IncreseQty,
  DecreseQty,
  setProducts,
  AddToWatchlist,
  SelectedSize,
  SelectedColor,
} = Slice.actions;
