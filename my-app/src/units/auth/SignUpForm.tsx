import { ThemeProvider } from '@emotion/react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  createTheme
} from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUp } from '../../api/models/AuthInterfaces';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/signUpSlice';
import * as authFieldsNames from './AuthFieldsName';
import { ErrorTexts } from './ErrorsTexts';

const theme = createTheme();

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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
              {`Let's sign up!`}
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
                label="Name"
                variant="outlined"
                required
                type="text"
                sx={{
                  width: '50ch'
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register(authFieldsNames.NAME, {
                  required: { value: true, message: ErrorTexts.required },
                  minLength: { value: 3, message: ErrorTexts.minLength3 },
                  maxLength: { value: 30, message: ErrorTexts.maxLength30 }
                })}
              />
              <TextField
                id="login"
                label="Login"
                variant="outlined"
                required
                type="text"
                sx={{
                  width: '50ch'
                }}
                error={!!errors.login}
                helperText={errors.login?.message}
                {...register(authFieldsNames.LOGIN, {
                  required: { value: true, message: ErrorTexts.required },
                  minLength: { value: 3, message: ErrorTexts.minLength3 },
                  maxLength: { value: 30, message: ErrorTexts.maxLength30 }
                })}
              />
              <TextField
                id="password"
                label="Password"
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
                    ErrorTexts.passwordPattern,
                  required: { value: true, message: ErrorTexts.required }
                })}
              />
              <TextField
                id="confirm-password"
                label="Confirm password"
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
                    value === getValues(authFieldsNames.PASSWORD) || ErrorTexts.confirmPassword,
                  required: { value: true, message: ErrorTexts.required }
                })}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '25ch'
                }}>
                Go!
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </main>
  );
};
