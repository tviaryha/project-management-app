import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SignInForm } from '../units/auth/SignInForm';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../redux/store';
import { RespRes } from '../redux/toastSlice';
import { Story } from '@storybook/react';
// export default {
//   title: 'Example/Authentication forms',
//   component: SignInForm
// } as ComponentMeta<typeof SignInForm>;

// export const SignIn: ComponentStory<typeof SignInForm> = () => <SignInForm />;
// export const MockedStateOpenToast = {
//   isOpen: false,
//   message: '',
//   type: RespRes.success
// };

// export const MockedStateSignIn = {
//   token: 'resp',
//   decodedToken: {
//     id: 'id',
//     login: 'login',
//     iat: '2022-01-01T00:00:00.000Z',
//     exp: '2023-01-01T00:00:00.000Z'
//   }
// };

// // signIn;
// // openToast;
// const Mockstore = ({ MockedState, children }) => (
//   <Provider
//     store={configureStore({
//       reducer: {
//         taskbox: createSlice({
//           name: 'taskbox',
//           initialState: MockedState,
//           reducers: {
//             updateTaskState: (state, action) => {
//               const { id, newTaskState } = action.payload;
//               const task = state.tasks.findIndex((task) => task.id === id);
//               if (task >= 0) {
//                 state.tasks[task].state = newTaskState;
//               }
//             }
//           }
//         }).reducer
//       }
//     })}>
//     {children}
//   </Provider>
// );

export default {
  component: SignInForm,
  title: 'SignInForm',
  decorators: [(story: React.FC) => <Provider store={store}>{story()}</Provider>]
};

const Template = () => <SignInForm />;

export const SignIn = Template.bind({});
