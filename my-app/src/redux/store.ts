import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';
import SignUpReducer from './signUpSlice';
import SignInReducer from './signInSlice';
import ToastReducer from './toastSlice';
import LoaderReducer from './loaderSlice';
import BurgerReducer from './burgerSlice';
import ProfileReducer from './profileSlice';
import NewBoardReducer from './newBoardSlice';
import NewTaskReducer from './newTaskSlice';
import BoardsListReducer from './boardsListSlice';
import BoardPreviewReducer from './boardPreviewSlice';
import TaskReducer from './taskSlice';
import BoardReducer from './boardSlice';
import ColumnsReducer from './columnsSlice';
import AllUsersReducer from './allUsersSlice';

const store = configureStore({
  reducer: {
    app: AppReducer,
    signIn: SignInReducer,
    signUp: SignUpReducer,
    toast: ToastReducer,
    loader: LoaderReducer,
    burger: BurgerReducer,
    profile: ProfileReducer,
    newBoard: NewBoardReducer,
    newTask: NewTaskReducer,
    boardsList: BoardsListReducer,
    boardPreview: BoardPreviewReducer,
    task: TaskReducer,
    board: BoardReducer,
    columns: ColumnsReducer,
    usersList: AllUsersReducer
  }
});

export default store;
