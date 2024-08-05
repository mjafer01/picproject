import React from 'react';
import { Card } from 'antd';
import Text from '../../styles/Text';
import { styled } from 'styled-components';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { calc } from 'antd/es/theme/internal';

const { Meta } = Card;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const UserInfo = styled.div<{ display: string }>`
  display: ${({ display }) => display};
  align-items: center;
  justify-content: space-between; /* This will push the heart icon to the right */
  margin-top: 5px;
`;
const CardStyle = styled(Card)`
  width: calc(25% - 20px);
  height: 313px;
  background-color: white;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: calc(50% - 20px); /* 50% for two items per row */
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px); /* 50% for two items per row on tablets */
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px); /* 100% for one item per row on mobile */
  }
`;
type PicCardProps = {
  imageSRC: string;
  title: string;
  username: string;
  index: number;
  pictureId: number;
  date: string;
  isFavorite?: boolean;
  onFavoriteUpdate?: (index: number, pictureId: number) => void;
};

const PicCard: React.FC<PicCardProps> = ({
  imageSRC,
  title,
  username,
  date,
  index,
  pictureId,
  isFavorite,
  onFavoriteUpdate,
}) => {
  return (
    <CardStyle
      hoverable
      cover={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <img
            alt={title}
            src={imageSRC}
            width={'91%'}
            height={200}
            style={{ marginTop: 15 }}
          />
        </div>
      }
    >
      <Meta title={title} style={{ textAlign: 'center' }} />
      <Info>
        <UserInfo display={isFavorite === undefined ? 'block' : 'flex'}>
          <Text
            fontSize={15}
            color={'#00000073'}
            padding={0}
            margin={0}
            textAlign={isFavorite === undefined ? 'center' : 'left'}
          >
            {username}
          </Text>
          {isFavorite !== undefined && onFavoriteUpdate && (
            <>
              {isFavorite ? (
                <HeartFilled
                  key="favorite"
                  style={{ marginLeft: 8, color: 'red' }}
                  onClick={() => onFavoriteUpdate(index, pictureId)}
                />
              ) : (
                <HeartOutlined
                  key="favorite"
                  style={{ marginLeft: 8 }}
                  onClick={() => onFavoriteUpdate(index, pictureId)}
                />
              )}
            </>
          )}
        </UserInfo>
        <Text
          fontSize={15}
          color={'#00000073'}
          padding={0}
          margin={0}
          textAlign={isFavorite === undefined ? 'center' : 'left'}
        >
          {date}
        </Text>
      </Info>
    </CardStyle>
  );
};

export default PicCard;
