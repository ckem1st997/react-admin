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
import { SelectListItem } from "../model/model";


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
        element: <Grid_test />,
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
      }
    ],
  },
]);

export default router;