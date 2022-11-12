import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IinitialState } from './types';

const initialState: IinitialState = {
  test: 'test' // this line should be removed
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // method below should be removed
    test: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    }
  }
});

export const { test } = appSlice.actions;

export default appSlice.reducer;
