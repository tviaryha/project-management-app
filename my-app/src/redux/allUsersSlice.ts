import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IUsers {
  _id: string;
  name: string;
  login: string;
}

interface IUsersState {
  users: IUsers[];
  isLoading: boolean;
}

const initialState: IUsersState = {
  users: [],
  isLoading: false
};

export const getAllUsers = createAsyncThunk('getAllUsers', async (_, thunkApi) => {
  try {
    const resp = await api.getUsers();
    return resp;
  } catch (error) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>error).response?.data);
  }
});

export const allUsers = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUsers[]>) => {
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.users = [];
      });
  }
});

export default allUsers.reducer;
