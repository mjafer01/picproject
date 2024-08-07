import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import PrivateMenuBar from './PrivateMenuBar';
import { action } from '@storybook/addon-actions';
import { NavigateComponent } from '../../utils/NavigateTo';
import AppTitle from '../AppTitle/AppTitle';
import PrivateDesktopMenu from './PrivateDesktopMenu';

const meta: Meta<typeof PrivateMenuBar> = {
  title: 'Components/PrivateMenuBar/PrivateMenuBar',
  component: PrivateMenuBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

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

const Template: StoryFn<typeof PrivateMenuBar> = (args) => (
  <MemoryRouter>
    <NavigateComponent />
    <PrivateMenuBar {...args} />
  </MemoryRouter>
);
export const Default = Template.bind({});
Default.args = {
  menuTitle: '',
};

export const MobileView: Story = {
  args: {
    menuTitle: 'Home',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <NavigateComponent />
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const DesktopView: Story = {
  args: {
    menuTitle: 'Home',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <NavigateComponent />
        <Story />
      </MemoryRouter>
    ),
  ],
};
