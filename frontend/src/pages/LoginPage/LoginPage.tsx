import React from 'react';
import { ParentContent, MainContent } from '../../styles/MainContent';
import { AppTitle, PrimaryButton } from '../../components';
import Text from '../../styles/Text';
import { Input } from '../../styles/Input';
import { TemplateSpace } from '../../styles/AfterMenuSpace';
import LoginApi from '../../apis/users/LoginApi';
import { useNavigate } from 'react-router-dom';
import { Modal, Skeleton } from 'antd';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const success = await LoginApi(username);
    setLoading(false);

    if (success) {
      navigate('/');
    } else {
      Modal.error({
        title: 'Login Failed',
        content: 'Something has gone wrong. Please try again.',
      });
    }
  };

  return (
    <ParentContent>
      <MainContent>
        <AppTitle />
        <Text fontSize={15} color={'#00000073'}>
          Login to start sharing
        </Text>
        <TemplateSpace height={15} maxHeight={15} />
        {loading ? (
          <Skeleton.Input active style={{ width: 216, height: 32 }} />
        ) : (
          <Input
            width={216}
            height={32}
            placeholder={'Username'}
            value={username}
            onChange={(event: any) => {
              setUsername(event.target.value);
            }}
          />
        )}
        <TemplateSpace height={20} maxHeight={20} />
        {loading ? (
          <Skeleton.Button active style={{ width: 71, height: 32 }} />
        ) : (
          <PrimaryButton width={71} height={32} onClick={onSubmit}>
            Login
          </PrimaryButton>
        )}
      </MainContent>
    </ParentContent>
  );
};

export default LoginPage;
