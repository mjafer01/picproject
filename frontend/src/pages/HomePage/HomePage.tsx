import React from 'react';
import { LazyContent, ParentContent } from '../../styles/MainContent';
import { PicCard } from '../../components';
import GetAllPictures from '../../apis/pictures/GetAllPicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';

const HomePage: React.FC = () => {
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
    lastApiResponse.current = await GetAllPictures(
      lastApiResponse.current.currentPage + 1,
      calculateInitialLimit() ?? 12,
    );
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
      await getAllPictures();
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
    if (await ToggleFavoriteApi(pictureId)) {
      const updatedPictures = [...pictures];
      updatedPictures[index] = {
        ...updatedPictures[index],
        isFavorite: !updatedPictures[index].isFavorite,
      };

      console.log(updatedPictures[index].isFavorite);
      setPictures(updatedPictures);
    }
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

  return (
    <ParentContent>
      <LazyContent>
        <RenderPictures />
      </LazyContent>
    </ParentContent>
  );
};

export default HomePage;
