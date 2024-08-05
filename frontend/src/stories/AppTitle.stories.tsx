import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import AppTitle from '../components/AppTitle/AppTitle';

// Define the component metadata
export default {
  title: 'Components/AppTitle',
  component: AppTitle,
  argTypes: {
    height: { control: 'number' },
    width: { control: 'number' },
  },
} as Meta<typeof AppTitle>;

// Template for the component stories
const Template: StoryFn<typeof AppTitle> = (args) => (
  <BrowserRouter>
    <AppTitle {...args} />
  </BrowserRouter>
);

// Default story
export const Default = Template.bind({});
Default.args = {
  height: 35,
  width: 134,
};

// Custom dimensions story
export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
  height: 50,
  width: 200,
};
