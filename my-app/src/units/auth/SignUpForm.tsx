import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ISignUp } from '../../api/models/AuthInterfaces';
import { ErrorResponse } from '../../api/models/ErrorResponse';
import { Paths } from '../../enums';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/signUpSlice';
import { openToast } from '../../redux/toastSlice';
import { ToastTexts } from '../Toast/toastTexts';
import * as authFieldsNames from './authFieldsName';
import { ValidationErrorTexts } from './validationErrorsTexts';

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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISignUpFields> = async (data) => {
    const userData: ISignUp = {
      name: data.name,
      login: data.login,
      password: data.password
    };
    try {
      await dispatch(signUp(userData)).unwrap();
      dispatch(openToast({ message: ToastTexts.successSignUp, type: 'success' }));
      navigate(`/${Paths.signIn}`);
    } catch (error) {
      const errorResp = error as ErrorResponse;
      const errorMessage =
        errorResp.statusCode === 409 ? ToastTexts.failSignUp409 : ToastTexts.fail400;
      dispatch(openToast({ message: errorMessage, type: 'error' }));
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
                required: { value: true, message: ValidationErrorTexts.required },
                minLength: { value: 3, message: ValidationErrorTexts.minLength3 },
                maxLength: { value: 30, message: ValidationErrorTexts.maxLength30 }
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
                required: { value: true, message: ValidationErrorTexts.required },
                minLength: { value: 3, message: ValidationErrorTexts.minLength3 },
                maxLength: { value: 30, message: ValidationErrorTexts.maxLength30 }
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
                  ValidationErrorTexts.passwordPattern,
                required: { value: true, message: ValidationErrorTexts.required }
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
                  value === getValues(authFieldsNames.PASSWORD) ||
                  ValidationErrorTexts.confirmPassword,
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
