import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { SignInForm } from '../../units/auth/SignInForm';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'COMPONENTS/Sign In-Out Components/SignInForm',
  component: SignInForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    )
  ]
} as ComponentMeta<typeof SignInForm>;

const Template: ComponentStory<typeof SignInForm> = (args) => <SignInForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
