import { Box, Button, Typography } from '@mui/material';
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
import Columns from './Columns';
import { clearColumns, getColumns } from '../../../redux/columnsSlice';

const Board = () => {
  const { title } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id: boardId } = useParams<{ id: string }>();

  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const { mainPageBtn } = TranslationKeys;
  const { fail } = ToastTranslations;

  const mainPageBtnHandler = () => navigate(Paths.mainPage);

  const loadBoard = async () => {
    if (boardId) {
      dispatch(showLoader());
      try {
        await dispatch(getBoard(boardId)).unwrap();
        await dispatch(getColumns(boardId)).unwrap();
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
      dispatch(clearColumns());
    };
  }, []);

  return title ? (
    <Box component="section" sx={{ overflowX: 'scroll' }}>
      <Button variant="outlined" onClick={mainPageBtnHandler} sx={{ my: 1 }}>
        {t(mainPageBtn)}
      </Button>
      <Typography variant="h5" my={1}>
        {title}
      </Typography>
      <Columns boardId={boardId} />
    </Box>
  ) : null;
};

export default Board;
