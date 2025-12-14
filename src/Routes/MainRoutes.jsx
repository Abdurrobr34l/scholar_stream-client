import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage404 from "../Pages/Error Pages/ErrorPage404";
import Register from "../Pages/AuthenicationPages/Register";
import Login from "../Pages/AuthenicationPages/Login";
import AllScholarship from "../Pages/Scholarships/AllScholarship";

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
      //* SCHOLARSHIPS ROUTES
      {
        path: "/all-scholarships",
        Component: AllScholarship
      },
      //* AUTHENTICATION ROUTES
      {
        path: "/register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      //* ERROR PAGE ROUTE
      {
        path: "*",
        Component: ErrorPage404
      }
    ]
  }
])