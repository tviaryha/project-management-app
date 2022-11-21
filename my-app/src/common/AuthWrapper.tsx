import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import { LocalStorageKeys, Paths } from '../enums';
import useAppDispatch from '../hooks/useAppDispatch';
import useCheckToken from '../hooks/useCheckToken';

export const SignedInUser = () => {
  const location = useLocation();
  const isSignedIn = useAppSelector((state) => state.signIn.isSignedIn);
  const dispatch = useAppDispatch();
  const checkToken = useCheckToken();

  useEffect(() => {
    checkToken();
  }, [location, isSignedIn, dispatch, checkToken]);

  return isSignedIn ? <Outlet /> : <Navigate to={Paths.base} />;
};

export const AnonimUser = () => {
  const userToken = localStorage.getItem(LocalStorageKeys.token);
  return userToken ? <Navigate to={Paths.mainPage} /> : <Outlet />;
};
