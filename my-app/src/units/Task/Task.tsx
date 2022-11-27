import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { ICurrentTaskProps } from './types';
import { listItemStyle } from './style';

const Task = ({
  title,
  description,
  _id,
  columnId,
  boardId,
  editTask,
  deleteTask
}: ICurrentTaskProps): JSX.Element => {
  return (
    <>
      <ListItem
        className="listItemTask"
        sx={listItemStyle}
        secondaryAction={[
          <IconButton key="edit" aria-label="edit" onClick={() => editTask(boardId, columnId, _id)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            key="delete"
            aria-label="delete"
            edge="end"
            onClick={() => deleteTask(boardId, columnId, _id)}>
            <DeleteIcon />
          </IconButton>
        ]}>
        <ListItemText primary={title} secondary={description.length > 0 ? description : null} />
      </ListItem>
    </>
  );
};

export default Task;
