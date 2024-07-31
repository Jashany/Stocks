import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;