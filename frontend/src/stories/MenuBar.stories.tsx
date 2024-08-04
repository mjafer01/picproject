import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MenuBar from '../templates/menubar/MenuBar';
import { MemoryRouter } from 'react-router-dom';
import MenuBarProps from '../templates/menubar/MenuBarProps.d';

export default {
  title: 'Template/MenuBar',
  component: MenuBar,
} as Meta;

const Template: StoryFn<MenuBarProps> = (args) => (
  <MemoryRouter>
    <MenuBar {...args} />
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
