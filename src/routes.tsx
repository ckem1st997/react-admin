import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/home";
import Blogs from "./component/blog";
import Grid_test from "./component/grid_test";
import { Pages } from "./component/pages";
import _404 from "./component/_404";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages key="layput" />,
    errorElement: <_404 />,
    children: [
      {
        path: "/",
        element: <Home text="Trang chủ" key="Home" />,
        children: [

          {
            path: "/home1",
            element: <Home text="Home 1232432" key="Home1" />,
          },
          {
            path: "/home2",
            element: <Home text="Home 4324324322" key="Home2" />,
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