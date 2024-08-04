import { styled } from 'styled-components';

interface TextProps {
  color: string;
  fontSize: number;
}
const Text = styled.p<TextProps>`
  ${({ fontSize }) => fontSize !== undefined && `font-size: ${fontSize}px;`}
  ${({ color }) => color !== undefined && `color: ${color};`}
    font-family: Roboto, serif;
`;

export default Text;
