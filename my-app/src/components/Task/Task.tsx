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
import { ITask, IDeleteTask } from './types';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './types';
import { modalStyle, listItemStyle } from './styleTask';
import TextField from '@mui/material/TextField';

const Task = ({ title, description, _id, columnId, boardId }: ITask): JSX.Element => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);
  const { t } = useTranslation([TaskTranslationKeys.ns]);

  const {
    modalTitle,
    buttonDelete,
    buttonCancel,
    buttonClose,
    buttonEdit,
    helperTextTitle,
    helperTextDescription
  } = TaskTranslationKeys;

  const toggleTaskDeleteModal = () => setIsOpenDeleteModal((current) => !current);
  const toggleTaskEditModal = () => setIsOpenEditModal((current) => !current);

  const deleteTask = useCallback(({ _id, columnId, boardId }: IDeleteTask) => {
    console.log(boardId, columnId, _id);
    //дописать функцию удаления таска из списка
  }, []);

  const editTask = useCallback(({ title, description, _id, columnId, boardId }: ITask) => {
    console.log(boardId, columnId, _id, title, description);
    //дописать функцию редактирования таска
  }, []);

  return (
    <>
      <ListItem
        className="listItemTask"
        sx={listItemStyle}
        secondaryAction={[
          <IconButton key="edit" aria-label="edit" onClick={toggleTaskEditModal}>
            <EditIcon />
          </IconButton>,
          <IconButton key="delete" aria-label="delete" edge="end" onClick={toggleTaskDeleteModal}>
            <DeleteIcon />
          </IconButton>
        ]}>
        <ListItemText primary={title} secondary={description.length > 0 ? description : null} />
      </ListItem>
      <Modal
        open={isOpenEditModal}
        onClose={toggleTaskEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
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
            <Button variant="contained" onClick={toggleTaskEditModal}>
              {t(buttonClose)}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isOpenDeleteModal}
        onClose={toggleTaskDeleteModal}
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
            <Button variant="contained" onClick={toggleTaskDeleteModal}>
              {t(buttonCancel)}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
