import { styled } from 'styled-components';

interface TemplateSpaceProps {
  height: number;
  maxheight: number;
}
const TemplateSpace = styled.div<TemplateSpaceProps>`
  ${({ height }) => height !== undefined && `height: ${height}vh;`}
  ${({ maxheight }) => maxheight !== undefined && `max-height: ${maxheight}px;`}
  width: 100%;
  display: block;
`;

export { TemplateSpace };
