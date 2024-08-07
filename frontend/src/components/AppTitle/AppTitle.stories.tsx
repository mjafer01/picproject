import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import AppTitle from './AppTitle';
import { PictureDisplayPanel } from '../index';

const meta: Meta<typeof AppTitle> = {
  title: 'Components/AppTitle',
  component: AppTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

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
