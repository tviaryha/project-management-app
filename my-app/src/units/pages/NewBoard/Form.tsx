import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateBoardReq } from '../../../api/models/boards';
import { FormTranslationKeys, LocalStorageKeys } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { closeModal, createBoard, toggleLoader } from '../../../redux/newBoardSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import DefaultSelect from './DefaultSelect';
import { TranslationKeys } from './enum';

const Form = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ICreateBoardReq>({
    defaultValues: {
      title: '',
      users: []
    }
  });

  const { requiredE } = FormTranslationKeys;
  const { title, users, createBtn } = TranslationKeys;
  const { successCreateBoard, fail } = ToastTranslations;

  const { t } = useTranslation([TranslationKeys.ns, FormTranslationKeys.ns, ToastTranslations.ns]);

  const onSubmit = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      const { title, users } = getValues();
      const params = { title, owner: userId, users: [...users, userId] };
      try {
        dispatch(toggleLoader());
        await dispatch(createBoard(params)).unwrap();
        dispatch(
          openToast({
            message: t(successCreateBoard, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch (e) {
        const eMessage = t(fail, { ns: ToastTranslations.ns });
        dispatch(openToast({ message: eMessage, type: RespRes.error }));
      } finally {
        dispatch(closeModal());
        dispatch(toggleLoader());
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
        label={t(title)}
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
      <DefaultSelect {...register(users)} />
      <Button type="submit" variant="contained" fullWidth sx={{ maxWidth: '25ch' }}>
        {t(createBtn)}
      </Button>
    </Grid>
  );
};

export default Form;
