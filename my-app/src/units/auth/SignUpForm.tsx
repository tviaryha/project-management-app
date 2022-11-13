import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ISignUp } from '../../api/models/AuthInterfaces';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/signUpSlice';
import * as authFieldsNames from './AuthFieldsName';
import { TranslationKeys } from './enum';

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
    ns,
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
  } = TranslationKeys;
  const { t } = useTranslation([ns]);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISignUpFields> = (data) => {
    const userData: ISignUp = {
      name: data.name,
      login: data.login,
      password: data.password
    };
    dispatch(signUp(userData));
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
              helperText={errors.name?.message}
              {...register(authFieldsNames.NAME, {
                required: { value: true, message: t(requiredE) },
                minLength: { value: 3, message: t(minLength3E) },
                maxLength: { value: 30, message: t(maxLength30E) }
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
              helperText={errors.login?.message}
              {...register(authFieldsNames.LOGIN, {
                required: { value: true, message: t(requiredE) },
                minLength: { value: 3, message: t(minLength3E) },
                maxLength: { value: 30, message: t(maxLength30E) }
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
              {...register(authFieldsNames.PASSWORD, {
                validate: (value) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(value) ||
                  t<string>(passwordPatternE),
                required: { value: true, message: t(requiredE) }
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
              helperText={errors.confirm_password?.message}
              {...register(authFieldsNames.CONFIRM_PASSWORD, {
                validate: (value) =>
                  value === getValues(authFieldsNames.PASSWORD) || t<string>(confirmPasswordE),
                required: { value: true, message: t(requiredE) }
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
    </main>
  );
};
