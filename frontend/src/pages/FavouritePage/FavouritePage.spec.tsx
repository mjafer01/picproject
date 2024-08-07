import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavouritePage from './FavouritePage';
import GetAllFavoritePictures from '../../apis/favorites/GetAllFavoritePicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';
import { toast } from 'react-toastify';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
jest.mock('../../apis/favorites/GetAllFavoritePicturesApi');
jest.mock('../../apis/favorites/ToggleFavoriteApis');
jest.mock('react-toastify', () => ({
  toast: {
    loading: jest.fn(),
    dismiss: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    promise: jest.fn((promise) => promise),
  },
}));

describe('FavouritePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls GetAllFavoritePictures API when PictureDisplayPanel is rendered', async () => {
    (GetAllFavoritePictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });

    render(<FavouritePage />);

    await waitFor(() => {
      expect(GetAllFavoritePictures).toHaveBeenCalled();
    });
  });

  it('removes picture from list if ToggleFavoriteApi returns true', async () => {
    (GetAllFavoritePictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });
    (ToggleFavoriteApi as jest.Mock).mockResolvedValue(true);

    render(<FavouritePage />);
    await waitFor(() => {
      expect(GetAllFavoritePictures).toHaveBeenCalled();
    });

    await sleep(500);

    const favoriteIcon = await waitFor(() =>
      screen.getByTestId('heart-filled-123'),
    );
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(ToggleFavoriteApi).toHaveBeenCalledWith(123);
    });

    await sleep(500);

    expect(screen.queryByText('Test Picture')).not.toBeInTheDocument();
  });

  it('does not remove picture from list if ToggleFavoriteApi returns false', async () => {
    (GetAllFavoritePictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });
    (ToggleFavoriteApi as jest.Mock).mockResolvedValue(false);

    render(<FavouritePage />);
    await waitFor(() => {
      expect(GetAllFavoritePictures).toHaveBeenCalled();
    });

    await sleep(500);

    const favoriteIcon = await waitFor(() =>
      screen.getByTestId('heart-filled-123'),
    );
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(ToggleFavoriteApi).toHaveBeenCalledWith(123);
    });

    await sleep(500);

    expect(screen.getByText('Test Picture')).toBeInTheDocument();
  });
});
