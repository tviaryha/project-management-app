import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IBoardResp } from '../api/models/BoardsInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IBoardsListState {
  boards: IBoardResp[];
  isLoading: boolean;
  modalIsOpen: boolean;
}

const initialState: IBoardsListState = {
  boards: [],
  isLoading: true,
  modalIsOpen: false
};

export const loadUserBoards = createAsyncThunk<
  IBoardResp[],
  string,
  {
    rejectValue: number | undefined;
  }
>('getAllUserBoards', async (userId, thunkApi) => {
  try {
    return await api.getAllUserBoards(userId);
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const boardsList = createSlice({
  name: 'boardsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserBoards.fulfilled, (state, action: PayloadAction<IBoardResp[]>) => {
        state.boards = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUserBoards.rejected, (state) => {
        state.boards = [];
        state.isLoading = false;
      });
  }
});
export default boardsList.reducer;
