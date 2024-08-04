import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Input, Button } from 'antd';

const SharePicModel = styled(Modal)`
  .ant-modal {
    width: 572px;
  }
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 16px;
  }

  .custom-modal-title {
    font-size: 16px;
    font-weight: bold;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  .ant-input {
    margin-bottom: 10px;
  }

  .ant-btn {
    margin-left: 10px;
  }
`;
const InputBox = styled.div`
  height: 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;
const ActionButtonBox = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;

export { SharePicModel, InputBox, ActionButtonBox };
