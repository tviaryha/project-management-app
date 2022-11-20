import { Backdrop, CircularProgress } from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';

export const Loader = () => {
  const isLoading = useAppSelector((state) => state.app.isLoaderVisible);

  return isLoading ? (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : null;
};
