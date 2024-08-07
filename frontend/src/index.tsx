import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import RoutePathUtil from './utils/RoutePathUtil';
import RoutePaths from './constants/RoutePaths';
import disableConsoleWarnings from './utils/disableConsoleWarnings';
disableConsoleWarnings();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App urlPaths={RoutePathUtil(createBrowserRouter, RoutePaths)} />
  </React.StrictMode>,
);
