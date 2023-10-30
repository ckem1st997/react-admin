import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  json,
  Link,
  redirect,
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
import { SelectListItem } from "../model/model";
import Tableexample from "../component/tableexample";
import Tablememory from "../component/tablememory";
import ResponseHander from "../default/baseResponseHander";
import { LayputAuth } from "../component/login/_layoutAuth";
import { AuthenticationTitle } from "../component/login/_login";
import { IAuthProvider, protectedLoader, useAuth } from "../extension/IAuthProvider";

const router = createBrowserRouter([
  {
    // path: "/",
    id: "root",
    element: <Pages />,
    errorElement: <ResponseHander />,
    action: async ({ request }) => {
      // if (auth)
         return protectedLoader;
    },
    children: [
      {
        path: "/",
        element: <Home text="Trang chủ" />,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: false,
              Group: null,
              Selected: false,
              Text: "",
              Value: ""
            };
            model.Text = "Trang chủ";
            model.Value = "/";
            return model;
          },
        }
      },
      {
        path: "/unit",
        // element: <p>Home</p>,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: true,
              Group: null,
              Selected: false,
              Text: "",
              Value: ""
            };
            model.Text = "Quản lý vật tư";
            model.Value = "/unit";
            return model;
          },
        },
        children: [
          {
            path: "grid",
            element: <Grid_test />,
            handle: {
              crumb: () => {
                let model: SelectListItem = {
                  Disabled: true,
                  Group: null,
                  Selected: false,
                  Text: "",
                  Value: ""
                };
                model.Text = "Danh sách vật tư";
                model.Value = "/grid";
                return model;
              },
            },
            children: [
              {
                path: ":id",
                element: <Details />,
                handle: {
                  crumb: () => {
                    let model: SelectListItem = {
                      Disabled: false,
                      Group: null,
                      Selected: false,
                      Text: "",
                      Value: ""
                    };
                    model.Text = "Chi tiết vật tư";
                    model.Value = "/:id";
                    return model;
                  },
                },
              }
            ]
          },
          {
            path: "home",
            element: <Home text="dsadsadsa" key="44fdsfdsfds" />,
            handle: {
              crumb: () => {
                let model: SelectListItem = {
                  Disabled: false,
                  Group: null,
                  Selected: false,
                  Text: "",
                  Value: ""
                };
                model.Text = "Trang chủ vật tư";
                model.Value = "/home";
                return model;
              },
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
        element: <Tablememory />,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: false,
              Group: null,
              Selected: false,
              Text: "",
              Value: ""
            };
            model.Text = "Danh sách kho";
            model.Value = "/grid";
            return model;
          },
        },
      },
      {
        path: "grid/:id",
        element: <Details />,
      },

    ],


  },
  {
    path: "auth",
    element: <LayputAuth />, // Define your Auth layout component here
    children: [
      {
        path: "login",
        element: <AuthenticationTitle />, // Create a Login page component
      },

      // Add more authentication-related routes here
    ],
  },
]);

export default router;