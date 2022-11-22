import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import Footer from '../../units/layout/Footer/Footer';

export default {
  title: 'COMPONENTS/Footer',
  component: Footer
} as Meta<JSX.Element>;

const Template: Story<JSX.Element> = (args) => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {};
