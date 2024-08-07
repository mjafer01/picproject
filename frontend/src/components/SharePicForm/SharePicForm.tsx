import { Button } from 'antd';
import { Input } from '../../styles/Input';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SharePictureApi from '../../apis/pictures/SharePictureApi';
import {
  SharePicModel,
  InputBox,
  ActionButtonBox,
} from '../../styles/SharePicModal';

type SharePicFormProps = {
  isModalVisible: boolean;
  handleModalCancel: () => void;
};

const SharePicForm: React.FC<SharePicFormProps> = ({
  isModalVisible,
  handleModalCancel,
}) => {
  const [pictureUrl, setPictureUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleModalOk = async () => {
    toast.loading('Processing request please wait..');
    if (!pictureUrl && !title) {
      toast.dismiss();
      toast.error('Url and Title of a picture are required');
      return;
    }
    await SharePictureApi(pictureUrl, title);
    toast.dismiss();
    toast.success('Picture shared');
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
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
  );
};
export default SharePicForm;
