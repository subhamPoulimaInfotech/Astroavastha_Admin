import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants.config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/admin/` }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ token, page, limit, isActive , isNewUser, searchQuery}) => ({
        url: `users?page=${page}&limit=${limit}&isActive=${isActive}&isNewUser=${isNewUser}&searchQuery=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["getAllUsers"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
} = userApi;
