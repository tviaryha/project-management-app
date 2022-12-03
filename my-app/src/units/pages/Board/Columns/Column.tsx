import { Paper, Button, List, Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DndTypes, Sizes, TranslationKeys } from '../enums';
import AddIcon from '@mui/icons-material/Add';
import Title from './Title/Title';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks, setIsColumnsLoaded } from '../../../../redux/columnsSlice';
import useAppSelector from '../../../../hooks/useAppSelector';
import { hideLoader } from '../../../../redux/appSlice';
import { openModal } from '../../../../redux/newTaskSlice';
import Task from '../../../Task/Task';
import { blue } from '@mui/material/colors';

type Props = {
  title: string;
  index: number;
  _id: string;
};

const Column = ({ title, _id: columnId, index }: Props) => {
  const { id: boardId } = useParams();

  const { columns, isColumnsLoaded } = useAppSelector((state) => state.columns);
  const tasks = useAppSelector((state) => state.columns.tasks[columnId]);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns]);
  const { addTask } = TranslationKeys;

  const onClick = useCallback(() => {
    if (boardId) {
      dispatch(openModal({ boardId, columnId }));
    }
  }, [boardId, columnId, dispatch]);

  const loadTasks = async () => {
    if (boardId) {
      await dispatch(getTasks({ boardId, columnId })).unwrap();
    }

    if (index === columns.length - 1) {
      dispatch(setIsColumnsLoaded(true));
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return isColumnsLoaded && boardId ? (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <Paper
          elevation={0}
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            border: `2px solid ${blue[100]}`,
            width: Sizes.COLUMN_WIDTH,
            height: 'fit-content',
            maxHeight: '100%',
            mr: 2,
            p: 1
          }}>
          <Title title={title} _id={columnId} order={index} provided={provided} />

          <Droppable droppableId={columnId} type={DndTypes.tasks}>
            {(provided, snapshot) => (
              <Box
                sx={{
                  borderRadius: '5px',
                  bgcolor: snapshot.isDraggingOver ? blue[100] : 'background.paper',
                  maxHeight: '470px',
                  overflow: 'auto',
                  my: 1
                }}>
                <Grid
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  container
                  flexDirection="column"
                  alignItems="center"
                  component={List}>
                  {tasks &&
                    tasks.map((task, index) => {
                      if (boardId) {
                        return (
                          <Task
                            key={task._id}
                            index={index}
                            title={task.title}
                            description={task.description}
                            _id={task._id}
                            columnId={columnId}
                            boardId={boardId}
                            editTask={() => console.log('edit')}
                            deleteTask={() => console.log('delete')}
                          />
                        );
                      }
                    })}
                </Grid>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Button fullWidth startIcon={<AddIcon />} onClick={onClick}>
            {t(addTask)}
          </Button>
        </Paper>
      )}
    </Draggable>
  ) : null;
};

export default Column;
