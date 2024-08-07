import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SharePicForm from './SharePicForm';
import { toast } from 'react-toastify';
import SharePictureApi from '../../apis/pictures/SharePictureApi';

jest.mock('react-toastify', () => ({
  toast: {
    loading: jest.fn(),
    dismiss: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../../apis/pictures/SharePictureApi');

describe('SharePicForm', () => {
  const handleModalCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form inputs correctly', () => {
    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    expect(screen.getByPlaceholderText('New picture URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    const urlInput = screen.getByPlaceholderText('New picture URL');
    const titleInput = screen.getByPlaceholderText('Title');

    fireEvent.change(urlInput, {
      target: { value: 'http://example.com/pic.jpg' },
    });
    fireEvent.change(titleInput, { target: { value: 'Example Title' } });

    expect(urlInput).toHaveValue('http://example.com/pic.jpg');
    expect(titleInput).toHaveValue('Example Title');
  });

  it('displays error toast when URL and title are not provided', async () => {
    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Url and Title of a picture are required',
      );
    });
  });

  it('calls SharePictureApi and shows success toast on successful submission', async () => {
    (SharePictureApi as jest.Mock).mockResolvedValue({});

    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    const urlInput = screen.getByPlaceholderText('New picture URL');
    const titleInput = screen.getByPlaceholderText('Title');
    const shareButton = screen.getByText('Share');

    fireEvent.change(urlInput, {
      target: { value: 'http://example.com/pic.jpg' },
    });
    fireEvent.change(titleInput, { target: { value: 'Example Title' } });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith(
        'Processing request please wait..',
      );
      expect(SharePictureApi).toHaveBeenCalledWith(
        'http://example.com/pic.jpg',
        'Example Title',
      );
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Picture shared');
    });
  });

  it('calls handleModalCancel when the cancel button is clicked', () => {
    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleModalCancel).toHaveBeenCalled();
  });

  it('reloads the page after successful submission', async () => {
    (SharePictureApi as jest.Mock).mockResolvedValue({});
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });

    render(
      <SharePicForm
        isModalVisible={true}
        handleModalCancel={handleModalCancel}
      />,
    );

    const urlInput = screen.getByPlaceholderText('New picture URL');
    const titleInput = screen.getByPlaceholderText('Title');
    const shareButton = screen.getByText('Share');

    fireEvent.change(urlInput, {
      target: { value: 'http://example.com/pic.jpg' },
    });
    fireEvent.change(titleInput, { target: { value: 'Example Title' } });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith(
        'Processing request please wait..',
      );
      expect(SharePictureApi).toHaveBeenCalledWith(
        'http://example.com/pic.jpg',
        'Example Title',
      );
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Picture shared');
      expect(window.location.reload).toHaveBeenCalled();
    });

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });
});
