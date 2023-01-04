import { useForm } from 'react-hook-form';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { createColumn, getColumns } from '../../../../redux/columnsSlice';
import { openToast, RespRes } from '../../../../redux/toastSlice';
import { TranslationKeys as ToastTranslations } from '../../../Toast/enum';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormTranslationKeys } from '../../../../enums';
import { TranslationKeys } from '../enums';
import { Grid, TextField, Button } from '@mui/material';
import { IColumnResp } from '../../../../api/models/columns';

const Form = ({ order }: Pick<IColumnResp, 'order'>) => {
  const { id: boardId } = useParams();

  const dispatch = useAppDispatch();

  const { successCreateColumn, fail } = ToastTranslations;
  const { title, requiredE } = FormTranslationKeys;
  const { addFormBtn } = TranslationKeys;
  const { t } = useTranslation([ToastTranslations.ns, FormTranslationKeys.ns, TranslationKeys.ns]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<{ title: string }>({
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = async () => {
    if (boardId) {
      try {
        await dispatch(createColumn({ title: getValues().title, boardId, order })).unwrap();
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
      }
    }
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      flexDirection="column"
      alignItems="center"
      gap={3}>
      <TextField
        id="title"
        label={t(title, FormTranslationKeys)}
        variant="outlined"
        required
        type="text"
        fullWidth
        error={!!errors.title}
        helperText={t(errors.title?.message || '', FormTranslationKeys)}
        {...register(title, {
          required: { value: true, message: requiredE }
        })}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ maxWidth: '25ch' }}>
        {t(addFormBtn, TranslationKeys)}
      </Button>
    </Grid>
  );
};

export default Form;
