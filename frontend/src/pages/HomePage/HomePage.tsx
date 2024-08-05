import React from 'react';
import GetAllPictures from '../../apis/pictures/GetAllPicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';

import PictureDisplayPanel from '../../components/PictureDisplayPanel/PictureDisplayPanel';

const HomePage: React.FC = () => {
  const ToggleFavoriteForwardApi = async (
    index: number,
    pictureId: number,
    pictures: any,
  ): Promise<any> => {
    if (await ToggleFavoriteApi(pictureId)) {
      const updatedPictures = [...pictures];
      updatedPictures[index] = {
        ...updatedPictures[index],
        isFavorite: !updatedPictures[index].isFavorite,
      };
      return updatedPictures;
    }
    return pictures;
  };
  return (
    <PictureDisplayPanel
      GetAllPicturesApi={GetAllPictures}
      ToggleFavoriteApi={ToggleFavoriteForwardApi}
    />
  );
};

export default HomePage;
