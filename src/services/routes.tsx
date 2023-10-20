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
import Details from "../component/_details";
import _details from "../component/_details";


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
          crumb: () => {return {
            url:"/",
            name:"dsadsadsa"
          }},
        }
      },
      {
        path: "/home",
        // element: <p>Home</p>,
        handle: {
          crumb: () => "/home",
        },

        children: [
          {
            path: "grid",
            element: <Grid_test />,
            handle: {
              crumb: () => "/grid",
            },
            children: [
              {
                path: ":id",
                element: <Details />,
                handle: {
                  crumb: () => "/:id",
                },
              }
            ]
          },
          {
            path: "home",
            element: <Home text="dsadsadsa" key="44fdsfdsfds" />,
            handle: {
              crumb: () => "/home",
            },

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
      },
      {
        path: "grid/:id",
        element: <Details />,
      }
    ],
  },
]);

export default router;