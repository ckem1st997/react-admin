import { useContext, useState } from 'react'
import reactLogo from './logo.svg'
import viteLogo from './logo.svg'
import './App.css'
import React from 'react';
import { EuiPageTemplate, EuiPageSection, EuiImage, EuiAvatar, EuiSpacer, EuiTitle, EuiIcon, EuiProgress } from '@elastic/eui';
import singleSvg from '../../images/single.svg';
import contentCenterSvg from '../../images/content_center.svg';
import Search_Menu from './component/Search_Menu';
import { ThemeProvider, css } from '@emotion/react';
import Grid_test from './component/grid_test';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route, RouterProvider, useLocation } from 'react-router-dom';
import Blogs from './component/blog';
import Home from './component/home';
import router from './routes';
function App() {
  // const location = useLocation();
  return (
    <>
      {/* <RouterProvider  router={router} fallbackElement={<p>Loading...</p>} />; */}
      <div>
        <EuiProgress size="xs" color="accent" />
      </div>
    </>
  )
}

export default App
// if (import.meta.hot) {
//   import.meta.hot.dispose(() => router.dispose());
// }