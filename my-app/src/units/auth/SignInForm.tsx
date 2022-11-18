import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignIn } from '../../api/models/AuthInterfaces';
import { AuthFieldsNames } from './authFieldsNames';
import { signIn } from '../../redux/signInSlice';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../../api/models/ErrorResponse';
import { FormTranslationKeys, Paths } from '../../enums';
import { openToast, RespRes } from '../../redux/toastSlice';
import { TranslationKeys as SignFormsTranslationKeys } from './enum';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { useTranslation } from 'react-i18next';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignIn>();
  const { login, password, requiredE } = FormTranslationKeys;
  const { btn, signInTitle } = SignFormsTranslationKeys;
  const { successSignIn, failSignIn401, fail } = ToastTranslations;

  const { t } = useTranslation([
    FormTranslationKeys.ns,
    SignFormsTranslationKeys.ns,
    ToastTranslations.ns
  ]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      dispatch(
        openToast({
          message: t(successSignIn, { ns: ToastTranslations.ns }),
          type: RespRes.success
        })
      );
      navigate(`/${Paths.mainPage}`);
    } catch (error) {
      const errorResp = error as ErrorResponse;
      const errorMessage =
        errorResp.statusCode === 401
          ? t(failSignIn401, { ns: ToastTranslations.ns })
          : t(fail, { ns: ToastTranslations.ns });
      dispatch(openToast({ message: errorMessage, type: RespRes.error }));
    }
  };
  return (
    <main>
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
            {t(signInTitle, SignFormsTranslationKeys)}
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
              id="login"
              label={t(login)}
              variant="outlined"
              required
              type="text"
              sx={{
                width: '50ch'
              }}
              error={!!errors.login}
              helperText={errors.login?.message}
              {...register(AuthFieldsNames.LOGIN, {
                required: { value: true, message: t(requiredE) }
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
              helperText={errors.password?.message}
              {...register(AuthFieldsNames.PASSWORD, {
                required: { value: true, message: t(requiredE) }
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
    </main>
  );
};
