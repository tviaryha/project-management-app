import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LinearLoadingIndicator from '../../../components/LinearLoadingIndicator';
import { ErrorCodes, LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { loadUserBoards } from '../../../redux/boardsListSlice';

const Main = () => {
  useCloseMenu();

  const { isLoading, boards } = useAppSelector((state) => state.boardsList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUserBoards = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        await dispatch(loadUserBoards(userId)).unwrap();
      } catch (e) {
        if (e === ErrorCodes.NOT_FOUND) {
          navigate(Paths.error);
        }
      }
    }
  };
  useEffect(() => {
    getUserBoards();
  }, []);

  if (isLoading) {
    return <LinearLoadingIndicator />;
  }
  return <Grid container component="section" justifyContent="space-evenly" gap="20px"></Grid>;
};

export default Main;
