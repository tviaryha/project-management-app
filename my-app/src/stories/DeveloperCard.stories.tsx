import React from 'react';
import { Meta, Story } from '@storybook/react';
import DeveloperСard, { СardProps } from '../units/pages/Welcome/DeveloperСard';

export default {
  title: 'Developer Сard ',
  component: DeveloperСard,
  argTypes: {
    bgcolor: {
      name: 'bgcolor',
      type: { name: 'string', required: true },
      defaultValue: '#673ab7',
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
      defaultValue: 'Developer Name',
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

export const Card = Template.bind({});
