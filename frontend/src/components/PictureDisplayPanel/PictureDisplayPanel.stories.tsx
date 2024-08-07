// src/components/PictureDisplayPanel/PictureDisplayPanel.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PictureDisplayPanel } from '../index';
import PictureDisplayPanelProps from './PictureDisplayPanelProps';

// Mock APIs
const GetAllPicturesApiMock = async (page: number, limit: number) => {
  return {
    currentPage: page,
    hasNextPage: page < 3, // Assume 3 pages of data for demonstration
    pictures: [
      {
        id: 1,
        url: 'https://via.placeholder.com/240',
        title: 'Sample Picture 1',
        user: { id: 1, username: 'user1' },
        createdAt: '2023-01-01',
        isFavorite: true,
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/240',
        title: 'Sample Picture 2',
        user: { id: 2, username: 'user2' },
        createdAt: '2023-01-02',
        isFavorite: false,
      },
    ],
  };
};

const ToggleFavoriteApiMock = async (
  index: number,
  pictureId: number,
  pictures: any[],
) => {
  return pictures.map((pic, i) =>
    i === index ? { ...pic, isFavorite: !pic.isFavorite } : pic,
  );
};

const meta: Meta<typeof PictureDisplayPanel> = {
  title: 'Components/PictureDisplayPanel',
  component: PictureDisplayPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    GetAllPicturesApi: GetAllPicturesApiMock,
    ToggleFavoriteApi: ToggleFavoriteApiMock,
  } as PictureDisplayPanelProps,
};
