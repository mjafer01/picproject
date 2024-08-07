import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import PicCard from './PicCard';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof PicCard> = {
  title: 'Components/PicCard',
  component: PicCard,
  parameters: {
    layout: 'fullscreen', // Set the layout to fullscreen
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

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
  imageSRC:
    'https://images.ctfassets.net/lzny33ho1g45/4ODoWVyzgicvbcb6J9ZZZ5/c0333ef44af8588fee18c1e6ed403fc7/Group_12549.jpg?w=1520&fm=avif&q=30&fit=thumb&h=760',
  title: 'Sample Title',
  username: 'Jane Doe',
  date: '2024-08-05',
  index: 1,
  pictureId: 2,
  isFavorite: true,
};

export const ModalVisible = Template.bind({});
ModalVisible.args = {
  imageSRC:
    'https://images.ctfassets.net/lzny33ho1g45/4ODoWVyzgicvbcb6J9ZZZ5/c0333ef44af8588fee18c1e6ed403fc7/Group_12549.jpg?w=1520&fm=avif&q=30&fit=thumb&h=760',
  title: 'Sample Title',
  username: 'John Smith',
  date: '2024-08-05',
  index: 2,
  pictureId: 3,
  isFavorite: false,
};
