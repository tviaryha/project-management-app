import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BoardPreview from '../../../components/BoardPreview/BoardPreview';
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
          <BoardPreview
            title={board.title}
            boardId={board._id}
            key={board._id}
            linkTo={`/${Paths.board}/${board._id}`}
          />
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
