import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { api } from '../../api/Api';
import { ISignIn } from '../../api/models/AuthInterfaces';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    api.signIn(data as ISignIn);
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{"Let's sign in!"}</h1>
        <label>
          <p>Login</p>
          <input type="text" {...register('login', { required: true })} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register('password', { required: true })} />
        </label>
        <div>
          <button type="submit">Go!</button>
        </div>
      </form>
    </main>
  );
};
