import { styled } from 'styled-components';

interface TitleBarProps {
  width: number;
  height: number;
}

const TitleBar = styled.div<TitleBarProps>`
  ${({ width }) => width !== undefined && `width: ${width}px;`}
  ${({ height }) => height !== undefined && `height: ${height}px;`}
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export default TitleBar;
