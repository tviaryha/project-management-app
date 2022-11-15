import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import { hideLoader } from '../redux/loaderSlice';

interface ILoader {
  open: boolean;
}

export const Loader: FC<ILoader> = (loadingState) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(hideLoader());
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loadingState.open}
      onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
