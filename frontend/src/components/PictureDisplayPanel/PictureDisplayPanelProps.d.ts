type PictureDisplayPanelProps = {
  GetAllPicturesApi: (page: number, limit: number) => Promise<any>;
  ToggleFavoriteApi: (
    index: number,
    pictureId: number,
    pictures: any,
  ) => Promise<any>;
};
export default PictureDisplayPanelProps;
