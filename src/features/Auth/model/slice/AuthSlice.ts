import { RootState } from '@/app/providers/store/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
    isLogged: boolean
    isLogErr: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  isLogged: false,
  isLogErr: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = action.payload;
    },
    setIsLogErr: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogErr = action.payload;
    },
  },
});

export const { setIsLogged, setIsLogErr } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLogged = (state: RootState) => state.authSlice.isLogged;
export const isLogErr = (state: RootState) => state.authSlice.isLogErr;

export default authSlice.reducer;
