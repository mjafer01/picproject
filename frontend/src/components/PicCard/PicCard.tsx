import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import Text from '../../styles/Text';
import { styled } from 'styled-components';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const UserInfo = styled.div<{ display: string }>`
  display: ${({ display }) => display};
  align-items: center;
  justify-content: space-between;
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
    width: calc(50% - 20px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0);
  padding: 20px;
  color: #fff;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;

const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
  }
  .ant-modal-body {
    background-color: rgba(
      0,
      0,
      0,
      0.8
    ); /* Darker background with transparency */
    padding: 0;
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
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
              style={{ marginTop: 15, cursor: 'pointer' }}
              onClick={handleImageClick}
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

      <CustomModal
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalCancel}
        centered
        bodyStyle={{ padding: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        style={{ top: 20 }}
        width={'80%'}
      >
        <ModalContent>
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
          <ModalImage
            alt={title}
            src={imageSRC}
            style={{
              marginTop: 10,
            }}
          />
        </ModalContent>
      </CustomModal>
    </>
  );
};

export default PicCard;
