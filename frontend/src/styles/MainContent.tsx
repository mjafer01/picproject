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
  width: 74vw;
  height: 100%;
`;
const ParentContent = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

export { ParentContent, MainContent, LazyContent };
