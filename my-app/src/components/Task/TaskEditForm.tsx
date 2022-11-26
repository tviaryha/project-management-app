import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ITask, IEditTaskProps } from './types';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './types';
import { modalStyle } from './style';
import useAppDispatch from '../../hooks/useAppDispatch';
import TextField from '@mui/material/TextField';

const TaskEditForm = ({
  title,
  description,
  _id,
  columnId,
  boardId,
  closeModal
}: IEditTaskProps): JSX.Element => {
  const { t } = useTranslation([TaskTranslationKeys.ns]);
  const dispatch = useAppDispatch();
  const { helperTextTitle, helperTextDescription, buttonEdit, buttonClose } = TaskTranslationKeys;

  const editTask = useCallback(({ title, description, _id, columnId, boardId }: ITask) => {
    console.log(boardId, columnId, _id);
    //TODO: дописать функцию удаления таска из списка
  }, []);

  return (
    <Box sx={modalStyle}>
      <TextField
        id="helper-title"
        label={t(helperTextTitle)}
        defaultValue={title}
        multiline
        variant="standard"
        type="text"
        sx={{
          width: '100%'
        }}
      />
      <TextField
        id="helper-description"
        label={t(helperTextDescription)}
        defaultValue={description}
        multiline
        variant="standard"
        type="text"
        sx={{
          width: '100%'
        }}
      />
      <Stack direction="row" justifyContent="space-around">
        <Button
          variant="contained"
          color="success"
          onClick={() => editTask({ title, description, _id, columnId, boardId })}>
          {t(buttonEdit)}
        </Button>
        <Button variant="contained" onClick={closeModal}>
          {t(buttonClose)}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskEditForm;
