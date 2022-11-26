import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IModalState {
  isOpenModal: boolean;
  isLoading: boolean;
}

const initialState: IModalState = {
  isOpenModal: false,
  isLoading: false
};

export const deleteCurrentBoard = createAsyncThunk<
  void,
  string,
  {
    rejectValue: number | undefined;
  }
>('deleteCurrentBoard', async (boardId, thunkApi) => {
  try {
    console.log('slice', boardId);
    await api.deleteBoard(boardId);
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const boardPreviewSlice = createSlice({
  name: 'boardPreviewSlice',
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
    toggleLoader: (state) => {
      state.isLoading = !state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCurrentBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCurrentBoard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCurrentBoard.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setIsOpenModal, toggleLoader } = boardPreviewSlice.actions;

export default boardPreviewSlice.reducer;
