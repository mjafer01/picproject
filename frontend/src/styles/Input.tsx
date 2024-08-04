import { styled } from 'styled-components';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

interface InputProps extends AntInputProps {
  width?: number;
  height?: number;
}

const Input = styled(AntInput)<InputProps>`
  ${({ width }) => width !== undefined && `width: ${width}px;`}
  ${({ height }) => height !== undefined && `height: ${height}px;`}
  font-size: 14px;
  font-family: Roboto, Serif;
`;

export { Input };
export type { InputProps };
