import React from 'react';
import { Card } from 'antd';
import { LazyContent, ParentContent } from '../../styles/MainContent';
import Text from '../../styles/Text';
import { styled } from 'styled-components';
import { HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* This will push the heart icon to the right */
  margin-top: 5px;
`;

const HomePage: React.FC = () => {
  return (
    <ParentContent>
      <LazyContent>
        <Card
          hoverable
          style={{
            width: 220,
            height: 313,
            backgroundColor: 'white',
            borderRadius: 4,
          }}
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
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                width={200}
                height={200}
                style={{ marginTop: 15 }}
              />
            </div>
          }
        >
          <Meta title="Europe Street beat" />
          <Info>
            <UserInfo>
              <Text fontSize={15} color={'#00000073'} padding={0} margin={0}>
                Neekey Ni
              </Text>
              <HeartOutlined key="favorite" style={{ marginLeft: 8 }} />
            </UserInfo>
            <Text fontSize={15} color={'#00000073'} padding={0} margin={0}>
              09/12/2023
            </Text>
          </Info>
        </Card>
      </LazyContent>
    </ParentContent>
  );
};

export default HomePage;
