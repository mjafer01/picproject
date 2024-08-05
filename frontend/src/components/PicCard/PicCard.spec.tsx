import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PicCard from './PicCard';
import PicCardProps from './PicCardProps.d';

describe('PicCard', () => {
  const defaultProps: PicCardProps = {
    imageSRC: 'https://example.com/image.jpg',
    title: 'Example Title',
    username: 'testuser',
    index: 0,
    pictureId: 1,
    date: '09/12/2023',
  };

  it('renders correctly', () => {
    render(<PicCard {...defaultProps} />);

    expect(screen.getByAltText('Example Title')).toBeInTheDocument();
    expect(screen.getByText('Example Title')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('09/12/2023')).toBeInTheDocument();
  });

  it('handles image click to show modal', async () => {
    render(<PicCard {...defaultProps} />);

    fireEvent.click(screen.getByAltText('Example Title'));

    // Use waitFor to wait for the modal to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('renders favorite icon when isFavorite is true', () => {
    render(
      <PicCard
        {...defaultProps}
        isFavorite={true}
        onFavoriteUpdate={jest.fn()}
      />,
    );

    expect(screen.getByTestId('heart-filled-1')).toBeInTheDocument();
  });

  it('renders non-favorite icon when isFavorite is false', () => {
    render(
      <PicCard
        {...defaultProps}
        isFavorite={false}
        onFavoriteUpdate={jest.fn()}
      />,
    );

    expect(screen.getByTestId('heart-outlined-1')).toBeInTheDocument();
  });

  it('handles favorite icon click', async () => {
    const onFavoriteUpdate = jest.fn();
    const { rerender } = render(
      <PicCard
        {...defaultProps}
        isFavorite={false}
        onFavoriteUpdate={onFavoriteUpdate}
      />,
    );

    let nonFavoriteIcon = screen.getByTestId('heart-outlined-1');
    fireEvent.click(nonFavoriteIcon);
    expect(onFavoriteUpdate).toHaveBeenCalledWith(
      defaultProps.index,
      defaultProps.pictureId,
    );

    rerender(
      <PicCard
        {...defaultProps}
        isFavorite={true}
        onFavoriteUpdate={onFavoriteUpdate}
      />,
    );
    const favoriteIcon = screen.getByTestId('heart-filled-1');
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(favoriteIcon);
    expect(onFavoriteUpdate).toHaveBeenCalledWith(
      defaultProps.index,
      defaultProps.pictureId,
    );

    rerender(
      <PicCard
        {...defaultProps}
        isFavorite={false}
        onFavoriteUpdate={onFavoriteUpdate}
      />,
    );
    nonFavoriteIcon = screen.getByTestId('heart-outlined-1');
    expect(nonFavoriteIcon).toBeInTheDocument();
  });

  it('does not render favorite icon when isFavorite is not provided', () => {
    render(<PicCard {...defaultProps} />);

    expect(screen.queryByTestId('heart-outlined-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('heart-filled-1')).not.toBeInTheDocument();
  });

  it('does not handle favorite icon click when onFavoriteUpdate is not provided', () => {
    const { rerender } = render(
      <PicCard {...defaultProps} isFavorite={false} />,
    );

    const nonFavoriteIcon = screen.queryByTestId('heart-outlined-1');
    expect(nonFavoriteIcon).not.toBeInTheDocument();

    rerender(<PicCard {...defaultProps} isFavorite={true} />);
    const favoriteIcon = screen.queryByTestId('heart-filled-1');
    expect(favoriteIcon).not.toBeInTheDocument();

    rerender(<PicCard {...defaultProps} isFavorite={false} />);
    expect(nonFavoriteIcon).not.toBeInTheDocument();
  });
});
