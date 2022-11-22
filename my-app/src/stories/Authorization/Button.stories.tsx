import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@mui/material';

export default {
  title: 'COMPONENTS/Sign In-Out Components/Button',
  component: Button,
  argTypes: {
    variant: {
      name: 'variant',
      description: 'The variant to use',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'contained' }
      },
      control: {
        type: null
      }
    },
    type: {
      name: 'type',
      description: 'Type of the button',
      table: {
        type: {
          summary: 'submit'
        },
        defaultValue: { summary: 'submit' }
      },
      control: {
        type: null
      }
    },
    sx: {
      name: 'sx',
      description:
        'The sx prop is a shortcut for defining custom styles that has access to the theme',
      table: {
        type: {
          summary: 'SxProps<Theme>'
        },
        defaultValue: { summary: 'width: "25ch"' }
      },
      control: {
        type: null
      }
    },
    onClick: { action: 'clicked' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>BUTTON</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  type: 'submit',
  sx: {
    width: '25ch'
  }
};
