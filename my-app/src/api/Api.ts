import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios from 'axios';
import { setIsSignedIn } from '../redux/signInSlice';
import { ISignIn, ISignInResp, IUserReq, IUserResp } from './models/AuthInterfaces';
import jwt_decode from 'jwt-decode';
import { IDecodedToken } from './interface';
import { LocalStorageKeys } from '../enums';
import { IBoardResp } from './models/BoardsInterfaces';

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
        signOut();
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
const signUp = async (data: IUserReq) => {
  const resp = await apiClient.post<IUserResp>(`${BASE_URL}/auth/signup`, data);
  return resp.data;
};

const signOut = () => {
  localStorage.removeItem(LocalStorageKeys.token);
  localStorage.removeItem(LocalStorageKeys.userId);
};

const getUser = async (userId: string) => {
  const resp = await apiClient<IUserResp>({
    url: `/users/${userId}`
  });
  return resp.data;
};

const updateUser = async (userId: string, data: IUserReq) => {
  const resp = await apiClient.put<IUserResp>(`users/${userId}`, data);
  return resp.data;
};

const deleteUser = async (userId: string) => {
  await apiClient.delete(`/users/${userId}`);
};

const getAllUserBoards = async (userId: string) => {
  const resp = await apiClient.get<IBoardResp[]>(`/boardsSet/${userId}`);
  return resp.data;
};

export const api = {
  signIn,
  signUp,
  signOut,
  getUser,
  updateUser,
  deleteUser,
  getAllUserBoards
};
