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
        element: <p>Homeeeeeeeeeeeeeeeeee</p>,
        handle: {
          crumb: () => "/",
        }
      },
      {
        path: "home",
        element: <Home text="Trang chủ" />,
        handle: {
          // crumb: () => <Link to="/messages">Messages1</Link>,
          crumb: () => "/home",
        },
        children: [

          {
            path: "grid",
            element: <Grid_test key="homemmm" />,
            handle: {
              crumb: () => "/grid",
            },
            children: [
              {
                path: "home2",
                element:  <Home text="Home dsafs" />,
                handle: {
                  crumb: () => "/home2",
                },
              }
            ]
          },
          {
            path: "home1",
            element: <Home text="Home 4324324322" />,
            handle: {
              crumb: () => "/home1",
            },

          },

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