import React from 'react';
import { ParentContent, MainContent } from '../../styles/MainContent';
import { AppTitle, PrimaryButton } from '../../components';
import Text from '../../styles/Text';
import { Input } from '../../styles/Input';
import { TemplateSpace } from '../../styles/AfterMenuSpace';
import LoginApi from '../../apis/users/LoginApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>('');

  const onSubmit = async () => {
    toast.loading('Logging in');
    if (username === '') {
      toast.dismiss();
      toast.error('Login Failed');
    }
    const success = await LoginApi(username);

    if (success) {
      navigate('/');
      toast.dismiss();
      toast.success('Logging in successfully');
    } else {
      toast.dismiss();
      toast.error('Login Failed');
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

        <Input
          width={216}
          height={32}
          placeholder={'Username'}
          value={username}
          onChange={(event: any) => {
            setUsername(event.target.value);
          }}
        />

        <TemplateSpace height={20} maxHeight={20} />

        <PrimaryButton width={71} height={32} onClick={onSubmit}>
          Login
        </PrimaryButton>
      </MainContent>
    </ParentContent>
  );
};

export default LoginPage;
