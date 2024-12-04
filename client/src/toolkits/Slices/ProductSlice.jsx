import { createSlice } from "@reduxjs/toolkit";
import { GetProducts } from "../Thunks/ProductThunk";

const Slice = createSlice({
  name: "ProductSlice",
  initialState: {
    loading: false,
    allProducts: [],
    watchlist: [],
    message: "",
    product: [],
    liked: false,
    selectedSize: null,
    selectedColor: undefined,
  },
  reducers: {
    increaseQty: (state, action) => {
      const { id, instock, outOfStock } = action.payload;

      const allProduct = state.allProducts.find((product) => product.id === id);
      if (allProduct && allProduct.qty < instock && !outOfStock) {
        allProduct.qty += 1;
      }

      const watchlistProduct = state.watchlist.find(
        (product) => product.id === id
      );

      if (watchlistProduct && watchlistProduct.liked) {
        if (allProduct && allProduct.qty !== watchlistProduct.qty) {
          watchlistProduct.qty = allProduct.qty;
        }
      } else {
        if (allProduct && allProduct.liked) {
          state.watchlist.push({ ...allProduct });
        }
      }
    },

    decreaseQty: (state, action) => {
      const { id, outOfStock } = action.payload;

      const allProduct = state.allProducts.find((product) => product.id === id);
      if (allProduct && allProduct.qty > 1 && !outOfStock) {
        allProduct.qty -= 1;
      }

      const watchlistProduct = state.watchlist.find(
        (product) => product.id === id
      );

      if (watchlistProduct && watchlistProduct.liked) {
        if (allProduct && allProduct.qty !== watchlistProduct.qty) {
          watchlistProduct.qty = allProduct.qty;
        }
      }
    },

    addToWatchlist: (state, action) => {
      const { id, outOfStock } = action.payload;
      const product = state.allProducts.find((product) => product.id === id);
      if (product && !outOfStock) {
        product.liked = !product.liked;
        if (product.liked) {
          const existingProductInWatchlist = state.watchlist.find(
            (item) => item.id === id
          );
          if (!existingProductInWatchlist) {
            state.watchlist.push({ ...product });
          }
        } else {
          state.watchlist = state.watchlist.filter((item) => item.id !== id);
        }
      }
    },

    addToCart: (state, action) => {
      const { id } = action.payload;
      const addProduct = state.allProducts.find((item) => item.id === id);

      if (addProduct) {
        const isProductInCart = state.CartProducts.some(
          (item) => item.id === id
        );
        if (!isProductInCart) {
          state.CartProducts.push({ ...addProduct });
        }
      }
    },

    onSelectedSize: (state, action) => {
      const { id, size, outOfStock } = action.payload;

      const productInAllProducts = state.allProducts.find(
        (product) => product.id === id
      );
      if (productInAllProducts && !outOfStock) {
        productInAllProducts.selectedSize = size;
      }

      const productInWatchlist = state.watchlist.find(
        (product) => product.id === id
      );
      if (productInWatchlist && !outOfStock) {
        productInWatchlist.selectedSize = size;
      }
    },

    onSelectColor: (state, action) => {
      const { id, color, outOfStock } = action.payload;

      const productInAllProducts = state.allProducts.find(
        (product) => product.id === id
      );
      if (productInAllProducts && !outOfStock) {
        productInAllProducts.selectedColor = color;
      }

      const productInWatchlist = state.watchlist.find(
        (product) => product.id === id
      );
      if (productInWatchlist && !outOfStock) {
        productInWatchlist.selectedColor = color;
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
        state.allProducts = products;
        state.loading = false;
        state.message = message;
      })
      .addCase(GetProducts.rejected, (state, action) => {
        const { message } = action.payload;
        state.loading = false;
        state.allProducts = [];
        state.message = message;
      });
  },
});

export const ProductSlice = Slice.reducer;
export const {
  increaseQty,
  decreaseQty,
  addToWatchlist,
  onSelectedSize,
  addToCart,
  onSelectColor,
} = Slice.actions;
