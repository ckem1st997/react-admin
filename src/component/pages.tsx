import React, { ReactElement, useContext, useEffect, useState } from 'react';
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
  EuiSwitch,
  EuiSwitchEvent,
} from '@elastic/eui';
import Breadcrumbs from './Header';
import EuiSideNav from './EuiSideNav';
import { Link, NavLink, Outlet, redirect, useLocation, useNavigate, useNavigation, useResolvedPath } from 'react-router-dom';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

export const Pages = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(true);
  const navigation = useNavigation();
  const navigate = useNavigate();
 // const { keycloak, initialized } = useKeycloak();



  function decodeToken(str: string) {
    str = str.split('.')[1];

    str = str.replace(/-/g, '+');
    str = str.replace(/_/g, '/');
    switch (str.length % 4) {
      case 0:
        break;
      case 2:
        str += '==';
        break;
      case 3:
        str += '=';
        break;
      default:
        throw 'Invalid token';
    }

    str = decodeURIComponent(escape(atob(str)));

    str = JSON.parse(str);
    return str;
  }


  function setToken(keycloak: any, token: any, refreshToken: any, idToken: any, timeLocal: any) {
    if (keycloak.tokenTimeoutHandle) {
      clearTimeout(keycloak.tokenTimeoutHandle);
      keycloak.tokenTimeoutHandle = null;
    }

    if (refreshToken) {
      keycloak.refreshToken = refreshToken;
      keycloak.refreshTokenParsed = decodeToken(refreshToken);
    } else {
      delete keycloak.refreshToken;
      delete keycloak.refreshTokenParsed;
    }

    if (idToken) {
      keycloak.idToken = idToken;
      keycloak.idTokenParsed = decodeToken(idToken);
    } else {
      delete keycloak.idToken;
      delete keycloak.idTokenParsed;
    }

    if (token) {
      keycloak.token = token;
      keycloak.tokenParsed = decodeToken(token);
      keycloak.sessionId = keycloak.tokenParsed.session_state;
      keycloak.authenticated = true;
      keycloak.subject = keycloak.tokenParsed.sub;
      keycloak.realmAccess = keycloak.tokenParsed.realm_access;
      keycloak.resourceAccess = keycloak.tokenParsed.resource_access;

      if (timeLocal) {
        keycloak.timeSkew = Math.floor(timeLocal / 1000) - keycloak.tokenParsed.iat;
      }

      if (keycloak.timeSkew != null) {
        // logInfo('[KEYCLOAK] Estimated time difference between browser and server is ' + kc.timeSkew + ' seconds');

        if (keycloak.onTokenExpired) {
          var expiresIn = (keycloak.tokenParsed['exp'] - (new Date().getTime() / 1000) + keycloak.timeSkew) * 1000;
          //logInfo('[KEYCLOAK] Token expires in ' + Math.round(expiresIn / 1000) + ' s');
          if (expiresIn <= 0) {
            keycloak.onTokenExpired();
          } else {
            keycloak.tokenTimeoutHandle = setTimeout(keycloak.onTokenExpired, expiresIn);
          }
        }
      }
    } else {
      delete keycloak.token;
      delete keycloak.tokenParsed;
      delete keycloak.subject;
      delete keycloak.realmAccess;
      delete keycloak.resourceAccess;

      keycloak.authenticated = false;
    }
  }

  return (
    <>
      {/* <EuiProgress className={navigation.state !== "loading" ? '' : 'hidden-block'} size="xs" color="accent" /> */}
      {/* <EuiProgress size="xs" color="accent" /> */}

      <Header></Header>
      <EuiPageTemplate>
        <EuiPageTemplate.Sidebar sticky={true}>
          <EuiSideNav></EuiSideNav>
        </EuiPageTemplate.Sidebar>
        <EuiPageTemplate.Header paddingSize='s'>
          <Breadcrumb></Breadcrumb>
        </EuiPageTemplate.Header>

        <EuiPageTemplate.Section grow={false} >
          <Outlet />
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </>


  );
};


// useEffect(() => {
//   console.log(keycloak);
//   const keycloakURL = 'http://localhost:8080/realms/test-auth/protocol/openid-connect/token';
//   const data = new URLSearchParams();
//   data.append('grant_type', 'password');
//   data.append('client_id', 'test-client');
//   data.append('client_secret', 'LmjMgqPNyUiXZrjm0aLS9NRplYs91pjk');
//   data.append('username', 'test');
//   data.append('password', '12345');

//   axios.post(keycloakURL, data, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
//     .then(response => {
//       console.log(response.data);
//       const jsonData = response.data
//       keycloak.token = jsonData.access_token;
//       keycloak.refreshToken = jsonData.refresh_token;
//       keycloak.tokenParsed = { /* Thông tin từ access token được phân tích */ };
//       keycloak.refreshTokenParsed = { /* Thông tin từ refresh token được phân tích */ };
//       let timeLocal = (new Date().getTime() + new Date().getTime()) / 2;
//       setToken(keycloak, jsonData.access_token, jsonData.refresh_token, null, timeLocal)
//       console.log(keycloak);

//     })
//     .catch(error => {
//       console.error(error);
//     });
// }, []);
