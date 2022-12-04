import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { DeleteTaskParams, IUpdateTask } from '../api/models/tasks';

interface IModalState {
  isOpenEditTaskModal: boolean;
  isOpenDeleteTaskModal: boolean;
  isLoading: boolean;
  boardId: string;
  columnId: string;
  taskId: string;
}

const initialState: IModalState = {
  isOpenEditTaskModal: false,
  isOpenDeleteTaskModal: false,
  isLoading: false,
  boardId: '',
  columnId: '',
  taskId: ''
};

export const deleteTask = createAsyncThunk<
  void,
  DeleteTaskParams,
  {
    rejectValue: number | undefined;
  }
>('deleteTask', async (params, thunkApi) => {
  try {
    await api.deleteTask(params);
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const updateTask = createAsyncThunk<
  void,
  IUpdateTask,
  {
    rejectValue: number | undefined;
  }
>('updateTask', async (params, thunkApi) => {
  try {
    await api.updateTask(params);
  } catch (e) {
    return thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>e).response?.status);
  }
});

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    setIsOpenEditTaskModal: (state, action) => {
      state.isOpenEditTaskModal = action.payload;
    },
    openDeleteTaskModal: (state, action: { payload: DeleteTaskParams; type: string }) => {
      const { boardId, columnId, taskId } = action.payload;
      state.isOpenDeleteTaskModal = true;
      state.boardId = boardId;
      state.columnId = columnId;
      state.taskId = taskId;
    },
    closeDeleteTaskModal: (state) => {
      state.isOpenDeleteTaskModal = false;
      state.boardId = initialState.boardId;
      state.columnId = initialState.columnId;
      state.taskId = initialState.taskId;
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTask.rejected, (state) => {
      state.isOpenDeleteTaskModal = false;
    });
  }
});

export const {
  setIsOpenEditTaskModal,
  openDeleteTaskModal,
  closeDeleteTaskModal,
  toggleIsLoading
} = taskSlice.actions;

export default taskSlice.reducer;
