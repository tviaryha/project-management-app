import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { api } from '../../api/Api';
import { ISignUp } from '../../api/models/AuthInterfaces';

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const userData: ISignUp = {
      name: data.name,
      login: data.login,
      password: data.password
    };
    api.signUp(userData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{"Let's sign up!"}</h1>
        <label>
          <p>Name</p>
          <input type="text" {...register('name', { required: true })} />
        </label>
        <label>
          <p>Login</p>
          <input type="text" {...register('login', { required: true })} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register('password', { required: true })} />
        </label>
        <label>
          <p>Confirm password</p>
          <input type="password" {...register('confirm-password', { required: true })} />
        </label>
        <div>
          <button type="submit">Go!</button>
        </div>
      </form>
    </main>
  );
};
