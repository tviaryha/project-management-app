import { createSlice } from '@reduxjs/toolkit';
interface IinitialState {
  isLoaderVisible: boolean;
}

const initialState: IinitialState = {
  isLoaderVisible: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoaderVisible = true;
    },
    hideLoader: (state) => {
      state.isLoaderVisible = false;
    }
  }
});

export const { showLoader, hideLoader } = appSlice.actions;

export default appSlice.reducer;
