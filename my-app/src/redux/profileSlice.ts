import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IUserReq } from '../api/models/AuthInterfaces';
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
>('profile/getUser', async (userId, thunkApi) => {
  try {
    const resp = await api.getUser(userId);
    const { name, login } = resp;
    return { name, login };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const updateUserProfile = createAsyncThunk<
  Iprofile,
  { userId: string; data: IUserReq },
  {
    rejectValue: number | undefined;
  }
>('profile/updateUser', async ({ userId, data }, thunkApi) => {
  try {
    const resp = await api.updateUser(userId, data);
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorCode = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      });
  }
});

export const { clearErrorCode } = profileSlice.actions;

export default profileSlice.reducer;
