import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LinearLoadingIndicator from '../../../components/LinearLoadingIndicator';
import { BoardsListTarnslations, LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { loadUserBoards } from '../../../redux/boardsListSlice';

const Main = () => {
  useCloseMenu();
  const { noBoards } = BoardsListTarnslations;
  const { t } = useTranslation([BoardsListTarnslations.ns]);

  const { isLoading, boards } = useAppSelector((state) => state.boardsList);
  const dispatch = useAppDispatch();

  const getUserBoards = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      await dispatch(loadUserBoards(userId)).unwrap();
    }
  };
  useEffect(() => {
    getUserBoards();
  }, []);

  if (isLoading) {
    return <LinearLoadingIndicator />;
  }
  return (
    <Grid container component="section" justifyContent="space-evenly" gap="20px" mt={10}>
      {boards.length ? (
        boards.map((board) => (
          <Link key={board._id} to={`/${Paths.board}/${board._id}`}>
            <div>{board.title}</div>
          </Link>
        ))
      ) : (
        <Typography variant="h5" component="h4" mt={50}>
          {t(noBoards)}
        </Typography>
      )}
    </Grid>
  );
};

export default Main;
