import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import BurgerMenuIconButton from '../../units/layout/Header/BurgerMenuIcon';
import { Menu } from '@mui/icons-material';

export default {
  title: 'COMPONENTS/Header/BurgerMenuIconButton',
  component: BurgerMenuIconButton,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    Icon: {
      name: 'Icon',
      table: {
        type: {
          summary: 'SvgIconComponent'
        }
      },
      control: {
        type: 'null'
      }
    }
  }
} as ComponentMeta<typeof BurgerMenuIconButton>;

const Template: ComponentStory<typeof BurgerMenuIconButton> = (args) => (
  <BurgerMenuIconButton {...args} />
);

export const MenuIcon = Template.bind({});
MenuIcon.args = {
  Icon: Menu
};
