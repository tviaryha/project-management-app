import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IDeleteTask, IDeleteTaskProps } from './types';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './types';
import { modalStyle } from './style';

const TaskDeleteForm = ({
  title,
  _id,
  columnId,
  boardId,
  closeModal
}: IDeleteTaskProps): JSX.Element => {
  const { t } = useTranslation([TaskTranslationKeys.ns]);
  const { modalTitle, buttonDelete, buttonCancel } = TaskTranslationKeys;

  const deleteTask = useCallback(({ title, _id, columnId, boardId }: IDeleteTask) => {
    console.log(boardId, columnId, _id, title);
    //TODO: дописать функцию удаления таска из списка
  }, []);

  return (
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t(modalTitle)}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: 'break-word' }}>
        {title}
      </Typography>
      <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteTask({ title, _id, columnId, boardId })}>
          {t(buttonDelete)}
        </Button>
        <Button variant="contained" onClick={closeModal}>
          {t(buttonCancel)}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskDeleteForm;
