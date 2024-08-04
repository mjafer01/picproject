import { styled } from 'styled-components';
import { ButtonProps as AntButtonProps } from 'antd/es/button/button';

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
const RightMenuDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: 45px;
`;
const LeftMenuBox = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 64px;
  display: flex;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
interface RightElementDivProps {
  paddingLeft: number;
}
const RightElementDiv = styled.div<RightElementDivProps>`
  ${({ paddingLeft }) =>
    paddingLeft !== undefined && `padding-left: ${paddingLeft}px;`}
  font-size: 12px;
  color: #000000;
  display: flex;
  align-items: center;
`;

const CustomModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  height: 56px;
  width: 572px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export {
  BarContainer,
  BarSpace,
  ButtonDiv,
  MobileMenuDiv,
  LeftMenuBox,
  RightMenuDiv,
  RightElementDiv,
  CustomModalTitle,
};
