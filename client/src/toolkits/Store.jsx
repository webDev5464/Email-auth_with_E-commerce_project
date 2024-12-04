import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserSlice } from "./Slices/UserSlice";
import { AdminSlice } from "./Slices/AdminSlice";
import { ProductSlice } from "./Slices/ProductSlice";



const persistConfig = { key: "root", storage };

const rootReducer = combineReducers({
  userStore: UserSlice,
  adminStore: AdminSlice,
  productStore: ProductSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const StorePersister = persistStore(Store);
export default Store;



// import { UserSlice } from "./Slices/UserSlice";
// import { AdminSlice } from "./Slices/AdminSlice";
// import { ProductSlice } from "./Slices/ProductSlice";
// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: {
//    userStore: UserSlice,
//   adminStore: AdminSlice,
//   productStore: ProductSlice
//   }
// })

// export default store