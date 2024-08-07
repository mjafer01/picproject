import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { styled } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TApp = {
  urlPaths: any;
};

const App: React.FC<TApp> = ({ urlPaths }) => {
  return (
    <>
      <RouterProvider router={urlPaths} />

      <ToastContainer />
    </>
  );
};

export default App;
