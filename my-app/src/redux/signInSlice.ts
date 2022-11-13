import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ISignIn } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface AuthState {
  token: string;
  error?: string;
  isLoading?: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || ''
};

export const signIn = createAsyncThunk('signIn', async (data: ISignIn, thunkApi) => {
  try {
    const resp = await api.signIn(data);
    return resp;
  } catch (error) {
    const t = thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>error).response?.data);
    return t;
  }
});

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.token = '';
        state.error = (<ErrorResponse>action.payload).message;
      });
  }
});

export default signInSlice.reducer;
