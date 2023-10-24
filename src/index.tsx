import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EuiEmptyPrompt, EuiErrorBoundary, EuiProgress, EuiProvider, euiStylisPrefixer } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.min.css';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom"; import router from './services/routes';
import createCache from '@emotion/cache';
import UserService from './auth/userService';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/keyclodk';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode >
    <App />
 // </React.StrictMode>
);
//UserService.initKeycloak(renderApp);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


