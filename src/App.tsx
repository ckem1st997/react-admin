import { createContext, useContext, useState } from 'react'
import reactLogo from './logo.svg'
import viteLogo from './logo.svg'
import './App.css'
import React from 'react';
import { EuiPageTemplate, EuiPageSection, EuiImage, EuiAvatar, EuiSpacer, EuiTitle, EuiIcon, EuiProgress, EuiProvider, euiStylisPrefixer, EuiThemeColorMode } from '@elastic/eui';
import singleSvg from '../../images/single.svg';
import contentCenterSvg from '../../images/content_center.svg';
import Search_Menu from './component/Search_Menu';
import { ThemeProvider, css } from '@emotion/react';
import Grid_test from './component/grid_test';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route, RouterProvider, useLocation } from 'react-router-dom';
import Blogs from './component/blog';
import Home from './component/home';
import router from './services/routes';
import createCache from '@emotion/cache';
import { ToastContainer } from 'react-toastify';
//css
import 'react-toastify/dist/ReactToastify.css';
import '@elastic/eui/dist/eui_theme_light.min.css';

import { ThemeToggeContext } from './default/Context';
// import dotenv from 'dotenv';


// // Load environment variables from .env
// dotenv.config();
const container = document.querySelector('meta[name="emotion-styles"]');
const cache = createCache({
  key: 'eui',
  container: container || undefined,
  stylisPlugins: [euiStylisPrefixer],

});
cache.compat = true;


function App() {
  // const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {/* <ReactKeycloakProvider authClient={keycloak}> */}

      <RouterProvider router={router} />
      <EuiProvider colorMode='light' cache={cache}>
      </EuiProvider>
      {/* </ReactKeycloakProvider> */}
    </>
  )
}

export default App
// if (import.meta.hot) {
//   import.meta.hot.dispose(() => router.dispose());
// }