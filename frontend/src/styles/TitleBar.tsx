import { styled } from 'styled-components';

interface TitleBarProps {
  width: number;
  height: number;
  activateHandleCursor?: true;
}

const TitleBar = styled.div<TitleBarProps>`
  ${({ width }) => width !== undefined && `width: ${width}px;`}
  ${({ height }) => height !== undefined && `height: ${height}px;`}
  ${({ activateHandleCursor }) =>
    activateHandleCursor !== undefined && 'cursor: pointer;'}
  display: flex;
  align-items: center;
`;

export default TitleBar;
