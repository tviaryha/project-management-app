import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ISignUp, ISignUpResp } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface RegistrationState {
  user: ISignUpResp | '';
  error?: string;
  isLoading?: boolean;
}

const initialState: RegistrationState = {
  user: ''
};

export const signUp = createAsyncThunk('signUp', async (data: ISignUp, thunkApi) => {
  try {
    const resp = await api.signUp(data);
    return resp;
  } catch (error) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>error).response?.data);
  }
});

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.user = '';
        state.error = (<ErrorResponse>action.payload).message;
      });
  }
});

export default signUpSlice.reducer;
