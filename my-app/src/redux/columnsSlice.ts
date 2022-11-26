import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ColumnsResp, IColumnReq, IColumnResp } from '../api/models/columns';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IColumnsListState {
  columns: ColumnsResp;
}

const initialState: IColumnsListState = {
  columns: []
};

export const createColumn = createAsyncThunk<
  IColumnResp,
  IColumnReq,
  {
    rejectValue: number | undefined;
  }
>('createColumn', async (params, thunkApi) => {
  try {
    const resp = await api.createColumn(params);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const getColumns = createAsyncThunk<
  ColumnsResp,
  string,
  {
    rejectValue: number | undefined;
  }
>('getColumns', async (id, thunkApi) => {
  try {
    const resp = await api.getColumns(id);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    clearColumns: (state) => {
      state.columns = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
  }
});

export const { clearColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
