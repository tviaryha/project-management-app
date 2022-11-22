import { Meta, Story } from '@storybook/react';
import DeveloperСard, { СardProps } from '../units/pages/Welcome/DeveloperСard';

export default {
  title: 'COMPONENTS/Developer Сard ',
  component: DeveloperСard,
  argTypes: {
    bgcolor: {
      name: 'bgcolor',
      type: { name: 'string', required: true },
      description: 'Avatar Background Color',
      table: {
        type: {
          summary: 'string'
        }
      },
      control: {
        type: 'color'
      }
    },
    title: {
      name: 'title',
      type: { name: 'string', required: true },
      description: 'Developer Name',
      table: {
        type: {
          summary: 'string'
        }
      },
      control: {
        type: 'text'
      }
    }
  }
} as Meta<СardProps>;

const Template: Story<СardProps> = (args) => <DeveloperСard {...args} />;

export const Default = Template.bind({});

Default.args = {
  bgcolor: '#673ab7',
  title: 'Developer Name'
};
