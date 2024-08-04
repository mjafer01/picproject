import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AppTitle } from '../components';
import AppTitleProps from '../components/AppTitle/AppTitleProps.d';

export default {
  title: 'Components/AppTitle',
  component: AppTitle,
} as Meta;

const Template: StoryFn<AppTitleProps> = (args: AppTitleProps) => (
  <AppTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Default Title',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'Custom Title',
};
