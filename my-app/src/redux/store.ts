import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';
import AuthReducer from './../redux/authSlice';

const store = configureStore({
  reducer: {
    app: AppReducer,
    auth: AuthReducer
  }
});

export default store;
