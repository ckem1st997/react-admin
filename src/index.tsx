import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EuiProgress, EuiProvider, euiStylisPrefixer } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import createCache from '@emotion/cache';


const container = document.querySelector('meta[name="emotion-styles"]');
const cache = createCache({
  key: 'eui',
  container: container || undefined,
  stylisPlugins: [euiStylisPrefixer],

});
cache.compat = true;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode >
    <RouterProvider router={router} />
    {/* <EuiProgress size="xs" color="accent" /> */}
    <EuiProvider colorMode="light" cache={cache}>
      <App />
    </EuiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


