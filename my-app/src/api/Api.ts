import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios from 'axios';
import { setIsSignedIn } from '../redux/signInSlice';
import { ISignIn, ISignInResp, ISignUp, ISignUpResp } from './models/AuthInterfaces';

const BASE_URL = 'https://final-task-backend-production-b324.up.railway.app';

const apiClient = axios.create({
  baseURL: BASE_URL
});

export const setupInterceptors = (store: ToolkitStore) => {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (config?.headers && token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        signOut();
        store.dispatch(setIsSignedIn(false));
      }
      return Promise.reject(error);
    }
  );
};

const signIn = async (data: ISignIn) => {
  const resp = await apiClient.post<ISignInResp>(`${BASE_URL}/auth/signin`, data);
  localStorage.setItem('token', resp.data.token);
  return resp.data.token;
};
const signUp = async (data: ISignUp) => {
  const resp = await apiClient.post<ISignUpResp>(`${BASE_URL}/auth/signup`, data);
  return resp.data;
};

const signOut = () => {
  localStorage.removeItem('token');
};

export const api = {
  signIn,
  signUp,
  signOut
};
