import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TranslationKeys } from './enum';
import { useTranslation } from 'react-i18next';
import useAppSelector from '../../../hooks/useAppSelector';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import { IColumnResp } from '../../../api/models/columns';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createColumn, getColumns } from '../../../redux/columnsSlice';
import { showLoader, hideLoader } from '../../../redux/appSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';

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

type Props = {
  boardId?: string;
};

const Columns = ({ boardId }: Props) => {
  const columns = useAppSelector((state) => state.columns.columns);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const { addColumn } = TranslationKeys;
  const { successCreateColumn, fail } = ToastTranslations;

  const btnHeight = 40;

  const addColumnHandler = async () => {
    if (boardId) {
      dispatch(showLoader());
      try {
        await dispatch(createColumn({ title: 'Test title', boardId })).unwrap();
        await dispatch(getColumns(boardId)).unwrap();
        dispatch(
          openToast({
            message: t(successCreateColumn, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch {
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      } finally {
        dispatch(hideLoader());
      }
    }
  };

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
