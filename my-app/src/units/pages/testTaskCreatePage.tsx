//this page should be deleted after implementstion of board details page

import { Button } from '@mui/material';
import useAppDispatch from '../../hooks/useAppDispatch';
import { openModal } from '../../redux/newTaskSlice';
import NewTaskModal from '../NewTask/NewTask';

export const AddNewTask = () => {
  const dispatch = useAppDispatch();
  const columnId = '638357234555393b78993e42';
  const onClick = () => {
    dispatch(openModal(columnId));
  };

  return (
    <>
      <NewTaskModal columnId={columnId} />
      <Button variant="contained" onClick={onClick}>
        add Task
      </Button>
    </>
  );
};
