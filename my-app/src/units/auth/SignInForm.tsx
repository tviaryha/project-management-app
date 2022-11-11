import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../api/Api';
import { ISignIn } from '../../api/models/AuthInterfaces';
import * as authFieldsNames from './AuthFieldsName';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignIn>();

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    api.signIn(data);
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{"Let's sign in!"}</h1>
        <label>
          <p>Login</p>
          <input type="text" {...register(authFieldsNames.login, { required: true })} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register(authFieldsNames.password, { required: true })} />
        </label>
        <div>
          <button type="submit">Go!</button>
        </div>
      </form>
    </main>
  );
};
