import { styled } from 'styled-components';
import { Card, Modal } from 'antd';

const PicCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const PicCardUserInfo = styled.div<{ display: string }>`
  display: ${({ display }) => display};
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const PicCardStyle = styled(Card)`
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

const PicModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0);
  padding: 20px;
  color: #fff;
`;

const PicModalImage = styled.img`
  width: 100%;
  height: auto;
`;

const PicModal = styled(Modal)`
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
  padding: 0;
  background-color: 'rgba(0, 0, 0, 0.8)';
`;

export {
  PicCardInfo,
  PicCardUserInfo,
  PicCardStyle,
  PicModalContent,
  PicModalImage,
  PicModal,
};
