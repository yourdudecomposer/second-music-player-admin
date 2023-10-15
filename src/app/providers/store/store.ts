import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tracksApi } from '@pages/TablePage';
import { authApi } from '@/features/Auth/model/service/AuthService';
import authSlice from '@/features/Auth/model/slice/AuthSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    [tracksApi.reducerPath]: tracksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tracksApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
