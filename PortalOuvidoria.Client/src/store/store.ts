import { configureStore } from "@reduxjs/toolkit";
import { chamadoApi } from "@/api/chamadoApi";
import { authApi } from "@/api/authApi";
import userReducer, { loadUserState, saveUserState } from '@/auth/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chamadoApi.reducerPath]: chamadoApi.reducer,
    user: userReducer,
  },
  preloadedState: {
    user: loadUserState()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chamadoApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


store.subscribe(() => {
  saveUserState(store.getState().user)
});

export default store;