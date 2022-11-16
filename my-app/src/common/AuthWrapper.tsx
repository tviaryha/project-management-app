import { FC, PropsWithChildren, useEffect } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import { setIsSignedIn } from '../redux/signInSlice';

export const AuthWrapper: FC<PropsWithChildren> = (props) => {
  const dispatch = useAppDispatch();
  const userToken = localStorage.getItem('token');
  useEffect(() => {
    dispatch(setIsSignedIn(!!userToken));
  }, [userToken, dispatch]);
  return <>{props.children}</>;
};
