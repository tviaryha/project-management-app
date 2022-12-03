import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { DeleteTaskParams, IUpdateTask } from '../api/models/tasks';

interface IModalState {
  isOpenEditTaskModal: boolean;
  isOpenDeleteTaskModal: boolean;
  isLoading: boolean;
}

const initialState: IModalState = {
  isOpenEditTaskModal: false,
  isOpenDeleteTaskModal: false,
  isLoading: false
};

export const deleteTask = createAsyncThunk<
  void,
  DeleteTaskParams,
  {
    rejectValue: number | undefined;
  }
>('deleteColumn', async (params, thunkApi) => {
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
>('deleteColumn', async (params, thunkApi) => {
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
    setIsOpenDeleteTaskModal: (state, action) => {
      state.isOpenDeleteTaskModal = action.payload;
    },
    toggleLoader: (state) => {
      state.isLoading = !state.isLoading;
    }
  }
});

export const { setIsOpenEditTaskModal, setIsOpenDeleteTaskModal, toggleLoader } = taskSlice.actions;

export default taskSlice.reducer;
