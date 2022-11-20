import { IDecodedToken, setIsSignedIn } from '../redux/signInSlice';
import jwt_decode from 'jwt-decode';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import store from '../redux/store';
import { api } from '../api/Api';
import { useEffect, useState } from 'react';
import useAppSelector from '../hooks/useAppSelector';

export const SignedInUser = () => {
  const location = useLocation();
  const isSignedIn = useAppSelector((state) => state.signIn.isSignedIn);
  const [isTokenValid, setTokenValid] = useState(true);
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const tokenExpDate = userToken ? (jwt_decode(userToken) as IDecodedToken).exp : 0;
    const isTokenValid = tokenExpDate * 1000 > Date.now();
    setTokenValid(isTokenValid);
    if (!isTokenValid) {
      api.signOut();
    }
    store.dispatch(setIsSignedIn(isTokenValid));
  }, [location, isSignedIn]);
  return isTokenValid ? <Outlet /> : <Navigate to="/" />;
};

export const AnonimUser = () => {
  const userToken = localStorage.getItem('token');
  return userToken ? <Navigate to="/mainPage" /> : <Outlet />;
};
