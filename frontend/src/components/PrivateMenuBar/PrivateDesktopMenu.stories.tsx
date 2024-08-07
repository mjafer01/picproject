// src/components/PrivateDesktopMenu/PrivateDesktopMenu.stories.tsx

import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateDesktopMenu from './PrivateDesktopMenu';
import { action } from '@storybook/addon-actions';
import { PrivateTopMenu } from '../../constants/RoutePaths';
import { BarContainer, BarSpace } from '../../styles/BarContainer';
import { PictureDisplayPanel } from '../index';

// Mock NavigateTo
const mockNavigateTo = action('NavigateTo');

// Mock GlobalVariables
const mockGlobalVariables = {
  displayPrivateSharePic: true,
};

const meta: Meta<typeof PrivateDesktopMenu> = {
  title: 'Components/PrivateMenuBar/PrivateDesktopMenu',
  component: PrivateDesktopMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Mock localStorage
const mockLocalStorage = () => {
  const localStorageMock = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key: string) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  localStorage.setItem('username', 'testuser');
};

mockLocalStorage();

// Template
const Template: StoryFn<typeof PrivateDesktopMenu> = (args) => (
  <MemoryRouter>
    <BarContainer>
      <BarSpace />
      <PrivateDesktopMenu {...args} />
      <BarSpace />
    </BarContainer>
  </MemoryRouter>
);

export const Default: Story = Template.bind({});
Default.args = {
  username: 'testuser',
  handleClick: action('handleClick'),
  menuTitle: PrivateTopMenu[0].title,
};
Default.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
};
