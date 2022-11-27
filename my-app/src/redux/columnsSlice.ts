import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import {
  ColumnDelete,
  ColumnsResp,
  IColumnReq,
  IColumnResp,
  IColumnUpdate
} from '../api/models/columns';
import { ErrorResponse } from '../api/models/ErrorResponse';

interface IColumnsState {
  isOpen: boolean;
  isConfirmationModalOpen: boolean;
  isLoading: boolean;
  columns: ColumnsResp;
}

const initialState: IColumnsState = {
  isOpen: false,
  isConfirmationModalOpen: false,
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

export const deleteColumn = createAsyncThunk<
  void,
  ColumnDelete,
  {
    rejectValue: number | undefined;
  }
>('deleteColumn', async (params, thunkApi) => {
  try {
    await api.deleteColumn(params);
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
    openConfirmationModal: (state) => {
      state.isConfirmationModalOpen = true;
    },
    closeConfirmationModal: (state) => {
      state.isConfirmationModalOpen = false;
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
        if (state.isLoading && state.isConfirmationModalOpen) {
          state.isLoading = false;
          state.isConfirmationModalOpen = false;
        }
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColumn.rejected, (state) => {
        state.isLoading = false;
        state.isOpen = false;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.rejected, (state) => {
        state.isLoading = false;
        state.isConfirmationModalOpen = false;
      });
  }
});

export const {
  openModal,
  closeModal,
  openConfirmationModal,
  closeConfirmationModal,
  clearColumns
} = columnsSlice.actions;

export default columnsSlice.reducer;
