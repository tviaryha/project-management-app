import { Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IColumnResp } from '../../../../api/models/columns';
import { Sizes, TranslationKeys } from '../enums';
import AddIcon from '@mui/icons-material/Add';
import Title from './Title/Title';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { useCallback } from 'react';
import { openModal } from '../../../../redux/newTaskSlice';

const Column = ({ title, _id: columnId }: Pick<IColumnResp, 'title' | '_id'>) => {
  const { t } = useTranslation([TranslationKeys.ns]);
  const { addTask } = TranslationKeys;
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch(openModal(columnId));
  }, [columnId]);

  return (
    <Paper
      sx={{
        display: 'inline-block',
        width: Sizes.COLUMN_WIDTH,
        height: 'fit-content',
        mr: 2,
        p: 1,
        border: '1px solid red'
      }}>
      <Title title={title} columnId={columnId} />
      <Button fullWidth startIcon={<AddIcon />} onClick={onClick}>
        {t(addTask)}
      </Button>
    </Paper>
  );
};

export default Column;
