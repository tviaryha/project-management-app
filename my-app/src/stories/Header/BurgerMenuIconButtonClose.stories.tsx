import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import BurgerMenuIconButton from '../../units/layout/Header/BurgerMenuIcon';
import { Close } from '@mui/icons-material';

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
          summary: 'OverridableComponent<SvgIconTypeMap<{}, "svg">>'
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

export const CloseIcon = Template.bind({});
CloseIcon.args = {
  Icon: Close
};
