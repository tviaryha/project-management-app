import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ColumnsResp, IColumnReq, IColumnResp, IColumnUpdate } from '../api/models/columns';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IColumnsState {
  isOpen: boolean;
  isLoading: boolean;
  columns: ColumnsResp;
}

const initialState: IColumnsState = {
  isOpen: false,
  isLoading: false,
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

export const updateColumn = createAsyncThunk<
  IColumnResp,
  IColumnUpdate,
  {
    rejectValue: number | undefined;
  }
>('updateColumn', async (params, thunkApi) => {
  try {
    const resp = await api.updateColumn(params);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    clearColumns: (state) => {
      state.columns = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.rejected, (state) => {
        state.isLoading = false;
        state.isOpen = false;
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        if (state.isLoading && state.isOpen) {
          state.isLoading = false;
          state.isOpen = false;
        }
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColumn.rejected, (state) => {
        state.isLoading = false;
        state.isOpen = false;
      });
  }
});

export const { openModal, closeModal, clearColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
