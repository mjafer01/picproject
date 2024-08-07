import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DefaultRouteWithTemplate from './DefaultRouteWithTemplate';
import { action } from '@storybook/addon-actions';
import { NavigateComponent, NavigateTo } from '../../utils/NavigateTo';
import Template from '../../templates/Template';

const mockNavigateTo = action('NavigateTo');

// Meta configuration
const meta: Meta<typeof DefaultRouteWithTemplate> = {
  title: 'Components/RoutesWithTemplate/DefaultRouteWithTemplate',
  component: DefaultRouteWithTemplate,
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
const TemplateComponent: StoryFn<typeof DefaultRouteWithTemplate> = (args) => (
  <MemoryRouter>
    <NavigateComponent />
    <DefaultRouteWithTemplate {...args} />
  </MemoryRouter>
);

// Stories
export const Default: Story = TemplateComponent.bind({});
Default.args = {
  type: 'Public',
  menuTitle: 'Home',
  children: 'This is the home page content.',
};

export const ProtectedWithToken: Story = TemplateComponent.bind({});
ProtectedWithToken.args = {
  type: 'Protected',
  menuTitle: 'Protected Page',
  children: 'This is protected content.',
};
ProtectedWithToken.decorators = [
  (Story) => {
    window.localStorage.setItem('token', 'valid-token');
    return <Story />;
  },
];

export const PrivateWithoutToken: Story = TemplateComponent.bind({});
PrivateWithoutToken.args = {
  type: 'Private',
  menuTitle: 'Private Page',
  children: 'This is private content.',
};
PrivateWithoutToken.decorators = [
  (Story) => {
    window.localStorage.removeItem('token');
    return <Story />;
  },
];
