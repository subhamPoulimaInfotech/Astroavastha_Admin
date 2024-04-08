import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants.config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/` }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerInfo) => ({
        url: "register",
        method: "POST",
        body: registerInfo,
      }),
      invalidatesTags: ["register"],
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "login",
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["login"],
    }),
    verifyOtp: builder.mutation({
      query: (otpInfo) => ({
        url: "verifyOtp",
        method: "POST",
        body: otpInfo,
      }),
      invalidatesTags: ["verifyOtp"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerifyOtpMutation } =
  authApi;
