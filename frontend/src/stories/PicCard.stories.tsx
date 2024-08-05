import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PicCard from '../components/PicCard/PicCard';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/PicCard',
  component: PicCard,
  argTypes: {
    imageSRC: { control: 'text' },
    title: { control: 'text' },
    username: { control: 'text' },
    date: { control: 'text' },
    index: { control: 'number' },
    pictureId: { control: 'number' },
    isFavorite: { control: 'boolean' },
    onFavoriteUpdate: { action: 'updated' },
  },
} as Meta<typeof PicCard>;

const Template: StoryFn<typeof PicCard> = (args) => (
  <BrowserRouter>
    <PicCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  imageSRC: 'https://via.placeholder.com/150',
  title: 'Sample Title',
  username: 'John Doe',
  date: '2024-08-05',
  index: 0,
  pictureId: 1,
  isFavorite: false,
};

export const Favorite = Template.bind({});
Favorite.args = {
  imageSRC: 'https://via.placeholder.com/150',
  title: 'Sample Title',
  username: 'Jane Doe',
  date: '2024-08-05',
  index: 1,
  pictureId: 2,
  isFavorite: true,
};

export const ModalVisible = Template.bind({});
ModalVisible.args = {
  imageSRC: 'https://via.placeholder.com/150',
  title: 'Sample Title',
  username: 'John Smith',
  date: '2024-08-05',
  index: 2,
  pictureId: 3,
  isFavorite: false,
};
