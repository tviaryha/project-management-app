import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ICreateBoardReq, ICreateBoardResp } from '../api/models/boards';
import { IUsersResp } from '../api/models/users';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface INewBoardModalState {
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: INewBoardModalState = {
  isOpen: false,
  isLoading: false
};

export const createBoard = createAsyncThunk<
  ICreateBoardResp,
  ICreateBoardReq,
  {
    rejectValue: number | undefined;
  }
>('createBoard', async (params, thunkApi) => {
  try {
    const resp = await api.createBoard(params);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const getUsers = createAsyncThunk<
  IUsersResp,
  void,
  {
    rejectValue: number | undefined;
  }
>('getUsers', async (_, thunkApi) => {
  try {
    const resp = await api.getUsers();
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const newBoardModalSlice = createSlice({
  name: 'newBoardModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
