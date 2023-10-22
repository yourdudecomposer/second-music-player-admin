import { Track } from '@/pages/TablePage/model/types/TrackSchema';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Post {
//   id: string
//   name: string
// }

// type PostsResponse = Post[]

const formDataObj = {};
export const createTrack = async (form:FormData) => {
  form.forEach((value, key) => (formDataObj[key] = value));

  console.log(formDataObj);

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
  form.forEach((value, key) => (formDataObj[key] = value));

  console.log(formDataObj);

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
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllTracks: build.query<Track[], string>({
      query: () => 'tracks/all?count=1000',
    }),
    deleteTrack: build.mutation<any, any>({
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
