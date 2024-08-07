// src/components/SharePicForm/SharePicForm.stories.tsx

import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SharePicForm from './SharePicForm';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavigateComponent } from '../../utils/NavigateTo';

const mockSharePictureApi = action('SharePictureApi');

// Meta configuration
const meta: Meta<typeof SharePicForm> = {
  title: 'Components/SharePicForm',
  component: SharePicForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isModalVisible: { control: 'boolean' },
    handleModalCancel: { action: 'handleModalCancel' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Template
const Template: StoryFn<typeof SharePicForm> = (args) => (
  <MemoryRouter>
    <NavigateComponent />
    <SharePicForm {...args} />
  </MemoryRouter>
);

// Stories
export const Default: Story = Template.bind({});
Default.args = {
  isModalVisible: true,
  handleModalCancel: action('handleModalCancel'),
};
