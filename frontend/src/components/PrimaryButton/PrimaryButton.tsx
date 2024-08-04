import React from 'react';
import { Button, ButtonProps } from '../../styles/Button';

const PrimaryButton: React.FC<ButtonProps> = ({ width, height, ...rest }) => {
  return <Button type={'primary'} width={width} height={height} {...rest} />;
};
export default PrimaryButton;
