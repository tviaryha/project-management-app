import { Box, Button } from '@mui/material';
import { Sizes, TranslationKeys } from '../enums';
import { useTranslation } from 'react-i18next';
import useAppSelector from '../../../../hooks/useAppSelector';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { openModal } from '../../../../redux/columnsSlice';
import AddIcon from '@mui/icons-material/Add';
import Column from './Column';

const Columns = () => {
  const columns = useAppSelector((state) => state.columns.columns);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns]);
  const { addColumn } = TranslationKeys;

  const btnHeight = 40;

  const addColumnHandler = async () => dispatch(openModal());

  return (
    <Box my={1} sx={{ display: 'inline-flex' }}>
      {columns.map((column) => (
        <Column key={column._id} title={column.title} _id={column._id} />
      ))}
      <Button
        onClick={addColumnHandler}
        startIcon={<AddIcon />}
        sx={{ width: Sizes.COLUMN_WIDTH, height: btnHeight, lineHeight: 0 }}>
        {t(addColumn)}
      </Button>
    </Box>
  );
};

export default Columns;
