import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.cloudflare.com/client/v4/accounts/959b73ac2e35fef30a4cc11b4ab39ece/images/v1` }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: "",
                method: "POST",
                headers: {
                    Authorization: `Bearer rTqftydVDat-WEWJiVj9M4mBUUlpXVLGOcx48dP1`,
                },
                body: formData,
            }),
            invalidatesTags: ["uploadImage"],
        }),
    }),
});

export const { useUploadImageMutation } =
    imageApi;
