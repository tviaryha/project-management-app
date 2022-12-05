import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { listItemStyle } from './style';
import { Draggable } from 'react-beautiful-dnd';
import { openDeleteTaskModal, openEditTaskModal } from '../../redux/taskSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ITaskResp } from '../../api/models/tasks';

interface IProps extends ITaskResp {
  index: number;
}

const Task = ({
  _id,
  title,
  order,
  boardId,
  columnId,
  description,
  userId,
  users,
  index
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const deleteTask = () => dispatch(openDeleteTaskModal({ boardId, columnId, taskId: _id }));

  const editTask = () =>
    dispatch(
      openEditTaskModal({
        boardId,
        columnId,
        _id,
        description,
        order,
        title,
        userId,
        users
      })
    );

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
            <IconButton key="edit" aria-label="edit" size="small" onClick={editTask}>
              <EditIcon fontSize="small" />
            </IconButton>,
            <IconButton
              key="delete"
              aria-label="delete"
              size="small"
              edge="end"
              onClick={deleteTask}>
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
