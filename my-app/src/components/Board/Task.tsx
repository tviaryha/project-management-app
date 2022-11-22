import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { ITask } from '../types';
import useAppDispatch from '../../hooks/useAppDispatch';
//Вернуть мэин как было

const Task = ({ title, description, _id, columnId, boardId }: ITask): JSX.Element => {
  const dispatch = useAppDispatch();

  const deleteListItem = useCallback((boardId: string, columnId: string, _id: string) => {
    console.log(boardId, columnId, _id);
    //дописать функцию удаления таска из списка
  }, []);

  return (
    <ListItem
      sx={{
        width: '100%',
        maxWidth: 300,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        cursor: 'pointer'
      }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteListItem(boardId, columnId, _id)}>
          <DeleteIcon />
        </IconButton>
      }>
      <ListItemText primary={title} secondary={description.length ? description : null} />
    </ListItem>
  );
};

export default Task;
