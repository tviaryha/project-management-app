import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { ICurrentTaskProps } from './types';
import { listItemStyle } from './style';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({
  title,
  description,
  _id,
  columnId,
  boardId,
  index,
  editTask,
  deleteTask
}: ICurrentTaskProps): JSX.Element => {
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="listItemTask"
          sx={listItemStyle}
          secondaryAction={[
            <IconButton
              key="edit"
              aria-label="edit"
              size="small"
              onClick={() => editTask(boardId, columnId, _id)}>
              <EditIcon fontSize="small" />
            </IconButton>,
            <IconButton
              key="delete"
              aria-label="delete"
              size="small"
              edge="end"
              onClick={() => deleteTask(boardId, columnId, _id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          ]}>
          <ListItemText primary={title} secondary={description.length > 0 ? description : null} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default Task;
