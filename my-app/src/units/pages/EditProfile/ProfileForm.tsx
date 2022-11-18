import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/Api';
import { IUserReq } from '../../../api/models/AuthInterfaces';
import { ErrorResponse } from '../../../api/models/ErrorResponse';
import { FormTranslationKeys, LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { updateUserProfile } from '../../../redux/profileSlice';
import { signUp } from '../../../redux/signUpSlice';
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
  const { title, saveBtn, deleteBtn } = ProfileTranslationKeys;
  const { successSignUp, failSignUp409, fail } = ToastTranslations;

  const { t } = useTranslation([
    FormTranslationKeys.ns,
    ProfileTranslationKeys.ns,
    ToastTranslations.ns
  ]);

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      const data = getValues();
      dispatch(updateUserProfile({ userId, data }));
    }
  };

  /*   const onSubmit: SubmitHandler<ISignUpFields> = async (data) => {
      const userData: IUserReq = {
        name: data.name,
        login: data.login,
        password: data.password
      };
      try {
        await dispatch(signUp(userData)).unwrap();
        dispatch(
          openToast({
            message: t(successSignUp, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
        navigate(`/${Paths.signIn}`);
      } catch (error) {
        const errorResp = error as ErrorResponse;
        const errorMessage =
          errorResp.statusCode === 409
            ? t(failSignUp409, { ns: ToastTranslations.ns })
            : t(fail, { ns: ToastTranslations.ns });
        dispatch(openToast({ message: errorMessage, type: RespRes.error }));
      }
    }; */

  return (
    <Grid item component="section" flexBasis="50%">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginBottom: 3
          }}>
          {t(title, ProfileTranslationKeys)}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}>
          <TextField
            id="name"
            label={t(name)}
            variant="outlined"
            required
            type="text"
            sx={{
              width: '50ch'
            }}
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
            sx={{
              width: '50ch'
            }}
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
            /* type="password" */
            sx={{
              width: '50ch'
            }}
            error={!!errors.password}
            helperText={t(errors.password?.message || '')}
            {...register(AuthFieldsNames.PASSWORD, {
              validate: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(value) || passwordPatternE,
              required: { value: true, message: requiredE }
            })}
          />
          <Grid container justifyContent="space-around">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '25ch'
              }}>
              {t(saveBtn, ProfileTranslationKeys)}
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '25ch'
              }}>
              {t(deleteBtn, ProfileTranslationKeys)}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileForm;
