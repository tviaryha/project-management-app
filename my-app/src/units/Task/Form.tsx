import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateTaskParamResp } from '../../api/models/task';
import { IUpdateTask } from '../../api/models/tasks';
import { FormTranslationKeys } from '../../enums';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getTasks } from '../../redux/columnsSlice';
import { closeEditTaskModal, toggleIsLoading, updateTask } from '../../redux/taskSlice';
import { openToast, RespRes } from '../../redux/toastSlice';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import DefaultSelect from './DefaultSelect';
import { TranslationKeys } from './enum';

const Form = () => {
  const { boardId, columnId, taskId, title, order, description, userId } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ICreateTaskParamResp>({
    defaultValues: {
      title,
      description,
      users: []
    }
  });

  const { requiredE } = FormTranslationKeys;
  const { title: titleTK, users: usersTK, editBtn, description: descriptionTK } = TranslationKeys;
  const { successEditTask, fail } = ToastTranslations;

  const { t } = useTranslation([TranslationKeys.ns, FormTranslationKeys.ns, ToastTranslations.ns]);

  const onSubmit = async () => {
    const { title, description, users } = getValues();
    const params: IUpdateTask = {
      title,
      order,
      description,
      userId,
      users: [...users],
      columnId,
      boardId,
      _id: taskId
    };
    try {
      dispatch(toggleIsLoading());
      await dispatch(updateTask(params)).unwrap();
      await dispatch(getTasks({ boardId, columnId })).unwrap();
      dispatch(
        openToast({
          message: t(successEditTask, { ns: ToastTranslations.ns }),
          type: RespRes.success
        })
      );
    } catch {
      dispatch(openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error }));
    } finally {
      dispatch(toggleIsLoading());
      dispatch(closeEditTaskModal());
    }
  };

  return (
    <>
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
          label={t(titleTK)}
          variant="outlined"
          required
          type="text"
          fullWidth
          error={!!errors.title}
          helperText={t(errors.title?.message || '', FormTranslationKeys)}
          {...register(titleTK, {
            required: { value: true, message: requiredE }
          })}
        />
        <TextField
          id="description"
          label={t(descriptionTK)}
          variant="outlined"
          required
          type="text"
          fullWidth
          error={!!errors.description}
          helperText={t(errors.description?.message || '', FormTranslationKeys)}
          {...register(descriptionTK, {
            required: { value: true, message: requiredE }
          })}
        />
        <DefaultSelect {...register(usersTK)} />
        <Button type="submit" variant="contained" fullWidth sx={{ maxWidth: '25ch' }}>
          {t(editBtn)}
        </Button>
      </Grid>
    </>
  );
};

export default Form;
