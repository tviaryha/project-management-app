import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ISignUp } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface RegistrationState {
  userName: string;
  error?: string;
  isLoading?: boolean;
}

const initialState: RegistrationState = {
  userName: ''
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
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.userName = action.payload;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.userName = '';
      state.error = action.payload.message;
    }
  }
});

export default signUpSlice.reducer;
