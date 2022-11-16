import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../api/Api';
import { ISignIn } from '../api/models/AuthInterfaces';
import { ErrorResponse } from '../api/models/ErrorResponse';
import jwt_decode from 'jwt-decode';

interface IAuthState {
  isSignedIn: boolean;
  error?: string;
  isLoading?: boolean;
  userID?: string;
}

interface IDecodedToken {
  id: string;
  login: string;
  iat: Date;
  exp: Date;
}
const initialState: IAuthState = {
  isSignedIn: false
};

export const signIn = createAsyncThunk('signIn', async (data: ISignIn, thunkApi) => {
  try {
    const resp = await api.signIn(data);
    const decoded: IDecodedToken = jwt_decode(resp);
    return { token: resp, decodedToken: decoded };
  } catch (error) {
    const t = thunkApi.rejectWithValue((<AxiosError<ErrorResponse>>error).response?.data);
    return t;
  }
});

export const signOut = createAction('signOut', () => {
  api.signOut();
  return { payload: undefined };
});

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userID = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.userID = action.payload.decodedToken.id;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = false;
        state.error = (<ErrorResponse>action.payload).message;
      })
      .addCase(signOut, (state) => {
        state.isSignedIn = false;
        state.userID = '';
      });
  }
});

export const { setIsSignedIn } = signInSlice.actions;

export default signInSlice.reducer;
