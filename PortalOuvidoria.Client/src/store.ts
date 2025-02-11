import { configureStore } from "@reduxjs/toolkit";
import { chamadoApi } from "./chamadoApi";

export const store = configureStore({
  reducer: {
    [chamadoApi.reducerPath]: chamadoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(chamadoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;