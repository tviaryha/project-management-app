import { useEffect } from 'react';
import { setIsSignedIn } from '../redux/signInSlice';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useCheckIsSignedIn = (
  componentForAnAuthUser: JSX.Element,
  componentForAnUnauthUser: JSX.Element
) => {
  const isSignedIn = useAppSelector((state) => state.signIn.isSignedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.getItem('token') ? dispatch(setIsSignedIn(true)) : dispatch(setIsSignedIn(false));
  }, [dispatch]);

  const component = () => (isSignedIn ? componentForAnAuthUser : componentForAnUnauthUser);

  return component;
};

export default useCheckIsSignedIn;
