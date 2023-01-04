import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IUsersResp } from '../api/models/users';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { getUsers } from './newBoardSlice';
import { IBoardResp } from '../api/models/BoardsInterfaces';

interface INewTaskModalState {
  isLoading: boolean;
  isOpen: boolean;
  boardId: string;
  columnId: string;
  allUsers: IUsersResp;
  boardUsers: string[];
}

const initialState: INewTaskModalState = {
  isLoading: false,
  isOpen: false,
  boardId: '',
  columnId: '',
  allUsers: [],
  boardUsers: []
};

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
    },
    openModal: (
      state,
      action: { payload: { boardId: string; columnId: string }; type: string }
    ) => {
      state.isOpen = true;
      state.boardId = action.payload.boardId;
      state.columnId = action.payload.columnId;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.boardId = initialState.boardId;
      state.columnId = initialState.columnId;
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
      });
  }
});

export const { openModal, closeModal, showLoader, hideLoader } = newTaskSlice.actions;

export default newTaskSlice.reducer;
