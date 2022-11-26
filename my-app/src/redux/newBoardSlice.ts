import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IBoardResp, IBoardReq } from '../api/models/boards';
import { IUsersResp } from '../api/models/users';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface INewBoardModalState {
  isOpen: boolean;
  isLoading: boolean;
  users: IUsersResp;
}

const initialState: INewBoardModalState = {
  isOpen: false,
  isLoading: false,
  users: []
};

export const createBoard = createAsyncThunk<
  IBoardResp,
  IBoardReq,
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

export const newBoardSlice = createSlice({
  name: 'newBoard',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModal: (state) => {
      state.isOpen = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isOpen = false;
        state.isLoading = false;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state) => {
        state.isOpen = false;
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.isOpen = false;
        state.isLoading = false;
      });
  }
});

export const { closeModal, openModal } = newBoardSlice.actions;

export default newBoardSlice.reducer;
