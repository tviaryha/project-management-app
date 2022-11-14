import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toggleBurgerIsOpen } from '../redux/burgerSlice';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useNavItemHandler = (path?: string) => {
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.burger.isOpen);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handler = () => {
    if (path) {
      navigate(path);
    }

    if (isOpen && isMdScreen) {
      dispatch(toggleBurgerIsOpen());
    }
  };

  return handler;
};

export default useNavItemHandler;
