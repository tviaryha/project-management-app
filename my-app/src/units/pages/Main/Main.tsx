import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { showLoader, hideLoader } from '../../../redux/appSlice';
import { loadUserBoards } from '../../../redux/boardsListSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { TranslationKeys } from '../../Toast/enum';

export enum BoardsListTranslations {
  ns = 'boardsList',
  noBoards = 'noBoards'
}

const Main = () => {
  useCloseMenu();
  const { noBoards } = BoardsListTranslations;
  const { fail } = TranslationKeys;
  const { t } = useTranslation([BoardsListTranslations.ns, TranslationKeys.ns]);

  const { boards } = useAppSelector((state) => state.boardsList);
  const dispatch = useAppDispatch();

  const getUserBoards = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        dispatch(showLoader());
        await dispatch(loadUserBoards(userId)).unwrap();
      } catch (error) {
        const errorMesage = t(fail, { ns: TranslationKeys.ns });
        dispatch(openToast({ message: errorMesage, type: RespRes.error }));
      } finally {
        dispatch(hideLoader());
      }
    }
  };
  useEffect(() => {
    getUserBoards();
  }, []);

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
