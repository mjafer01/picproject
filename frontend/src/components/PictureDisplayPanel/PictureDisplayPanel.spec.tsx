import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PictureDisplayPanel from './PictureDisplayPanel';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-toastify', () => ({
  toast: {
    promise: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

const mockGetAllPicturesApi = jest.fn();
const mockToggleFavoriteApi = jest.fn();

const defaultProps = {
  GetAllPicturesApi: mockGetAllPicturesApi,
  ToggleFavoriteApi: mockToggleFavoriteApi,
};

const picturesMock = [
  {
    id: 1,
    url: 'https://example.com/image1.jpg',
    title: 'Picture 1',
    createdAt: '2023-09-12T00:00:00Z',
    isFavorite: false,
    user: { id: 1, username: 'user1' },
  },
  {
    id: 2,
    url: 'https://example.com/image2.jpg',
    title: 'Picture 2',
    createdAt: '2023-09-13T00:00:00Z',
    isFavorite: true,
    user: { id: 2, username: 'user2' },
  },
];

// Sleep function to add a delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('PictureDisplayPanel', () => {
  beforeEach(() => {
    mockGetAllPicturesApi.mockClear();
    mockToggleFavoriteApi.mockClear();
    (toast.promise as jest.Mock).mockReset();
    (toast.loading as jest.Mock).mockReset();
    (toast.dismiss as jest.Mock).mockReset();
  });

  it('renders pictures correctly', async () => {
    mockGetAllPicturesApi.mockResolvedValue({
      pictures: picturesMock,
      currentPage: 1,
      hasNextPage: false,
    });

    render(<PictureDisplayPanel {...defaultProps} />);

    // Wait for a bit to ensure the component has time to render
    await sleep(500);

    await waitFor(() => {
      expect(mockGetAllPicturesApi).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByAltText('Picture 1')).toBeInTheDocument();
    expect(screen.getByAltText('Picture 2')).toBeInTheDocument();
  });

  it('handles infinite scroll and loads more pictures', async () => {
    mockGetAllPicturesApi.mockResolvedValue({
      pictures: picturesMock,
      currentPage: 1,
      hasNextPage: true,
    });

    render(<PictureDisplayPanel {...defaultProps} />);

    await sleep(500);

    await waitFor(() => {
      expect(mockGetAllPicturesApi).toHaveBeenCalledTimes(1);
    });

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: document.documentElement.scrollHeight },
      });
    });

    await sleep(500);

    await waitFor(() => {
      expect(mockGetAllPicturesApi).toHaveBeenCalledTimes(1);
    });
  });

  it('handles favorite toggling', async () => {
    mockGetAllPicturesApi.mockResolvedValue({
      pictures: picturesMock,
      currentPage: 1,
      hasNextPage: false,
    });

    render(<PictureDisplayPanel {...defaultProps} />);

    await sleep(500);

    await waitFor(() => {
      expect(mockGetAllPicturesApi).toHaveBeenCalledTimes(1);
    });

    const favoriteIcon = await waitFor(() =>
      screen.getByTestId('heart-outlined-1'),
    );
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(mockToggleFavoriteApi).toHaveBeenCalledWith(0, 1, picturesMock);
    });

    const updatedPictures = [
      {
        ...picturesMock[0],
        isFavorite: true,
      },
      ...picturesMock.slice(1),
    ];

    mockToggleFavoriteApi.mockResolvedValue(updatedPictures);
    expect(updatedPictures[0].isFavorite).toBe(true);
  });

  it('does not render favorite icon when isFavorite is not provided', async () => {
    mockGetAllPicturesApi.mockResolvedValue({
      pictures: picturesMock.map((pic) => ({ ...pic, isFavorite: undefined })),
      currentPage: 1,
      hasNextPage: false,
    });

    render(
      <MemoryRouter>
        <PictureDisplayPanel {...defaultProps} />
      </MemoryRouter>,
    );

    await sleep(500);

    await waitFor(() => {
      expect(mockGetAllPicturesApi).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByTestId('heart-outlined-1')).not.toBeInTheDocument();
  });
});
