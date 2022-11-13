import axios from 'axios';
import { ISignIn, ISignInResp, ISignUp, ISignUpResp } from './models/AuthInterfaces';

const BASE_URL = 'https://final-task-backend-production-b324.up.railway.app';

const apiClient = axios.create({
  baseURL: BASE_URL
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (config?.headers && token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

const signIn = async (data: ISignIn) => {
  const resp = await apiClient.post<ISignInResp>(`${BASE_URL}/auth/signin`, data);
  localStorage.setItem('token', resp.data.token);
  return resp.data.token;
};
const signUp = async (data: ISignUp) => {
  const resp = await apiClient.post<ISignUpResp>(`${BASE_URL}/auth/signup`, data);
  return resp.data;
};

export const api = {
  signIn,
  signUp
};
