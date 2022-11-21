import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IUserReq } from '../../api/models/AuthInterfaces';
import { ErrorResponse } from '../../api/models/ErrorResponse';
import { ErrorCodes, Paths } from '../../enums';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/signUpSlice';
import { openToast, RespRes } from '../../redux/toastSlice';
import { FormTranslationKeys } from '../../enums';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { AuthFieldsNames } from './authFieldsNames';
import { hideLoader, showLoader } from '../../redux/appSlice';
import { TranslationKeys as SignFormsTranslationKeys } from './enum';
import useCloseMenu from '../../hooks/useCloseMenu';
import { passwordRegExp } from '../../regExp';

interface ISignUpFields extends IUserReq {
  confirm_password: string;
}

export const SignUpForm: FC = () => {
  useCloseMenu();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ISignUpFields>();
  const { name, login, requiredE, password, minLength3E, maxLength30E, passwordPatternE } =
    FormTranslationKeys;
  const { btn, signUpTitle, confirmPassword, confirmPasswordE } = SignFormsTranslationKeys;
  const { successSignUp, error409, fail } = ToastTranslations;

  const { t } = useTranslation([
    FormTranslationKeys.ns,
    ToastTranslations.ns,
    SignFormsTranslationKeys.ns
  ]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISignUpFields> = async (data) => {
    const userData: IUserReq = {
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
        errorResp.statusCode === ErrorCodes.CONFLICT
          ? t(error409, { ns: ToastTranslations.ns })
          : t(fail, { ns: ToastTranslations.ns });
      dispatch(openToast({ message: errorMessage, type: RespRes.error }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const validateConfirmPassword = (value: string) =>
    value === getValues(AuthFieldsNames.PASSWORD) ||
    t<string>(confirmPasswordE, SignFormsTranslationKeys);

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
          {t(signUpTitle, SignFormsTranslationKeys)}
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
              validate: (value) => passwordRegExp.test(value) || passwordPatternE,
              required: { value: true, message: requiredE }
            })}
          />
          <TextField
            id="confirm-password"
            label={t(confirmPassword, SignFormsTranslationKeys)}
            variant="outlined"
            required
            type="password"
            sx={{
              width: '50ch'
            }}
            error={!!errors.confirm_password}
            helperText={t(errors.confirm_password?.message || '')}
            {...register(AuthFieldsNames.CONFIRM_PASSWORD, {
              validate: validateConfirmPassword,
              required: { value: true, message: requiredE }
            })}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '25ch'
            }}>
            {t(btn, SignFormsTranslationKeys)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
