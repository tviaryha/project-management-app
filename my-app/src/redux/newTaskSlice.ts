import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IUsersResp } from '../api/models/users';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { ICreateTaskReq, ICreateTaskResp } from '../api/models/task';
import { getUsers } from './newBoardSlice';
import { IBoardResp } from '../api/models/BoardsInterfaces';

interface INewTaskModalState {
  isLoading: boolean;
  allUsers: IUsersResp;
  boardUsers: string[];
}

const initialState: INewTaskModalState = {
  isLoading: false,
  allUsers: [],
  boardUsers: []
};

export const createTask = createAsyncThunk<
  ICreateTaskResp,
  ICreateTaskReq,
  {
    rejectValue: number | undefined;
  }
>('createTask', async (params, thunkApi) => {
  try {
    const resp = await api.createTask(params);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const getBoard = createAsyncThunk<
  IBoardResp,
  string,
  {
    rejectValue: number | undefined;
  }
>('getBoard', async (boardId, thunkApi) => {
  try {
    const resp = await api.getBoard(boardId);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const newTaskSlice = createSlice({
  name: 'newTask',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardUsers = action.payload.users;
      })
      .addCase(getBoard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { showLoader, hideLoader } = newTaskSlice.actions;

export default newTaskSlice.reducer;
