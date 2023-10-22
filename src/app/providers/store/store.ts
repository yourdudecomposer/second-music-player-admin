import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '@/features/Auth/model/service/AuthService';
import authSlice from '@/features/Auth/model/slice/AuthSlice';
import { tracksApi } from '@/entities/Track';

export const store = configureStore({
  reducer: {
    authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, tracksApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
