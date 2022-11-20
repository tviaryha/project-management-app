import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUserReq } from '../../../api/models/AuthInterfaces';
import { ErrorCodes, FormTranslationKeys, LocalStorageKeys } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { openProfileModal, updateUser } from '../../../redux/profileSlice';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { AuthFieldsNames } from '../../auth/authFieldsNames';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import { TranslationKeys as ProfileTranslationKeys } from './enum';

const ProfileForm = () => {
  const { name: userName, login: userLogin } = useAppSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<IUserReq>({
    defaultValues: {
      name: userName,
      login: userLogin
    }
  });

  const { name, login, password, requiredE, minLength3E, maxLength30E, passwordPatternE } =
    FormTranslationKeys;
  const { saveBtn, deleteBtn } = ProfileTranslationKeys;
  const { successEditProfile, error409, fail } = ToastTranslations;

  const { t } = useTranslation([
    FormTranslationKeys.ns,
    ProfileTranslationKeys.ns,
    ToastTranslations.ns
  ]);

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        const data = getValues();
        await dispatch(updateUser({ userId, data })).unwrap();
        dispatch(
          openToast({
            message: t(successEditProfile, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch (eCode) {
        const eMessage =
          eCode === ErrorCodes.e409
            ? t(error409, { ns: ToastTranslations.ns })
            : t(fail, { ns: ToastTranslations.ns });
        dispatch(openToast({ message: eMessage, type: RespRes.error }));
      }
    }
  };

  const onClick = async () => dispatch(openProfileModal());

  const btnSx = {
    width: '100%',
    maxWidth: '25ch'
  };

  return (
    <Grid
      item
      component="section"
      flexDirection="column"
      alignItems="center"
      sx={{ width: '100%', maxWidth: '50ch' }}>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        flexDirection="column"
        alignItems="center"
        gap={3}>
        <TextField
          id="name"
          label={t(name)}
          variant="outlined"
          required
          type="text"
          sx={{ width: '100%' }}
          error={!!errors.name}
          helperText={t(errors.name?.message || '')}
          {...register(AuthFieldsNames.NAME, {
            required: { value: true, message: requiredE },
            minLength: { value: 3, message: minLength3E },
            maxLength: { value: 30, message: maxLength30E }
          })}
        />

        <TextField
          id="login"
          label={t(login)}
          variant="outlined"
          required
          type="text"
          sx={{ width: '100%' }}
          error={!!errors.login}
          helperText={t(errors.login?.message || '')}
          {...register(AuthFieldsNames.LOGIN, {
            required: { value: true, message: requiredE },
            minLength: { value: 3, message: minLength3E },
            maxLength: { value: 30, message: maxLength30E }
          })}
        />

        <TextField
          id="password"
          label={t(password)}
          variant="outlined"
          required
          type="password"
          sx={{ width: '100%' }}
          error={!!errors.password}
          helperText={t(errors.password?.message || '')}
          {...register(AuthFieldsNames.PASSWORD, {
            validate: (value) =>
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(value) || passwordPatternE,
            required: { value: true, message: requiredE }
          })}
        />

        <Grid container justifyContent="center" gap={2}>
          <Button type="submit" variant="contained" sx={btnSx}>
            {t(saveBtn, ProfileTranslationKeys)}
          </Button>
          <Button variant="contained" onClick={onClick} sx={btnSx}>
            {t(deleteBtn, ProfileTranslationKeys)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileForm;
