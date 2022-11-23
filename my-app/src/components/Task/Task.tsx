import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ITask, IDeleteTask } from './types';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './types';
import { modalStyle, listItemStyle } from './style';

//Вернуть мэин как было

const Task = ({ title, description, _id, columnId, boardId }: ITask): JSX.Element => {
  const { modalTitle, buttonDelete, buttonCancel } = TaskTranslationKeys;
  const { t } = useTranslation([TaskTranslationKeys.ns]);
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = React.useState(false);
  const [openTaskEditingModal, setOpenTaskEditingModal] = React.useState(false);
  const handleOpenTaskDeleteModal = () => setOpenTaskDeleteModal(true);
  const handleCloseTaskDeleteModal = () => setOpenTaskDeleteModal(false);
  const handleOpenTaskEditingModal = () => setOpenTaskEditingModal(true);
  const handleCloseTaskEditingModal = () => setOpenTaskEditingModal(false);
  // const dispatch = useAppDispatch();

  const deleteTask = useCallback(({ _id, columnId, boardId }: IDeleteTask) => {
    console.log(boardId, columnId, _id);
    //дописать функцию удаления таска из списка
  }, []);

  const editTask = useCallback(({ title, description, _id, columnId, boardId }: ITask) => {
    console.log(boardId, columnId, _id);
    //дописать функцию редактирования таска
  }, []);

  return (
    <>
      <ListItem
        sx={listItemStyle}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleOpenTaskDeleteModal}>
            <DeleteIcon />
          </IconButton>
        }>
        <ListItemText primary={title} onClick={handleOpenTaskEditingModal} />
      </ListItem>
      <Modal
        open={openTaskEditingModal}
        onClose={handleCloseTaskEditingModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: 'break-word' }}>
            {description}
          </Typography>
          <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => editTask({ title, description, _id, columnId, boardId })}>
              {t(buttonDelete)}
            </Button>
            <Button variant="contained" onClick={handleCloseTaskEditingModal}>
              {t(buttonCancel)}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openTaskDeleteModal}
        onClose={handleCloseTaskDeleteModal}
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
            <Button variant="contained" onClick={handleCloseTaskDeleteModal}>
              {t(buttonCancel)}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
