import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants.config";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/admin/` }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, limit, token, categoryId, sortOption, statusType, origin, searchQuery }) => ({
        url: `products?page=${page}&limit=${limit}&categoryId=${categoryId}&sortOption=${sortOption}&statusType=${statusType}&origin=${origin}&searchQuery=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["getAllProducts"],
    }),
    getAllCategories: builder.query({
      query: ({ token }) => ({
        url: `categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.categories,
      invalidatesTags: ["getAllCategories"],
    }),
    getProductsByCategory: builder.query({
      query: ({ page, limit, token, categoryId }) => ({
        url: `products-by-category?page=${page}&limit=${limit}&categoryId=${categoryId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.products,
      invalidatesTags: ["getProductsByCategory"],
    }),
    getProductDetails: builder.query({
      query: ({ token, productId }) => ({
        url: `products/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.product,
      invalidatesTags: ["getProductDetails"],
    }),
    deactivateProducts: builder.mutation({
      query: ({ token, productIds }) => ({
        url: `products/deactivate`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { productIds },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["deactivateProducts"],
    }),
    deleteProducts: builder.mutation({
      query: ({ token, productIds }) => ({
        url: `products/delete`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { productIds },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["deleteProducts"],
    }),
    activateProducts: builder.mutation({
      query: ({ token, productIds }) => ({
        url: `products/activate`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { productIds },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["deactivateProducts"],
    }),
    addProduct: builder.mutation({
      query: ({ token, productData }) => ({
        url: `products/addProduct`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["addProduct"],
    }),
    editProduct: builder.mutation({
      query: ({ token, productId, updatedProductData }) => ({
        url: `products/editProduct/${productId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProductData,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["editProduct"],
    }),
    getAllOrigin: builder.query({
      query: ({ token }) => ({
        url: `origins`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.origins,
      invalidatesTags: ["getAllOrigin"],
    }),
    getProductsBasedOnOrigin: builder.query({
      query: ({ token, origin }) => ({
        url: `products-by-origin?origin=${origin}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.products,
      invalidatesTags: ["getProductsBasedOnOrigin"],
    }),
    addCategory: builder.mutation({
      query: ({ token, categoryData }) => ({
        url: `addCategory`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: categoryData,
      }),
      invalidatesTags: ["addCategory"],
    }),
    addTranslationForProduct: builder.mutation({
      query: ({ token, productData, productId }) => ({
        url: `${productId}/translations`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      }),
      invalidatesTags: ["addTranslationForProduct"],
    }),
    getTranslationsForProduct: builder.query({
      query: ({ token, productId }) => ({
        url: `${productId}/translations`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // transformResponse: (response) => response.products,
      invalidatesTags: ["getTranslationsForProduct"],
    }),
    saveProductDraft: builder.mutation({
      query: ({ token, draftData }) => ({
        url: `save-draft`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: draftData,
      }),
      invalidatesTags: ["saveProductDraft"],
    }),
    getAllDrafts: builder.query({
      query: ({ token }) => ({
        url: `drafts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.drafts,
      invalidatesTags: ["getAllDrafts"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
  useDeactivateProductsMutation,
  useDeleteProductsMutation,
  useActivateProductsMutation,
  useAddProductMutation,
  useEditProductMutation,
  useGetAllOriginQuery,
  useGetProductsBasedOnOriginQuery,
  useAddCategoryMutation,
  useAddTranslationForProductMutation,
  useGetTranslationsForProductQuery,
  useSaveProductDraftMutation,
  useGetAllDraftsQuery
} = productApi;
