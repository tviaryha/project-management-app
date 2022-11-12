import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './../redux/appSlice';

const store = configureStore({
  reducer: {
    app: AppReducer
  }
});

export default store;
