import { Box, Button } from '@mui/material';
import { Sizes, TranslationKeys } from '../enums';
import { useTranslation } from 'react-i18next';
import useAppSelector from '../../../../hooks/useAppSelector';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { openModal } from '../../../../redux/columnsSlice';
import AddIcon from '@mui/icons-material/Add';
import Column from './Column';
import { Droppable } from 'react-beautiful-dnd';

const Columns = () => {
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns]);
  const { addColumn } = TranslationKeys;

  const btnHeight = 40;

  const addColumnHandler = async () => dispatch(openModal());

  const sx = {
    display: 'inline-flex',
    width: '100%',
    my: 1,
    overflowX: 'auto'
  };

  return (
    <Droppable direction="horizontal" droppableId="columns">
      {(provided) => (
        <Box sx={sx}>
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: 'inline-flex'
            }}>
            {columns.map((column, index) => (
              <Column key={column._id} title={column.title} _id={column._id} index={index} />
            ))}
            {provided.placeholder}
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={addColumnHandler}
              startIcon={<AddIcon />}
              sx={{ width: Sizes.COLUMN_WIDTH, height: btnHeight, lineHeight: 0 }}>
              {t(addColumn)}
            </Button>
          </Box>
        </Box>
      )}
    </Droppable>
  );
};

export default Columns;
