import { Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Sizes, TranslationKeys } from '../enums';
import AddIcon from '@mui/icons-material/Add';
import Title from './Title/Title';
import { Draggable } from 'react-beautiful-dnd';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { openModal } from '../../../../redux/newTaskSlice';

type Props = {
  title: string;
  index: number;
  _id: string;
};

const Column = ({ title, _id, index }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation([TranslationKeys.ns]);
  const { addTask } = TranslationKeys;

  const onClick = () => dispatch(openModal(_id));

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            display: 'inline-block',
            width: Sizes.COLUMN_WIDTH,
            height: 'fit-content',
            mr: 2,
            p: 1
          }}>
          <Title title={title} _id={_id} order={index} />
          <Button fullWidth startIcon={<AddIcon />} onClick={onClick}>
            {t(addTask)}
          </Button>
        </Paper>
      )}
    </Draggable>
  );
};

export default Column;
