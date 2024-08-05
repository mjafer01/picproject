import React from 'react';
import GetAllFavoritePictures from '../../apis/favorites/GetAllFavoritePicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';

import PictureDisplayPanel from '../../components/PictureDisplayPanel/PictureDisplayPanel';
import { ParentContent } from '../../styles/ContentStyles';

const FavouritePage: React.FC = () => {
  const ToggleFavoriteForwardApi = async (
    index: number,
    pictureId: number,
    pictures: any,
  ): Promise<any> => {
    if (await ToggleFavoriteApi(pictureId)) {
      const updatedPictures = pictures.filter(
        (picture: any) => picture.id !== pictureId,
      );
      return updatedPictures;
    }
    return pictures;
  };
  return (
    <ParentContent>
      <PictureDisplayPanel
        GetAllPicturesApi={GetAllFavoritePictures}
        ToggleFavoriteApi={ToggleFavoriteForwardApi}
      />
    </ParentContent>
  );
};

export default FavouritePage;
