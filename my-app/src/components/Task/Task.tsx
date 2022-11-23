import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ITask, IDeleteTask } from './types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './types';
import { modalStyle } from './style';

//Вернуть мэин как было

const Task = ({ title, description, _id, columnId, boardId }: ITask): JSX.Element => {
  const { modalTitle, buttonDelete, buttonCancel } = TaskTranslationKeys;
  const { t } = useTranslation([TaskTranslationKeys.ns]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const dispatch = useAppDispatch();

  const deleteTask = useCallback(({ _id, columnId, boardId }: IDeleteTask) => {
    console.log(boardId, columnId, _id);
    //дописать функцию удаления таска из списка
  }, []);

  return (
    <>
      <ListItem
        sx={{
          width: '100%',
          maxWidth: 300,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 1,
          cursor: 'pointer',
          wordWrap: 'break-word'
        }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        }>
        <ListItemText primary={title} secondary={description.length ? description : null} />
      </ListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
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
              onClick={() => deleteTask({ _id, columnId, boardId })}>
              {t(buttonDelete)}
            </Button>
            <Button variant="contained" onClick={handleClose}>
              {t(buttonCancel)}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
