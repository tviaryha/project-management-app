import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../api/Api';
import { ISignUp } from '../../api/models/AuthInterfaces';
import * as authFieldsNames from './AuthFieldsName';

interface ISignUpFields extends ISignUp {
  confirm_password: string;
}

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignUpFields>();

  const onSubmit: SubmitHandler<ISignUpFields> = (data) => {
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
          <input type="text" {...register(authFieldsNames.name, { required: true })} />
        </label>
        <label>
          <p>Login</p>
          <input type="text" {...register(authFieldsNames.login, { required: true })} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register(authFieldsNames.password, { required: true })} />
        </label>
        <label>
          <p>Confirm password</p>
          <input
            type="password"
            {...register(authFieldsNames.confirm_password, { required: true })}
          />
        </label>
        <div>
          <button type="submit">Go!</button>
        </div>
      </form>
    </main>
  );
};
