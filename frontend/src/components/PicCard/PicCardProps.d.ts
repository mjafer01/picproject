type PicCardProps = {
  imageSRC: string;
  title: string;
  username?: string;
  index: number;
  pictureId: number;
  date?: string;
  isFavorite?: boolean;
  onFavoriteUpdate?: (index: number, pictureId: number) => void;
};
export default PicCardProps;
