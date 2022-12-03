import { Paper, Button, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Sizes, TranslationKeys } from '../enums';
import AddIcon from '@mui/icons-material/Add';
import Title from './Title/Title';
import { Draggable } from 'react-beautiful-dnd';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks, setIsColumnsLoaded } from '../../../../redux/columnsSlice';
import { TasksResp } from '../../../../api/models/tasks';
import Task from '../../../../components/Task/Task';
import useAppSelector from '../../../../hooks/useAppSelector';
import { hideLoader } from '../../../../redux/appSlice';
import { hideLoader as hideTaskLoader } from '../../../../redux/newTaskSlice';
import NewTaskModal from '../../../NewTask/NewTask';

type Props = {
  title: string;
  index: number;
  _id: string;
};

const Column = ({ title, _id: columnId, index }: Props) => {
  const [tasks, setTasks] = useState<TasksResp>([]);
  const [shouldRerenderTasks, setShouldRerenderTasks] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { id: boardId } = useParams();

  const { columns, isColumnsLoaded } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns]);
  const { addTask } = TranslationKeys;

  const setShouldRerenderTasksToTrue = () => setShouldRerenderTasks(true);

  const onClick = () => setIsModalOpen(true);

  const loadTasks = async () => {
    if (boardId) {
      const tasksResp = await dispatch(getTasks({ boardId, columnId })).unwrap();
      setTasks(tasksResp);
    }

    if (index === columns.length - 1) {
      dispatch(setIsColumnsLoaded(true));
      dispatch(hideLoader());
    }
  };

  const updateTasks = async () => {
    if (boardId) {
      try {
        const tasksResp = await dispatch(getTasks({ boardId, columnId })).unwrap();
        setTasks(tasksResp);
      } catch {
        console.log('e');
      } finally {
        dispatch(hideTaskLoader());
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    if (shouldRerenderTasks) {
      updateTasks();
      setShouldRerenderTasks(false);
    }
  }, [shouldRerenderTasks]);

  useEffect(() => {
    loadTasks();
  }, []);

  return isColumnsLoaded && boardId ? (
    <>
      <Draggable draggableId={columnId} index={index}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              width: Sizes.COLUMN_WIDTH,
              height: 'fit-content',
              maxHeight: '100%',
              border: '1px solid red',
              mr: 2,
              p: 1
            }}>
            <Title title={title} _id={columnId} order={index} />
            <List
              sx={{
                maxHeight: '470px',
                overflowY: 'auto'
              }}>
              {tasks.map((task) => {
                if (boardId) {
                  return (
                    <Task
                      key={task._id}
                      _id={task._id}
                      boardId={boardId}
                      columnId={columnId}
                      description={task.description}
                      title={task.title}
                    />
                  );
                }
              })}
            </List>
            <Button fullWidth startIcon={<AddIcon />} onClick={onClick}>
              {t(addTask)}
            </Button>
          </Paper>
        )}
      </Draggable>
      {isModalOpen && (
        <NewTaskModal
          isOpen={isModalOpen}
          boardId={boardId}
          columnId={columnId}
          setIsModalOpen={setIsModalOpen}
          setShouldRerenderTasksToTrue={setShouldRerenderTasksToTrue}
        />
      )}
    </>
  ) : null;
};

export default Column;
