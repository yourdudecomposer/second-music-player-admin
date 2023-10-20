import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Track } from '../types/TrackSchema';

// Define a service using a base URL and expected endpoints
export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/tracks',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query<Track[], string>({
      query: () => 'all?count=1000',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTracksQuery } = tracksApi;
