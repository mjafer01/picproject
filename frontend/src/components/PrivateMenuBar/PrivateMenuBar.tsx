import React, { useEffect, useState } from 'react';
import {
  BarContainer,
  BarSpace,
  ButtonDiv,
  LeftMenuBox,
  MobileMenuDiv,
  RightMenuDiv,
  RightElementDiv,
} from '../../styles/BarContainer';
import { AppTitle, PrimaryButton } from '../index';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Drawer, Modal, Button } from 'antd';
import { Input } from '../../styles/Input';
import {
  SharePicModel,
  InputBox,
  ActionButtonBox,
} from '../../styles/SharePicModal';
import SharePictureApi from '../../apis/pictures/SharePictureApi';
import { toast } from 'react-toastify';

const PrivateMenuBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pictureUrl, setPictureUrl] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    toast.loading('Processing request please wait..');
    if (!pictureUrl && !title) {
      toast.dismiss();
      toast.error('Url and Title of a picture are required');
      return;
    }
    await SharePictureApi(pictureUrl, title);
    navigate('/');
    toast.dismiss();
    toast.success('Picture shared');
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BarContainer>
      <BarSpace />
      {isMobile && (
        <MobileMenuDiv>
          <MenuOutlined onClick={showDrawer} />

          <Drawer
            title="PicShare"
            placement="left"
            onClose={onClose}
            visible={visible}
            width={250}
          >
            <PrimaryButton
              value={'Login'}
              width={78}
              height={24}
              onClick={handleClick}
            >
              Log in
            </PrimaryButton>
          </Drawer>
        </MobileMenuDiv>
      )}
      <AppTitle />
      {!isMobile && (
        <RightMenuDiv>
          <LeftMenuBox
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </LeftMenuBox>
          <LeftMenuBox
            onClick={() => {
              navigate('/favorites');
            }}
          >
            Favourite
          </LeftMenuBox>
          <ButtonDiv>
            <PrimaryButton width={78} height={24} onClick={handleClick}>
              Share Pic
            </PrimaryButton>
            <RightElementDiv paddingLeft={20}>
              Hi {localStorage.getItem('username') ?? ''}
            </RightElementDiv>

            <RightElementDiv paddingLeft={20}>
              <PrimaryButton
                width={64}
                height={24}
                type={'link'}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  navigate('/favorites');
                }}
              >
                Logout
              </PrimaryButton>
            </RightElementDiv>
          </ButtonDiv>
        </RightMenuDiv>
      )}
      <BarSpace />

      <SharePicModel
        title={<span className="custom-modal-title">Share A New Picture</span>}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <ActionButtonBox>
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>

            <Button key="submit" type="primary" onClick={handleModalOk}>
              Share
            </Button>
          </ActionButtonBox>,
        ]}
      >
        <InputBox>
          <Input
            placeholder="New picture URL"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            width={216}
            height={32}
          />
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            width={216}
            height={32}
          />
        </InputBox>
      </SharePicModel>
    </BarContainer>
  );
};

export default PrivateMenuBar;
