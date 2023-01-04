import { createSlice } from '@reduxjs/toolkit';

interface ILoaderState {
  isLoading: boolean;
}

const initialState: ILoaderState = {
  isLoading: false
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    }
  }
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
