// HomePage.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';
import GetAllPictures from '../../apis/pictures/GetAllPicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';
import { toast } from 'react-toastify';
import { NavigateTo } from '../../utils/NavigateTo';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

jest.mock('../../apis/pictures/GetAllPicturesApi');
jest.mock('../../apis/favorites/ToggleFavoriteApis');
jest.mock('react-toastify', () => ({
  toast: {
    loading: jest.fn(),
    dismiss: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    promise: jest.fn((promise) => promise),
  },
}));
jest.mock('../../utils/NavigateTo', () => ({
  NavigateTo: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls GetAllPictures API when PictureDisplayPanel is rendered for auth user', async () => {
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { id: 1, username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(GetAllPictures).toHaveBeenCalled();
    });
  });
  it('show page for unauth user', async () => {
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
        },
      ],
    });
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
        },
      ],
    });
    (ToggleFavoriteApi as jest.Mock).mockResolvedValue(true);

    render(<HomePage />);
    await waitFor(() => {
      expect(GetAllPictures).toHaveBeenCalled();
    });

    await sleep(500);

    const favoriteIcon = await waitFor(() =>
      screen.queryByTestId('heart-filled-123'),
    );
    const favoriteIconnofilled = await waitFor(() =>
      screen.queryByTestId('heart-outlined-123'),
    );

    expect(favoriteIcon).not.toBeInTheDocument();
    expect(favoriteIconnofilled).not.toBeInTheDocument();
  });

  it('toggles favorite state if ToggleFavoriteApi returns true for auth user', async () => {
    localStorage.setItem('token', '123');
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { id: 1, username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { id: 1, username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });
    (ToggleFavoriteApi as jest.Mock).mockResolvedValue(true);

    render(<HomePage />);
    await waitFor(() => {
      expect(GetAllPictures).toHaveBeenCalled();
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

    expect(screen.queryByTestId('heart-filled-123')).not.toBeInTheDocument();
    expect(screen.getByTestId('heart-outlined-123')).toBeInTheDocument();
  });

  it('does not change favorite state if ToggleFavoriteApi returns false for auth user', async () => {
    localStorage.setItem('token', '123');
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { id: 1, username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });
    (ToggleFavoriteApi as jest.Mock).mockResolvedValue(false);

    render(<HomePage />);
    await waitFor(() => {
      expect(GetAllPictures).toHaveBeenCalled();
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

    expect(screen.getByTestId('heart-filled-123')).toBeInTheDocument();
  });

  it('shows warning toast if trying to favorite own picture for auth user', async () => {
    localStorage.setItem('token', '1'); // Same as user.id in picture
    (GetAllPictures as jest.Mock).mockResolvedValue({
      currentPage: 1,
      hasNextPage: true,
      pictures: [
        {
          id: 123,
          title: 'Test Picture',
          url: 'http://example.com',
          user: { id: 1, username: 'testuser' },
          createdAt: '2024-01-01',
          isFavorite: true,
        },
      ],
    });

    render(<HomePage />);
    await waitFor(() => {
      expect(GetAllPictures).toHaveBeenCalled();
    });

    await sleep(500);

    const favoriteIcon = await waitFor(() =>
      screen.getByTestId('heart-filled-123'),
    );
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        "Can't select your own Picture as favourite",
      );
    });
  });
});
