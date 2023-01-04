import { Box, Button, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorCodes, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { hideLoader, showLoader } from '../../../redux/appSlice';
import { clearBoard, getBoard } from '../../../redux/boardSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { DndTypes, TranslationKeys } from './enums';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import Columns from './Columns/Columns';
import {
  clearColumns,
  getColumns,
  setColumns,
  setTasks,
  updateSetOfColumns,
  updateSetOfTasks
} from '../../../redux/columnsSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { mapItemsByOrder, reorder } from '../../../utils/utils';
import { UpdateColumnsOrderReq } from '../../../api/models/columns';
import { useEffect } from 'react';
import { UpdateTasksOrderReq } from '../../../api/models/tasks';
import { updateTask } from '../../../redux/taskSlice';

const Board = () => {
  const { title } = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.columns.columns);
  const tasks = useAppSelector((state) => state.columns.tasks);
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

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    if (type === DndTypes.columns) {
      const items = reorder(columns, source.index, destination.index);
      const orderedItems = mapItemsByOrder(items);

      dispatch(setColumns(orderedItems));

      const setOfColumns = orderedItems.reduce<UpdateColumnsOrderReq>((prev, curr) => {
        prev.push({ _id: curr._id, order: curr.order });
        return prev;
      }, []);

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
    } else {
      if (source.droppableId === destination.droppableId) {
        const columnId = source.droppableId;
        const columnTasks = tasks[columnId];
        const items = reorder(columnTasks, source.index, destination.index);
        const orderedItems = mapItemsByOrder(items);

        dispatch(setTasks({ columnId, tasks: orderedItems }));

        const setOfTasks = orderedItems.reduce<UpdateTasksOrderReq>((prev, curr) => {
          prev.push({ _id: curr._id, order: curr.order, columnId });
          return prev;
        }, []);

        dispatch(showLoader());
        try {
          await dispatch(updateSetOfTasks({ columnId, tasks: setOfTasks })).unwrap();
        } catch {
          dispatch(
            openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
          );
        } finally {
          dispatch(hideLoader());
        }
      } else {
        const startColumnId = source.droppableId;
        const finishColumnId = destination.droppableId;

        const startColumnTasks = [...tasks[startColumnId]];
        const finishColumnTasks = [...tasks[finishColumnId]];

        const [removedTask] = startColumnTasks.splice(source.index, 1);

        finishColumnTasks.splice(destination.index, 0, removedTask);

        const orderedStartColumnTasks = mapItemsByOrder(startColumnTasks);
        const orderedFinishColumnTasks = mapItemsByOrder(finishColumnTasks);

        dispatch(setTasks({ columnId: startColumnId, tasks: orderedStartColumnTasks }));
        dispatch(setTasks({ columnId: finishColumnId, tasks: orderedFinishColumnTasks }));

        const setOfStartColumnTasks = orderedStartColumnTasks.reduce<UpdateTasksOrderReq>(
          (prev, curr) => {
            prev.push({ _id: curr._id, order: curr.order, columnId: startColumnId });
            return prev;
          },
          []
        );

        const setOfFinishColumnTasks = orderedFinishColumnTasks.reduce<UpdateTasksOrderReq>(
          (prev, curr) => {
            prev.push({ _id: curr._id, order: curr.order, columnId: finishColumnId });
            return prev;
          },
          []
        );

        dispatch(showLoader());
        try {
          if (setOfStartColumnTasks.length) {
            await dispatch(
              updateSetOfTasks({ columnId: startColumnId, tasks: setOfStartColumnTasks })
            ).unwrap();
          } else {
            if (boardId) {
              await dispatch(
                updateTask({
                  boardId,
                  columnId: startColumnId,
                  _id: removedTask._id,
                  title: removedTask.title,
                  order: destination.index,
                  description: removedTask.description,
                  userId: removedTask.userId,
                  users: removedTask.users,
                  newColumnId: finishColumnId
                })
              ).unwrap();
            }
          }

          await dispatch(
            updateSetOfTasks({ columnId: finishColumnId, tasks: setOfFinishColumnTasks })
          ).unwrap();
        } catch {
          dispatch(
            openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
          );
        } finally {
          dispatch(hideLoader());
        }
      }
    }
  };

  return title ? (
    <>
      <Button variant="outlined" onClick={mainPageBtnHandler} sx={{ my: 1 }}>
        {t(mainPageBtn)}
      </Button>
      <Box component="section">
        <Typography variant="h5" my={1}>
          {title}
        </Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Columns />
        </DragDropContext>
      </Box>
    </>
  ) : null;
};

export default Board;
