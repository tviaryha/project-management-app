import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { SignUpForm } from '../../units/auth/SignUpForm';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'COMPONENTS/Sign In-Out Components/SignUpForm',
  component: SignUpForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    )
  ]
} as ComponentMeta<typeof SignUpForm>;

const Template: ComponentStory<typeof SignUpForm> = (args) => <SignUpForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
