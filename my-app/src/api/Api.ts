import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios from 'axios';
import { setIsSignedIn } from '../redux/signInSlice';
import { ISignIn, ISignInResp, ISignUp, ISignUpResp } from './models/AuthInterfaces';
import jwt_decode from 'jwt-decode';
import { IDecodedToken } from './interface';
import { IGetUser } from './models/EditProfileInterfaces';
import { LocalStorageKeys } from '../enums';

const BASE_URL = 'https://final-task-backend-production-b324.up.railway.app';

const apiClient = axios.create({
  baseURL: BASE_URL
});

export const setupInterceptors = (store: ToolkitStore) => {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(LocalStorageKeys.token);
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
        localStorage.removeItem(LocalStorageKeys.token);
        store.dispatch(setIsSignedIn(false));
      }
      return Promise.reject(error);
    }
  );
};

const signIn = async (data: ISignIn) => {
  const resp = await apiClient.post<ISignInResp>(`${BASE_URL}/auth/signin`, data);
  const token = resp.data.token;
  const decoded: IDecodedToken = jwt_decode(token);

  localStorage.setItem(LocalStorageKeys.token, token);
  localStorage.setItem(LocalStorageKeys.userId, decoded.id);

  return resp.data.token;
};
const signUp = async (data: ISignUp) => {
  const resp = await apiClient.post<ISignUpResp>(`${BASE_URL}/auth/signup`, data);
  return resp.data;
};

const signOut = () => {
  localStorage.removeItem(LocalStorageKeys.token);
  localStorage.removeItem(LocalStorageKeys.userId);
};

const getUserById = async (userId: string) => {
  const resp = await apiClient<IGetUser>({
    url: `/users/${userId}`
  });
  return resp.data;
};

export const api = {
  signIn,
  signUp,
  signOut,
  getUserById
};
