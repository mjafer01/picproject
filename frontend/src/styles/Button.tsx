import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { styled } from 'styled-components';

interface ButtonProps extends AntButtonProps {
  width?: number;
  height?: number;
}

const Button = styled(AntButton)<ButtonProps>`
  ${({ width }) => width !== undefined && `width: ${width}px;`}
  ${({ height }) => height !== undefined && `height: ${height}px;`}
  font-size: 14px;
  font-family: Roboto, Serif;
`;

export { Button };
export type { ButtonProps };
