import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignIn } from '../../api/models/AuthInterfaces';
import * as authFieldsNames from './AuthFieldsName';
import { signIn } from '../../redux/signInSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import { ErrorTexts } from './ErrorsTexts';
const theme = createTheme();

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignIn>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    dispatch(signIn(data));
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
              {`Let's sign in!`}
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
                  required: { value: true, message: ErrorTexts.required }
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
