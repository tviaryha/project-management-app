import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LinearLoadingIndicator from '../../components/LinearLoadingIndicator';

export default {
  title: 'COMPONENTS/Loading Indicator',
  component: LinearLoadingIndicator
} as ComponentMeta<typeof LinearLoadingIndicator>;

export const LinearIndicator: ComponentStory<typeof LinearLoadingIndicator> = () => (
  <LinearLoadingIndicator />
);
