import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { closeBurgerMenu } from '../redux/burgerSlice';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useCloseMenu = () => {
  const isOpen = useAppSelector((state) => state.burger.isOpen);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isOpen && isMdScreen) {
      dispatch(closeBurgerMenu());
    }
  }, []);
};

export default useCloseMenu;
