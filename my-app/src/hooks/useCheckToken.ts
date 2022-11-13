import { useState, useEffect } from 'react';
import useAppSelector from './useAppSelector';

const useCheckToken = (
  componentForAnAuthUser: JSX.Element,
  componentForAnUnauthUser: JSX.Element
) => {
  const token = useAppSelector((state) => state.signIn.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    token ? setIsAuth(true) : setIsAuth(false);
  }, [token]);

  const component = () => (isAuth ? componentForAnAuthUser : componentForAnUnauthUser);

  return component;
};

export default useCheckToken;
