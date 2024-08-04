import { styled } from 'styled-components';

const BarContainer = styled.div`
  width: 100%;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
`;
const MobileMenuDiv = styled.div`
  width: 40px;
  height: 64px;
  display: flex;
  align-content: center;
`;
const BarSpace = styled.div`
  width: 3.15%;
  max-width: 40px;
  min-width: 2px;
  height: 64px;
  display: flex;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

export { BarContainer, BarSpace, ButtonDiv, MobileMenuDiv };
