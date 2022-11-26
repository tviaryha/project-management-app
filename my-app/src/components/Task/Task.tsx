import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { ITask, IDeleteTask } from './types';
import { listItemStyle } from './style';
import TransitionsModal from '../../components/TransitionsModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import TaskDeleteForm from './TaskDeleteForm';
import { setIsOpenEditTaskModal, setIsOpenDeleteTaskModal } from '../../redux/taskSlice';
import TaskEditForm from './TaskEditForm';

const Task = ({ title, description, _id, columnId, boardId }: ITask): JSX.Element => {
  const { isOpenEditTaskModal, isOpenDeleteTaskModal, isLoading } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();

  const closeEditTaskModal = () => {
    dispatch(setIsOpenEditTaskModal(false));
  };

  const closeDeleteTaskModal = () => {
    dispatch(setIsOpenDeleteTaskModal(false));
  };

  const deleteTask = useCallback(({ _id, columnId, boardId }: IDeleteTask) => {
    dispatch(setIsOpenDeleteTaskModal(true));
    console.log(boardId, columnId, _id);
    //TODO: дописать функцию удаления таска из списка
  }, []);

  const editTask = useCallback(({ title, description, _id, columnId, boardId }: ITask) => {
    dispatch(setIsOpenEditTaskModal(true));
    console.log(boardId, columnId, _id, title, description);
    //TODO: дописать функцию редактирования таска
  }, []);

  return (
    <>
      <ListItem
        className="listItemTask"
        sx={listItemStyle}
        secondaryAction={[
          <IconButton
            key="edit"
            aria-label="edit"
            onClick={() => editTask({ title, description, _id, columnId, boardId })}>
            <EditIcon />
          </IconButton>,
          <IconButton
            key="delete"
            aria-label="delete"
            edge="end"
            onClick={() => deleteTask({ title, _id, columnId, boardId })}>
            <DeleteIcon />
          </IconButton>
        ]}>
        <ListItemText primary={title} secondary={description.length > 0 ? description : null} />
      </ListItem>
      <TransitionsModal
        isOpen={isOpenDeleteTaskModal}
        handleClose={closeDeleteTaskModal}
        isLoading={isLoading}>
        <TaskDeleteForm
          title={title}
          _id={_id}
          columnId={columnId}
          boardId={boardId}
          closeModal={closeDeleteTaskModal}
        />
      </TransitionsModal>
      <TransitionsModal
        isOpen={isOpenEditTaskModal}
        handleClose={closeEditTaskModal}
        isLoading={isLoading}>
        <TaskEditForm
          title={title}
          description={description}
          _id={_id}
          columnId={columnId}
          boardId={boardId}
          closeModal={closeEditTaskModal}
        />
      </TransitionsModal>
    </>
  );
};

export default Task;
