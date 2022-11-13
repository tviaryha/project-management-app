import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignIn } from '../../api/models/AuthInterfaces';
import * as authFieldsNames from './AuthFieldsName';
import { signIn } from '../../redux/signInSlice';
import useAppDispatch from '../../hooks/useAppDispatch';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{"Let's sign in!"}</h1>
        <label>
          <p>Login</p>
          <input type="text" {...register(authFieldsNames.LOGIN, { required: true })} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register(authFieldsNames.PASSWORD, { required: true })} />
        </label>
        <div>
          <button type="submit">Go!</button>
        </div>
      </form>
    </main>
  );
};
