import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IprofileState {
  name: string;
  login: string;
  isLoading: boolean;
  errorCode?: number;
}

interface Iprofile {
  name: string;
  login: string;
}

const initialState: IprofileState = {
  name: '',
  login: '',
  isLoading: false
};

export const getUserProfile = createAsyncThunk<
  Iprofile,
  string,
  {
    rejectValue: number | undefined;
  }
>('profile', async (userId, thunkApi) => {
  try {
    const resp = await api.getUserById(userId);
    const { name, login } = resp;
    return { name, login };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearErrorCode: (state) => {
      state.errorCode = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorCode = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      });
  }
});

export const { clearErrorCode } = profileSlice.actions;

export default profileSlice.reducer;
