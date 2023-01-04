import { Grid, IconButton } from '@mui/material';
import useAppDispatch from '../../../../../hooks/useAppDispatch';
import { updateColumn } from '../../../../../redux/columnsSlice';
import { openToast, RespRes } from '../../../../../redux/toastSlice';
import { TranslationKeys as ToastTranslations } from '../../../../Toast/enum';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormTranslationKeys } from '../../../../../enums';
import { TextField } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { hideLoader, showLoader } from '../../../../../redux/appSlice';
import { green, red } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { ITitleFormProps } from './types';

const Form = ({ title, _id, order, toggleShouldShowTitle, setNewTitle }: ITitleFormProps) => {
  const { id: boardId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { successChangeTitle, fail } = ToastTranslations;
  const { title: titleTK, requiredE } = FormTranslationKeys;
  const { t } = useTranslation([ToastTranslations.ns, FormTranslationKeys.ns]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<{ title: string }>({
    defaultValues: {
      title
    }
  });

  const onSubmit = async () => {
    const newTitle = getValues().title;
    toggleShouldShowTitle();

    if (boardId && newTitle !== title) {
      dispatch(showLoader());
      try {
        await dispatch(updateColumn({ title: newTitle, boardId, _id, order })).unwrap();
        setNewTitle(newTitle);
        dispatch(
          openToast({
            message: t(successChangeTitle, { ns: ToastTranslations.ns }),
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
    <Grid container flexWrap="nowrap" component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        item
        component={TextField}
        defaultValue={title}
        id="title"
        label={t(titleTK, FormTranslationKeys)}
        variant="outlined"
        required
        type="text"
        error={!!errors.title}
        helperText={t(errors.title?.message || '', FormTranslationKeys)}
        size="small"
        flexDirection="column"
        flexShrink={1}
        {...register(titleTK, {
          required: { value: true, message: requiredE }
        })}
      />
      <Grid item flexShrink={0} m="7px 0 0 7px">
        <IconButton type="submit" sx={{ p: 0, color: green[500] }}>
          <CheckCircleOutlineRoundedIcon />
        </IconButton>
        <IconButton onClick={toggleShouldShowTitle} sx={{ p: 0, color: red[500] }}>
          <HighlightOffIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Form;
