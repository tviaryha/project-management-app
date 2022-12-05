import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ErrorResponse } from '../api/models/ErrorResponse';
import { DeleteTaskParams, ITaskResp, IUpdateTask } from '../api/models/tasks';
import { IUsersResp } from '../api/models/users';

interface IModalState {
  isOpenEditTaskModal: boolean;
  isOpenDeleteTaskModal: boolean;
  isLoading: boolean;
  boardId: string;
  columnId: string;
  taskId: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  allUsers: IUsersResp;
}

const initialState: IModalState = {
  isOpenEditTaskModal: false,
  isOpenDeleteTaskModal: false,
  isLoading: false,
  boardId: '',
  columnId: '',
  taskId: '',
  title: '',
  order: 0,
  description: '',
  userId: '',
  allUsers: []
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

export const getUsers = createAsyncThunk<
  IUsersResp,
  void,
  {
    rejectValue: number | undefined;
  }
>('getUsers', async (_, thunkApi) => {
  try {
    const resp = await api.getUsers();
    return resp;
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
    openEditTaskModal: (state, action: { payload: ITaskResp; type: string }) => {
      const { boardId, columnId, _id: taskId, description, order, title, userId } = action.payload;
      state.isOpenEditTaskModal = true;
      state.boardId = boardId;
      state.columnId = columnId;
      state.taskId = taskId;
      state.description = description;
      state.order = order;
      state.title = title;
      state.userId = userId;
    },
    closeEditTaskModal: (state) => {
      state.isOpenEditTaskModal = false;
      state.boardId = initialState.boardId;
      state.columnId = initialState.columnId;
      state.taskId = initialState.taskId;
      state.description = initialState.description;
      state.order = initialState.order;
      state.title = initialState.title;
      state.userId = initialState.userId;
      state.allUsers = initialState.allUsers;
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTask.rejected, (state) => {
        state.isOpenDeleteTaskModal = false;
      })
      .addCase(updateTask.rejected, (state) => {
        state.isOpenEditTaskModal = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  setIsOpenEditTaskModal,
  openDeleteTaskModal,
  closeDeleteTaskModal,
  openEditTaskModal,
  closeEditTaskModal,
  toggleIsLoading
} = taskSlice.actions;

export default taskSlice.reducer;
