import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';
import SignInReducer from './signInSlice';
import SignUpReducer from './signUpSlice';
import BurgerReducer from './burgerSlice';

const store = configureStore({
  reducer: {
    app: AppReducer,
    signIn: SignInReducer,
    signUp: SignUpReducer,
    burger: BurgerReducer
  }
});

export default store;
