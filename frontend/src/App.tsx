import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { styled } from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
type TApp = {
  urlPaths: any;
};

const App: React.FC<TApp> = ({ urlPaths }) => (
  <AppContainer>
    <RouterProvider router={urlPaths} />
  </AppContainer>
);

export default App;
