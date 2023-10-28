import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode >
    {/* <ToastContainer
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
    /> */}
    <MantineProvider defaultColorScheme="dark">
      <ModalsProvider >
      
        <Notifications  position="top-center" autoClose={3000} />
        <App />
      </ModalsProvider>

    </MantineProvider>

  </React.StrictMode>
);
reportWebVitals();


