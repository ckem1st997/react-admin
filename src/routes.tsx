import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/home";
import Blogs from "./component/blog";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout key="layput" />,
    children: [
      {
        path: "/",
        element: <Home text="Trang chủ" key="Home" />,
        children: [

          {
            path: "home/home1",
            element: <Home text="Home 1232432" key="Home1" />,
          },
          {
            path: "home/home2",
            element: <Home text="Home 4324324322" key="Home2" />,
          },

        ]
      },
      {
        path: "blogs",
        element: <Blogs />,
      }
    ],
  },
]);

export default router;