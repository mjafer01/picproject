import { styled } from 'styled-components';

const MainContent = styled.div`
  display: flex;
  width: 74vw;
  height: 91vh;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const LazyContent = styled.div`
  display: flex;
  width: 78vw;
  height: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const ParentContent = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
const LoginContentBar = styled.p`
  display: flex;
  width: 76.5vw;
  height: 42px;
  border-radius: 4px;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Roboto, Serif;
  flex-direction: row;
`;
const LinkSpan = styled.span`
  cursor: pointer;
  color: #1890ff;
  display: inline;
`;
const LinkMenu = styled.span`
  cursor: pointer;
  color: #1890ff;
  display: block;
  margin-top: 10px;
`;

export {
  ParentContent,
  MainContent,
  LazyContent,
  LoginContentBar,
  LinkSpan,
  LinkMenu,
};
