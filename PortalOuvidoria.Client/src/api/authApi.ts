import { ApplicationUser } from "@/utils/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./base-api";

interface LoginRequest {
  email: string;
  code: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    requestOTP: builder.mutation({
      query: (loginData) => ({
        url: "auth/login/step/generate",
        method: 'POST',
        body: loginData
      })
    }),
    validateOTP: builder.mutation<ApplicationUser, LoginRequest>({
      query: (loginData) => ({
        url: "auth/login/step/validate",
        method: 'POST',
        body: loginData
      })
    }),
    checkAuth: builder.query<{ is_authenticated: boolean }, void>({
      query: () => 'auth/login/check',
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
      
    })
  })
})

export const {
  useRequestOTPMutation,
  useValidateOTPMutation,
  useCheckAuthQuery,
  useLogoutMutation } = authApi;