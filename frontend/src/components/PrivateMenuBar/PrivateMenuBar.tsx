import React, { useEffect, useState } from 'react';
import {
  BarContainer,
  BarSpace,
  ButtonDiv,
  LeftMenuBox,
  MobileMenuDiv,
  RightMenuDiv,
  RightElementDiv, LeftMenuActiveBox,
} from '../../styles/BarContainer';
import { PrimaryButton } from '../index';
import AppTitle from '../AppTitle/AppTitle';
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
import { LinkMenu } from '../../styles/ContentStyles';
type PrivateMenuBarProps = {
  activemenu?:string
}

const PrivateMenuBar: React.FC<PrivateMenuBarProps> = ({activemenu}) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 650 ?? false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pictureUrl, setPictureUrl] = useState('');
  const [title, setTitle] = useState('');
  const username = localStorage.getItem('username');

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

  const LeftMenu = (title:string,link:string) =>{

    if(title === activemenu){
      return (<LeftMenuActiveBox
        onClick={() => {
          navigate(link);
        }}
      >
        {title}
      </LeftMenuActiveBox>)
    }
    return (<LeftMenuBox
      onClick={() => {
        navigate(link);
      }}
    >
      {title}
    </LeftMenuBox>)
  }

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
            open={visible}
            width={250}
          >
            <>Hi {username + ''}</>
            <LinkMenu
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </LinkMenu>
            <LinkMenu
              onClick={() => {
                navigate('/favorites');
              }}
            >
              Favorite
            </LinkMenu>
            <LinkMenu>
              <PrimaryButton width={78} height={24} onClick={handleClick}>
                Share Pic
              </PrimaryButton>
            </LinkMenu>
            <LinkMenu>
              <PrimaryButton
                width={64}
                height={24}
                type={'link'}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  navigate('/');
                }}
              >
                Logout
              </PrimaryButton>
            </LinkMenu>
          </Drawer>
        </MobileMenuDiv>
      )}
      <AppTitle />
      {!isMobile && (
        <RightMenuDiv>
          {LeftMenu ('Home','/')}
          {LeftMenu ('Favourite','/favorites')}
          <ButtonDiv>
            <PrimaryButton width={78} height={24} onClick={handleClick}>
              Share Pic
            </PrimaryButton>
            <RightElementDiv paddingLeft={20}>
              Hi {username ?? ''}
            </RightElementDiv>

            <RightElementDiv paddingLeft={20}>
              <PrimaryButton
                width={64}
                height={24}
                type={'link'}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  navigate('/');
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
        open={isModalVisible}
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
