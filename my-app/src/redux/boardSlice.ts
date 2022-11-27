import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { IBoardResp } from '../api/models/boards';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IBoardState {
  title: string;
}

const initialState: IBoardState = {
  title: ''
};

export const getBoard = createAsyncThunk<
  IBoardResp,
  string,
  {
    rejectValue: number | undefined;
  }
>('getBoard', async (id, thunkApi) => {
  try {
    const resp = await api.getBoard(id);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.title = initialState.title;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.title = action.payload.title;
    });
  }
});

export const { clearBoard } = boardSlice.actions;

export default boardSlice.reducer;
