import React, { ReactElement, useEffect, useState } from 'react';
import {
  EuiText,
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiPageSidebarProps,
  EuiButton,
  EuiPageHeader,
  EuiGlobalToastList,
  EuiToast,
  EuiProgress,
} from '@elastic/eui';
import Breadcrumbs from './Header';
import EuiSideNav from './EuiSideNav';
import { Link, NavLink, Outlet, redirect, useLocation, useNavigate, useNavigation, useResolvedPath } from 'react-router-dom';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { text } from 'stream/consumers';

export const Pages = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(true);
  const navigation = useNavigation();
  const navigate = useNavigate();
  // Sử dụng useEffect để theo dõi thay đổi trong location (URL)
  useEffect(() => {
    //redirect(location.pathname)
  }, [location.pathname]);
  return (
    <>
      {/* <EuiProgress className={navigation.state !== "loading" ? '' : 'hidden-block'} size="xs" color="accent" /> */}
      <Header></Header>
      <EuiPageTemplate>
        <EuiPageTemplate.Sidebar  sticky={true}>
          <EuiSideNav></EuiSideNav>
        </EuiPageTemplate.Sidebar>
        <EuiPageTemplate.Header paddingSize='m'>
          <Breadcrumb></Breadcrumb>
        </EuiPageTemplate.Header>

        <EuiPageTemplate.Section grow={false} >
          <main>
            <Outlet />
          </main>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </>


  );
};
