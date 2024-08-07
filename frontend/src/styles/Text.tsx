import { styled } from 'styled-components';

interface TextProps {
  color: string;
  fontSize: number;
  padding?: number;
  margin?: number;
  textalign?: string;
}
const Text = styled.p<TextProps>`
  ${({ fontSize }) => fontSize !== undefined && `font-size: ${fontSize}px;`}
  ${({ color }) => color !== undefined && `color: ${color};`}
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ margin }) => margin !== undefined && `margin: ${margin};`}
  ${({ textalign }) => textalign !== undefined && `text-align: ${textalign};`}
    font-family: Roboto, serif;
`;

export default Text;
