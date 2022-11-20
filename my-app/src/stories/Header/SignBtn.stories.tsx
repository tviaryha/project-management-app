import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
export default {
  title: 'COMPONENTS/Header/Button',
  component: Button,
  argTypes: {
    variant: {
      name: 'contained',
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
    size: {
      name: 'size',
      description: 'The size of the component',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'medium' }
      },
      control: {
        type: null
      }
    },
    onClick: {
      table: {
        type: {
          summary: '() => void'
        },
        category: 'Events'
      },
      control: {
        type: null
      },
      action: 'clicked'
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>BUTTON</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  size: 'medium'
};
