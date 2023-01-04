import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { closeToast, IToastState } from '../../redux/toastSlice';

export const Toast: FC<IToastState> = (result) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeToast());
  return (
    <Snackbar open={result.isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity={result.type} sx={{ width: '100%' }}>
        {result.message}
      </Alert>
    </Snackbar>
  );
};
