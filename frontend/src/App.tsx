import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { styled } from 'styled-components';

type TApp = {
  urlPaths: any;
};

const App: React.FC<TApp> = ({ urlPaths }) => {
  return <RouterProvider router={urlPaths} />;
};

export default App;
