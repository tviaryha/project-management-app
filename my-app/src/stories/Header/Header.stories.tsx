import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Header from '../../units/layout/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'COMPONENTS/Header/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    )
  ]
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
