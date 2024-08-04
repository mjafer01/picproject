import { styled } from 'styled-components';

interface TemplateSpaceProps {
  height: number;
  maxHeight: number;
}
const TemplateSpace = styled.div<TemplateSpaceProps>`
  ${({ height }) => height !== undefined && `height: ${height}vh;`}
  ${({ maxHeight }) => maxHeight !== undefined && `max-height: ${maxHeight}px;`}
  width: 100%;
  display: block;
`;

export { TemplateSpace };
