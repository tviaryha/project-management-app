import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';
import SignUpReducer from './signUpSlice';
import SignInReducer from './signInSlice';
import ToastReducer from './toastSlice';
import LoaderReducer from './loaderSlice';
import BurgerReducer from './burgerSlice';
import ProfileReducer from './profileSlice';
import NewBoardReducer from './newBoardSlice';
import BoardsListReducer from './boardsListSlice';
import BoardReducer from './boardSlice';
import ColumnsReducer from './columnsSlice';

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
    boardsList: BoardsListReducer,
    board: BoardReducer,
    columns: ColumnsReducer
  }
});

export default store;
