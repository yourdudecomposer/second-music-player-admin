import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track } from '../types/types';

export const createTrack = async (form:FormData) => {
  const res = await fetch('http://localhost:3000/tracks', {
    method: 'post',
    body: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(res);
};
export const editTrack = async (id:string, form:FormData) => {
  const res = await fetch(`http://localhost:3000/tracks/${id}`, {
    method: 'put',
    body: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(res);
};

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        console.log('yes token');
      } else {
        console.log('no token');
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllTracks: build.query<Track[], string>({
      query: () => 'tracks/all?count=1000',
    }),
    deleteTrack: build.mutation<Track[], string>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllTracksQuery, useDeleteTrackMutation,
} = tracksApi;
