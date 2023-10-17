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
function App() {
  const [count, setCount] = useState(0)
  return (
    <>

      <EuiAvatar name="Management" iconType="managementApp" />
      <Search_Menu></Search_Menu>
      <Grid_test></Grid_test>
    </>
  )
}

export default App
