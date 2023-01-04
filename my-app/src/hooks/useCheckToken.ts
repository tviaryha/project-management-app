import { IDecodedToken } from '../api/interface';
import { LocalStorageKeys } from '../enums';
import { signOut, setIsSignedIn } from '../redux/signInSlice';
import useAppDispatch from './useAppDispatch';
import jwt_decode from 'jwt-decode';

const useCheckToken = () => {
  const dispatch = useAppDispatch();

  return () => {
    const userToken = localStorage.getItem(LocalStorageKeys.token);
    const tokenExpDate = userToken ? jwt_decode<IDecodedToken>(userToken).exp : 0;
    const isTokenValid = tokenExpDate * 1000 > Date.now();

    if (!isTokenValid) {
      dispatch(signOut());
    }

    dispatch(setIsSignedIn(isTokenValid));
  };
};

export default useCheckToken;
