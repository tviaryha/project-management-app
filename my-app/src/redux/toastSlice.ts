import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RespRes {
  success = 'success',
  error = 'error'
}

export interface IToastState {
  isOpen: boolean;
  message: string;
  type: RespRes;
}

interface IToastPayload {
  message: string;
  type: RespRes;
}

const initialState: IToastState = {
  isOpen: false,
  message: '',
  type: RespRes.success
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
