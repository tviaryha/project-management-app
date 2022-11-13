import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToastState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

interface IToastPayload {
  message: string;
  type: 'success' | 'error';
}

const initialState: IToastState = {
  isOpen: false,
  message: '',
  type: 'success'
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<IToastPayload>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeToast: (state) => {
      state.isOpen = false;
      state.message = '';
    }
  }
});

export const { openToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
