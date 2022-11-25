import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorCodes, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { hideLoader, showLoader } from '../../../redux/appSlice';
import { clearBoard, getBoard } from '../../../redux/boardSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { TranslationKeys } from './enum';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';

const Board = () => {
  const { title, isLoading } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const { mainPageBtn } = TranslationKeys;
  const { fail } = ToastTranslations;

  const mainPageBtnHandler = () => navigate(Paths.mainPage);

  const loadBoard = async () => {
    if (id) {
      dispatch(showLoader());
      try {
        await dispatch(getBoard(id)).unwrap();
      } catch (eCode) {
        if (eCode === ErrorCodes.NOT_FOUND) {
          navigate(Paths.error);
        }
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  useEffect(() => {
    loadBoard();
    return () => {
      dispatch(clearBoard());
    };
  }, []);

  return isLoading ? null : (
    <Grid container flexDirection="column" gap={2} component="section">
      <Grid
        item
        alignSelf="flex-start"
        component={Button}
        variant="outlined"
        onClick={mainPageBtnHandler}>
        {t(mainPageBtn)}
      </Grid>
      <Grid item component={Typography} variant="h5">
        {title}
      </Grid>
    </Grid>
  );
};

export default Board;
