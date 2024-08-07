import React from 'react';
import GetAllPictures from '../../apis/pictures/GetAllPicturesApi';
import ToggleFavoriteApi from '../../apis/favorites/ToggleFavoriteApis';

import PictureDisplayPanel from '../../components/PictureDisplayPanel/PictureDisplayPanel';
import {
  LinkSpan,
  LoginContentBar,
  ParentContent,
} from '../../styles/ContentStyles';
import { toast } from 'react-toastify';
import { NavigateTo } from '../../utils/NavigateTo';

const HomePage: React.FC = () => {
  const userId = parseInt(localStorage.getItem('token') + '');
  const ToggleFavoriteForwardApi = async (
    index: number,
    pictureId: number,
    pictures: any,
  ): Promise<any> => {
    if (
      (await ToggleFavoriteApi(pictureId)) &&
      pictures[index].user.id !== userId
    ) {
      const updatedPictures = [...pictures];
      updatedPictures[index] = {
        ...updatedPictures[index],
        isFavorite: !updatedPictures[index].isFavorite,
      };
      return updatedPictures;
    }
    if (pictures[index].user.id === userId) {
      toast.warning("Can't select your own Picture as favourite");
    }
    return pictures;
  };

  return (
    <>
      {!userId && (
        <ParentContent>
          <LoginContentBar>
            <LinkSpan onClick={() => NavigateTo('/login')}>login</LinkSpan>
            &nbsp; to start sharing your favourite pictures with others!
          </LoginContentBar>
        </ParentContent>
      )}
      <ParentContent>
        <PictureDisplayPanel
          GetAllPicturesApi={GetAllPictures}
          ToggleFavoriteApi={ToggleFavoriteForwardApi}
        />
      </ParentContent>
    </>
  );
};

export default HomePage;
