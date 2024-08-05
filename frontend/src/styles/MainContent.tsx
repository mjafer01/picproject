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

export { ParentContent, MainContent, LazyContent };
