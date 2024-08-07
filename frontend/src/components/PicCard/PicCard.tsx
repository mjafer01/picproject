import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import Text from '../../styles/Text';
import { styled } from 'styled-components';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {
  PicCardInfo,
  PicCardStyle,
  PicCardUserInfo,
  PicModal,
  PicModalContent,
  PicModalImage,
} from '../../styles/PicCardStyles';
import PicCardProps from './PicCardProps.d';

const { Meta } = Card;

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <PicCardStyle
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
              style={{ marginTop: 15, cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          </div>
        }
      >
        <Meta title={title} style={{ textAlign: 'center' }} />
        <PicCardInfo>
          <PicCardUserInfo
            display={isFavorite === undefined ? 'block' : 'flex'}
          >
            <Text
              fontSize={15}
              color={'#00000073'}
              padding={0}
              margin={0}
              textalign={isFavorite === undefined ? 'center' : 'left'}
            >
              {username}
            </Text>
            {isFavorite !== undefined && onFavoriteUpdate && (
              <>
                {isFavorite ? (
                  <HeartFilled
                    key="favorite"
                    data-testid={`heart-filled-${pictureId}`}
                    style={{ marginLeft: 8, color: 'red' }}
                    onClick={() => onFavoriteUpdate(index, pictureId)}
                  />
                ) : (
                  <HeartOutlined
                    key="favorite"
                    data-testid={`heart-outlined-${pictureId}`}
                    style={{ marginLeft: 8 }}
                    onClick={() => onFavoriteUpdate(index, pictureId)}
                  />
                )}
              </>
            )}
          </PicCardUserInfo>
          <Text
            fontSize={15}
            color={'#00000073'}
            padding={0}
            margin={0}
            textalign={isFavorite === undefined ? 'center' : 'left'}
          >
            {date}
          </Text>
        </PicCardInfo>
      </PicCardStyle>

      <PicModal
        open={isModalVisible}
        footer={null}
        onCancel={handleModalCancel}
        centered
        style={{ top: 20 }}
        width={'80%'}
      >
        <PicModalContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 20px',
              color: '#fff',
            }}
          >
            <Text fontSize={15} color={'#fff'} padding={0} margin={0}>
              {username}
            </Text>
            <Text fontSize={15} color={'#fff'} padding={0} margin={0}>
              {date}
            </Text>
          </div>
          <PicModalImage
            alt={title}
            src={imageSRC}
            style={{
              marginTop: 10,
            }}
          />
        </PicModalContent>
      </PicModal>
    </>
  );
};

export default PicCard;
