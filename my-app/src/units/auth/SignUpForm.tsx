import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ISignUp } from '../../api/models/AuthInterfaces';
import { ErrorResponse } from '../../api/models/ErrorResponse';
import { Paths } from '../../enums';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/signUpSlice';
import { openToast, RespRes } from '../../redux/toastSlice';
import { TranslationKeys as FormTranslations } from './enum';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { AuthFieldsNames } from './authFieldsNames';
import { hideLoader, showLoader } from '../../redux/appSlice';

interface ISignUpFields extends ISignUp {
  confirm_password: string;
}

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ISignUpFields>();
  const {
    btn,
    signUpTitle,
    name,
    login,
    requiredE,
    password,
    minLength3E,
    maxLength30E,
    passwordPatternE,
    confirmPassword,
    confirmPasswordE
  } = FormTranslations;
  const { successSignUp, failSignUp409, fail } = ToastTranslations;

  const { t } = useTranslation([FormTranslations.ns, ToastTranslations.ns]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISignUpFields> = async (data) => {
    const userData: ISignUp = {
      name: data.name,
      login: data.login,
      password: data.password
    };
    try {
      dispatch(showLoader());
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
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          {t(signUpTitle)}
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
            type="password"
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
          <TextField
            id="confirm-password"
            label={t(confirmPassword)}
            variant="outlined"
            required
            type="password"
            sx={{
              width: '50ch'
            }}
            error={!!errors.confirm_password}
            helperText={t(errors.confirm_password?.message || '')}
            {...register(AuthFieldsNames.CONFIRM_PASSWORD, {
              validate: (value) =>
                value === getValues(AuthFieldsNames.PASSWORD) || confirmPasswordE,
              required: { value: true, message: requiredE }
            })}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '25ch'
            }}>
            {t(btn)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
