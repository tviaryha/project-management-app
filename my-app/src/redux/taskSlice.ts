import { createSlice } from '@reduxjs/toolkit';

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
