import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IUserReq } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IprofileState {
  name: string;
  login: string;
  isLoading: boolean;
  modalIsOpen: boolean;
}

export interface Iprofile {
  name: string;
  login: string;
}

const initialState: IprofileState = {
  name: '',
  login: '',
  isLoading: false,
  modalIsOpen: false
};

export const getUser = createAsyncThunk<
  Iprofile,
  string,
  {
    rejectValue: number | undefined;
  }
>('getUser', async (userId, thunkApi) => {
  try {
    const resp = await api.getUser(userId);
    const { name, login } = resp;
    return { name, login };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const updateUser = createAsyncThunk<
  Iprofile,
  { userId: string; data: IUserReq },
  {
    rejectValue: number | undefined;
  }
>('updateUser', async ({ userId, data }, thunkApi) => {
  try {
    const resp = await api.updateUser(userId, data);
    const { name, login } = resp;
    return { name, login };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const deleteUser = createAsyncThunk<
  void,
  string,
  {
    rejectValue: number | undefined;
  }
>('deleteUser', async (userId, thunkApi) => {
  try {
    await api.deleteUser(userId);
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.name = '';
      state.login = '';
    },
    openProfileModal: (state) => {
      state.modalIsOpen = true;
    },
    closeProfileModal: (state) => {
      state.modalIsOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const { clearProfile, openProfileModal, closeProfileModal } = profileSlice.actions;

export default profileSlice.reducer;
