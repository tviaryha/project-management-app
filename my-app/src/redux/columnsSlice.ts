import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import {
  ColumnDelete,
  ColumnsResp,
  IColumnReq,
  IColumnResp,
  UpdateColumnsOrderReq
} from '../api/models/columns';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { ICreateTaskReq, ICreatedTask } from '../api/models/task';
import {
  GetTasksParams,
  IColumnTasks,
  TasksResp,
  UpdateTasksOrderParams
} from '../api/models/tasks';
import { mapItemsByOrder } from '../utils/utils';

interface IColumnsState {
  isOpen: boolean;
  isConfirmationModalOpen: boolean;
  isLoading: boolean;
  columns: ColumnsResp;
  isColumnsLoaded: boolean;
  tasks: { [columnId: string]: TasksResp };
}

const initialState: IColumnsState = {
  isOpen: false,
  isConfirmationModalOpen: false,
  isLoading: false,
  columns: [],
  isColumnsLoaded: false,
  tasks: {}
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
  IColumnResp,
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

export const updateSetOfColumns = createAsyncThunk<
  ColumnsResp,
  UpdateColumnsOrderReq,
  {
    rejectValue: number | undefined;
  }
>('updateSetOfColumns', async (params, thunkApi) => {
  try {
    const resp = await api.updateSetOfColumns(params);
    return resp;
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const updateSetOfTasks = createAsyncThunk<
  IColumnTasks,
  UpdateTasksOrderParams,
  {
    rejectValue: number | undefined;
  }
>('updateSetOfTasks', async (params, thunkApi) => {
  try {
    const resp = await api.updateSetOfTasks(params.tasks);
    return { columnId: params.columnId, tasks: resp };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const getTasks = createAsyncThunk<
  IColumnTasks,
  GetTasksParams,
  {
    rejectValue: number | undefined;
  }
>('getTasks', async (params, thunkApi) => {
  try {
    const resp = await api.getTasks(params);
    return { columnId: params.columnId, tasks: resp };
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const createTask = createAsyncThunk<
  ICreatedTask,
  ICreateTaskReq,
  {
    rejectValue: number | undefined;
  }
>('createTask', async (params, thunkApi) => {
  try {
    const { columnId, boardId } = params;
    const resp = await api.createTask(params);
    const task = { ...resp, columnId, boardId };
    return { columnId, task };
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
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateColumnTitle: (state, action: { payload: { title: string; _id: string } }) => {
      const { title, _id } = action.payload;
      state.columns = state.columns.map((column) => {
        if (column._id === _id) {
          column.title = title;
        }
        return column;
      });
    },
    setIsColumnsLoaded: (state, action: { payload: boolean; type: string }) => {
      state.isColumnsLoaded = action.payload;
    },
    clearColumns: (state) => {
      state.columns = initialState.columns;
      state.isColumnsLoaded = initialState.isColumnsLoaded;
      state.tasks = initialState.tasks;
    },
    setTasks: (state, action: { payload: IColumnTasks; type: string }) => {
      const { columnId, tasks } = action.payload;
      state.tasks[columnId] = tasks;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.rejected, (state) => {
        state.isLoading = false;
        state.isOpen = false;
        state.isColumnsLoaded = true;
        state.isConfirmationModalOpen = false;
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        if (!action.payload.length) {
          state.isColumnsLoaded = true;
        }
        const sortedColumns = action.payload.sort((a, b) => a.order - b.order);
        state.columns = mapItemsByOrder(sortedColumns);
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
      })
      .addCase(updateSetOfColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload;
      })
      .addCase(updateSetOfTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        const { columnId, tasks } = action.payload;
        state.tasks[columnId] = mapItemsByOrder(tasks);
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        const { columnId, tasks } = action.payload;
        const sortedTasks = tasks.sort((a, b) => a.order - b.order);
        state.tasks[columnId] = mapItemsByOrder(sortedTasks);
        state.isLoading = false;
      })
      .addCase(getTasks.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { columnId, task } = action.payload;
        state.tasks[columnId].push(task);
      });
  }
});

export const {
  openModal,
  closeModal,
  openConfirmationModal,
  closeConfirmationModal,
  clearColumns,
  setColumns,
  updateColumnTitle,
  setIsColumnsLoaded,
  setTasks
} = columnsSlice.actions;

export default columnsSlice.reducer;
