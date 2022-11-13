import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { closeToast } from '../../redux/toastSlice';

interface IToastProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
}

export const Toast: FC<IToastProps> = (result) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeToast());
  return (
    <Snackbar open={result.isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={result.type} sx={{ width: '100%' }}>
        {result.message}
      </Alert>
    </Snackbar>
  );
};
