import { useContext, useState } from 'react'
import reactLogo from './logo.svg'
import viteLogo from './logo.svg'
import './App.css'
import React from 'react';
import { EuiPageTemplate, EuiPageSection, EuiImage, EuiAvatar, EuiSpacer, EuiTitle, EuiIcon } from '@elastic/eui';
import singleSvg from '../../images/single.svg';
import contentCenterSvg from '../../images/content_center.svg';
import Search_Menu from './component/Search_Menu';
import { ThemeProvider, css } from '@emotion/react';
import Grid_test from './component/grid_test';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './component/blog';
import Home from './component/home';
import { Pages } from './component/pages';
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Pages />
      {/* <Layout></Layout> */}
      {/* <BrowserRouter>
      <Routes>
        <Route  element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="pages" element={<Pages />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App
