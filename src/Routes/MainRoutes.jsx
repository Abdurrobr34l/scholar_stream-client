import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage404 from "../Pages/Error Pages/ErrorPage404";

export const router = createBrowserRouter([
  //* HOMEPAGE ROUTES
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "*",
        Component: ErrorPage404
      }
    ]
  }
])