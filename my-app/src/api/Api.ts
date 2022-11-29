import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios from 'axios';
import { setIsSignedIn } from '../redux/signInSlice';
import { ISignIn, ISignInResp, IUserReq, IUserResp, IUsersResp } from './models/users';
import jwt_decode from 'jwt-decode';
import { IDecodedToken } from './interface';
import { LocalStorageKeys } from '../enums';
import { ICreateTaskReq, ICreateTaskResp } from './models/task';
import { IBoardReq, IBoardResp } from './models/boards';
import {
  ColumnDelete,
  ColumnsResp,
  IColumnReq,
  IColumnResp,
  IColumnUpdate
} from './models/columns';

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

const getUsers = async () => {
  const resp = await apiClient<IUsersResp>({
    url: '/users'
  });
  return resp.data;
};

const getAllUserBoards = async (userId: string) => {
  const resp = await apiClient.get<IBoardResp[]>(`/boardsSet/${userId}`);
  return resp.data;
};

const createBoard = async (params: IBoardReq) => {
  const resp = await apiClient.post<IBoardResp>('/boards', params);
  return resp.data;
};

const deleteBoard = async (boardId: string) => {
  await apiClient.delete(`/boards/${boardId}`);
};

const getBoard = async (id: string) => {
  const resp = await apiClient<IBoardResp>(`/boards/${id}`);
  return resp.data;
};

const getColumns = async (id: string) => {
  const resp = await apiClient<ColumnsResp>(`/boards/${id}/columns`);
  return resp.data;
};

const createColumn = async ({ title, boardId, order = 0 }: IColumnReq) => {
  const resp = await apiClient.post<IColumnResp>(`/boards/${boardId}/columns`, {
    title,
    order
  });
  return resp.data;
};

const updateColumn = async ({ title, _id, boardId, order = 0 }: IColumnUpdate) => {
  const resp = await apiClient.put<IColumnResp>(`/boards/${boardId}/columns/${_id}`, {
    title,
    order
  });
  return resp.data;
};

const deleteColumn = async ({ boardId, _id }: ColumnDelete) => {
  await apiClient.delete(`/boards/${boardId}/columns/${_id}`);
};

const createTask = async (params: ICreateTaskReq) => {
  const resp = await apiClient.post<ICreateTaskResp>(
    `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
    params.data
  );
  return resp.data;
};

export const api = {
  signIn,
  signUp,
  signOut,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  createBoard,
  getAllUserBoards,
  deleteBoard,
  getBoard,
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  createTask
};
