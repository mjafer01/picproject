import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PublicMenuBar from '../components/PublicMenuBar/PublicMenuBar';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/PublicMenuBar',
  component: PublicMenuBar,
} as Meta;

const Template: StoryFn<typeof PublicMenuBar> = (args) => (
  <MemoryRouter>
    <PublicMenuBar {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};

export const MobileView = Template.bind({});
MobileView.args = {};
