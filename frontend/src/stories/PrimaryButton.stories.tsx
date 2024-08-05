import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';

export default {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'default', 'dashed', 'link', 'text'],
      },
    },
    width: { control: 'number' },
    height: { control: 'number' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof PrimaryButton>;

const Template: StoryFn<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 'primary',
  width: 100,
  height: 40,
  children: 'Primary Button',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  type: 'primary',
  width: 150,
  height: 50,
  children: 'Custom Size Button',
};

export const Dashed = Template.bind({});
Dashed.args = {
  type: 'dashed',
  width: 100,
  height: 40,
  children: 'Dashed Button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  width: 100,
  height: 40,
  children: 'Link Button',
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  width: 100,
  height: 40,
  children: 'Text Button',
};
