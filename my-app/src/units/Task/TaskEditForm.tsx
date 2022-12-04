import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IEditProps } from './types';
import { useTranslation } from 'react-i18next';
import { TaskTranslationKeys } from './enum';
import { modalStyle } from './style';
import TextField from '@mui/material/TextField';

const TaskEditForm = ({
  title,
  description,
  _id,
  columnId,
  boardId,
  editTask,
  closeModal
}: IEditProps): JSX.Element => {
  const { t } = useTranslation([TaskTranslationKeys.ns]);
  const { helperTextTitle, helperTextDescription, buttonEdit, buttonClose } = TaskTranslationKeys;

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
          onClick={() => editTask(title, description, _id, columnId, boardId)}>
          {t(buttonEdit)}
        </Button>
        <Button variant="contained" onClick={() => closeModal}>
          {t(buttonClose)}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskEditForm;
