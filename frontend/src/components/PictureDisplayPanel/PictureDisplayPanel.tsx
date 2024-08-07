import React from 'react';
import { LazyContent } from '../../styles/ContentStyles';
import { PicCard } from '../../components';
import { toast } from 'react-toastify';
import PictureDisplayPanelProps from './PictureDisplayPanelProps.d';

const PictureDisplayPanel: React.FC<PictureDisplayPanelProps> = ({
  GetAllPicturesApi,
  ToggleFavoriteApi,
}) => {
  const [pictures, setPictures] = React.useState<any>([]);
  const lastApiResponse = React.useRef<any>({
    currentPage: 0,
    hasNextPage: true,
  });
  const calculateInitialLimit = () => {
    const cardWidth = 240; // Adjust this to the actual width of your cards including margins
    const screenWidth = window.innerWidth;
    const cardsPerRow = Math.floor(screenWidth / cardWidth);
    const rows = Math.floor(window.innerHeight / cardWidth); // Assume square cards for simplicity

    return cardsPerRow * rows;
  };

  const getAllPictures = async () => {
    if (!lastApiResponse.current.hasNextPage) {
      return;
    }

    toast.loading('Loading');
    lastApiResponse.current = await GetAllPicturesApi(
      lastApiResponse.current.currentPage + 1,
      calculateInitialLimit() ?? 12,
    );
    toast.dismiss();
    if (lastApiResponse.current.pictures) {
      setPictures((prevPictures: any) => {
        const newPictures = lastApiResponse.current.pictures.filter(
          (newPic: any) =>
            !prevPictures.some((pic: any) => pic.id === newPic.id),
        );
        return [...prevPictures, ...newPictures];
      });
    }
  };

  React.useEffect(() => {
    getAllPictures().then();

    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !lastApiResponse.current.hasNextPage
      )
        return;
      toast.promise(getAllPictures, {
        pending: 'Loading',
      });
      //await getAllPictures();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    } as any;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const onFavoriteUpdate = async (index: number, pictureId: number) => {
    const updatedPictures = await ToggleFavoriteApi(index, pictureId, [
      ...pictures,
    ]);

    setPictures(updatedPictures);
  };

  const RenderPictures = () => {
    let elements: any = [];
    for (let i = 0; i < pictures.length; i++) {
      elements.push(
        <PicCard
          key={i}
          imageSRC={pictures[i].url}
          title={pictures[i].title}
          username={pictures[i].user.username}
          index={i}
          pictureId={pictures[i].id}
          date={formatDate(pictures[i].createdAt)}
          isFavorite={pictures[i].isFavorite}
          onFavoriteUpdate={onFavoriteUpdate}
        />,
      );
    }
    return <>{elements}</>;
  };

  return <LazyContent>{RenderPictures()}</LazyContent>;
};

export default PictureDisplayPanel;
