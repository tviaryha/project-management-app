import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>error).response?.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.token = action.payload;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.token = '';
      state.error = action.payload.message;
    }
  }
});

export default authSlice.reducer;
