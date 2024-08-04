import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PublicMenuBar from '../components/PublicMenuBar/./PublicMenuBar';
import { MemoryRouter } from 'react-router-dom';
import MenuBarProps from '../components/PublicMenuBar/MenuBarProps.d';

export default {
  title: 'Template/PublicMenuBar',
  component: PublicMenuBar,
} as Meta;

const Template: StoryFn<MenuBarProps> = (args) => (
  <MemoryRouter>
    <PublicMenuBar {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  TitleComponent: ({ title }) => <div>{title}</div>,
  title: 'Default Title',
  loginPageLink: '/login',
};

export const MobileView = Template.bind({});
MobileView.args = {
  TitleComponent: ({ title }) => <div>{title}</div>,
  title: 'Mobile View Title',
  loginPageLink: '/login',
};
