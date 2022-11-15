import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ISignIn } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IAuthState {
  isSignedIn: boolean;
  error?: string;
  isLoading?: boolean;
}

const initialState: IAuthState = {
  isSignedIn: false
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
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoading = false;
        state.isSignedIn = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = false;
        state.error = (<ErrorResponse>action.payload).message;
      });
  }
});

export const { setIsSignedIn } = signInSlice.actions;

export default signInSlice.reducer;
