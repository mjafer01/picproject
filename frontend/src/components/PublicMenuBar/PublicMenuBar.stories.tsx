import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import PublicMenuBar from './PublicMenuBar';
import { action } from '@storybook/addon-actions';
import { NavigateComponent, NavigateTo } from '../../utils/NavigateTo';

// Mock NavigateTo
const mockNavigateTo = action('NavigateTo');

// Meta configuration
const meta: Meta<typeof PublicMenuBar> = {
  title: 'Components/PublicMenuBar',
  component: PublicMenuBar,
  parameters: {
    layout: 'fullscreen',
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
};

mockLocalStorage();

// Template
const Template: StoryFn<typeof PublicMenuBar> = (args) => (
  <MemoryRouter>
    <NavigateComponent />
    <PublicMenuBar {...args} />
  </MemoryRouter>
);

// Stories
export const Default: Story = Template.bind({});
Default.args = {};

export const MobileView: Story = Template.bind({});
MobileView.args = {};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

export const DesktopView: Story = Template.bind({});
DesktopView.args = {};
DesktopView.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
};
