import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IUsersResp } from '../api/models/users';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { ICreateTaskReq, ICreateTaskResp } from '../api/models/task';
import { getUsers } from './newBoardSlice';
import { IBoardResp } from '../api/models/BoardsInterfaces';

interface INewTaskModalState {
  isOpen: boolean;
  isLoading: boolean;
  allUsers: IUsersResp;
  boardUsers: string[];
  columnId: string;
}

const initialState: INewTaskModalState = {
  isOpen: false,
  isLoading: false,
  allUsers: [],
  boardUsers: [],
  columnId: ''
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
    closeModal: (state) => {
      state.isOpen = false;
      state.columnId = '';
    },
    openModal: (state, action) => {
      state.isOpen = true;
      state.columnId = action.payload;
    },
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
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isOpen = false;
        state.isLoading = false;
      })
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardUsers = action.payload.users;
      })
      .addCase(getBoard.rejected, (state) => {
        state.isOpen = false;
        state.isLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { closeModal, openModal, showLoader, hideLoader } = newTaskSlice.actions;

export default newTaskSlice.reducer;
