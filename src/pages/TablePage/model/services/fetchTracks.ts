import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Tracks } from '../types/articlesPageSchema';

// Define a service using a base URL and expected endpoints
export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/tracks',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query<Tracks, string>({
      query: () => 'all',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTracksQuery } = tracksApi;
