import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureDisplayPanel from '../components/PictureDisplayPanel/PictureDisplayPanel';
import { BrowserRouter } from 'react-router-dom';

// Mock API functions
const mockPictures = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  url: `https://via.placeholder.com/150?text=Picture+${i + 1}`,
  title: `Picture ${i + 1}`,
  user: { username: `User${i + 1}` },
  createdAt: new Date().toISOString(),
  isFavorite: Math.random() > 0.5,
}));

const GetAllPicturesApi = async (page: number, limit: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentPage: page,
        hasNextPage: page * limit < mockPictures.length,
        pictures: mockPictures.slice((page - 1) * limit, page * limit),
      });
    }, 1000);
  });
};

const ToggleFavoriteApi = async (
  index: number,
  pictureId: number,
  pictures: any[],
) => {
  return pictures.map((pic) =>
    pic.id === pictureId ? { ...pic, isFavorite: !pic.isFavorite } : pic,
  );
};

export default {
  title: 'Components/PictureDisplayPanel',
  component: PictureDisplayPanel,
  argTypes: {},
} as Meta<typeof PictureDisplayPanel>;

const Template: StoryFn<typeof PictureDisplayPanel> = (args) => (
  <BrowserRouter>
    <ToastContainer />
    <PictureDisplayPanel {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  GetAllPicturesApi,
  ToggleFavoriteApi,
};
