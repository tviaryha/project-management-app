import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';
import SignInReducer from './signInSlice';
import SignUpReducer from './signUpSlice';

const store = configureStore({
  reducer: {
    app: AppReducer,
    signIn: SignInReducer,
    signUp: SignUpReducer
  }
});

export default store;
