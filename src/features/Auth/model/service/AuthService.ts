import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserResponse {
  token: string
}

export interface LoginRequest {
  password: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    admin: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'admin',
        method: 'POST',
        body: credentials,
      }),
    }),

  }),
});

export const { useAdminMutation } = authApi;
