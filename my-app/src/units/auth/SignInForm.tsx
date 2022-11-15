import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignIn } from '../../api/models/AuthInterfaces';
import * as AuthFieldsNames from './AuthFieldsName';
import { signIn } from '../../redux/signInSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../../api/models/ErrorResponse';
import { Paths } from '../../enums';
import { openToast, RespRes } from '../../redux/toastSlice';
import { ToastTexts } from '../toast/toastTexts';
import { ValidationErrorTexts } from './validationErrorsTexts';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignIn>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      dispatch(openToast({ message: ToastTexts.successSignIn, type: RespRes.success }));
      navigate(`/${Paths.mainPage}`);
    } catch (error) {
      const errorResp = error as ErrorResponse;
      const errorMessage =
        errorResp.statusCode === 401 ? ToastTexts.failSignIn401 : ToastTexts.fail;
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
            {AuthFieldsNames.SING_IN_HEADER}
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
              {...register(AuthFieldsNames.LOGIN, {
                required: { value: true, message: ValidationErrorTexts.required }
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
              {...register(AuthFieldsNames.PASSWORD, {
                required: { value: true, message: ValidationErrorTexts.required }
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
    </main>
  );
};
