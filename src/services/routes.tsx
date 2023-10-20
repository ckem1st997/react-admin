import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import Layout from "../component/Layout";
import Home from "../component/home";
import Blogs from "../component/blog";
import Grid_test from "../component/grid_test";
import { Pages } from "../component/pages";
import _404 from "../component/_404";


const router = createBrowserRouter([
  {
    // path: "/",
    element: <Pages />,
    errorElement: <_404 />,
    children: [
      {
        path: "/",
        element: <Home text="Trang chủ" />,
        handle: {
          crumb: () => "/",
        }
      },
      {
        path: "home",
        element: <p>Home</p>,
        handle: {
          crumb: () => "/home",
        },
        children: [
          {
            path: "grid",
            element: <Grid_test key="homemmm" />,
            handle: {
              crumb: () => "/grid",
            }
          },
          {
            path: "home",
            element: <Home text="dsadsadsa" key="44fdsfdsfds" />,
            handle: {
              crumb: () => "/home",
            }
          }
        ]
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "pages",
        element: <Pages />,
      },
      {
        path: "grid",
        element: <Grid_test />,
      }
    ],
  },
]);

export default router;