import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TranslationKeys } from '../enum';
import { useTranslation } from 'react-i18next';
import useAppSelector from '../../../../hooks/useAppSelector';
import { IColumnResp } from '../../../../api/models/columns';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { openModal } from '../../../../redux/columnsSlice';

const COLUMN_WIDTH = 250;

const Column = ({ title }: Pick<IColumnResp, 'title'>) => {
  const { t } = useTranslation([TranslationKeys.ns]);
  const { addTask } = TranslationKeys;

  return (
    <Paper
      sx={{
        display: 'inline-block',
        width: COLUMN_WIDTH,
        mr: 2,
        p: 1,
        border: '1px solid red'
      }}>
      <Typography variant="h6">{title}</Typography>
      <Button fullWidth startIcon={<AddIcon />}>
        {t(addTask)}
      </Button>
    </Paper>
  );
};

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
        <Column key={column._id} title={column.title} />
      ))}
      <Button
        onClick={addColumnHandler}
        startIcon={<AddIcon />}
        sx={{ width: COLUMN_WIDTH, height: btnHeight, lineHeight: 0 }}>
        {t(addColumn)}
      </Button>
    </Box>
  );
};

export default Columns;
