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
import { TranslationKeys } from './enums';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import Columns from './Columns/Columns';
import {
  clearColumns,
  getColumns,
  setColumns,
  updateSetOfColumns
} from '../../../redux/columnsSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { mapColumnsOrder, reorder } from '../../../utils/utils';
import { UpdateColumnsOrderReq } from '../../../api/models/columns';

const Board = () => {
  const { title } = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.columns.columns);
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

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const items = reorder(columns, source.index, destination.index);
    const orderedItems = mapColumnsOrder(items);

    dispatch(setColumns(orderedItems));

    const setOfColumns = orderedItems.reduce<UpdateColumnsOrderReq>((prev, curr) => {
      prev.push({ _id: curr._id, order: curr.order });
      return prev;
    }, []);

    if (boardId) {
      dispatch(showLoader());
      try {
        await dispatch(updateSetOfColumns(setOfColumns)).unwrap();
      } catch {
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  return title ? (
    <Box>
      <Button variant="outlined" onClick={mainPageBtnHandler} sx={{ my: 1 }}>
        {t(mainPageBtn)}
      </Button>
      <Box component="section" sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" my={1}>
          {title}
        </Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Columns />
        </DragDropContext>
      </Box>
    </Box>
  ) : null;
};

export default Board;
