import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IModalState {
  isOpenModal: boolean;
  boardId: string;
  boardTitle: string;
  isLoad: boolean;
}

const initialState: IModalState = {
  isOpenModal: false,
  boardId: '',
  boardTitle: '',
  isLoad: false
};

export const deleteCurrentBoard = createAsyncThunk<
  void,
  string,
  {
    rejectValue: number | undefined;
  }
>('deleteCurrentBoard', async (boardId, thunkApi) => {
  try {
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
    setBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    setBoardTitle: (state, action) => {
      state.boardTitle = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoad = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCurrentBoard.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(deleteCurrentBoard.rejected, (state) => {
        state.isLoad = false;
      })
      .addCase(deleteCurrentBoard.fulfilled, (state) => {
        state.isLoad = false;
      });
  }
});

export const { setIsOpenModal, setBoardId, setBoardTitle, setIsLoading } =
  boardPreviewSlice.actions;

export default boardPreviewSlice.reducer;
