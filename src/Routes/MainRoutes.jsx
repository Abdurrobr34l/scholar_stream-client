import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage404 from "../Pages/Error Pages/ErrorPage404";
import Register from "../Pages/AuthenicationPages/Register";
import Login from "../Pages/AuthenicationPages/Login";
import AllScholarship from "../Pages/Scholarships/AllScholarship";
import ScholarshipDetail from "../Pages/Scholarships/ScholarshipDetail";
import DashboardLayout from "../Layouts/DashboardLayout";
import PaymentSuccess from "../Pages/Dashboard.jsx/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard.jsx/PaymentCancelled";
import MyProfile from "../Pages/Dashboard.jsx/MyProfile/MyProfile";
import MyApplications from "../Pages/Dashboard.jsx/UserPages/MyApplications";
import MyReviews from "../Pages/Dashboard.jsx/UserPages/MyReviews";
import ManageApplications from "../Pages/Dashboard.jsx/ModeratorPages/ManageApplications";
import AllReviews from "../Pages/Dashboard.jsx/ModeratorPages/AllReviews";

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
      {
        path: "/all-scholarships/:id",
        Component: ScholarshipDetail
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
  },

  //* DASHBOARD ROUTES
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      //todo ALL ROLE PROFILE ROUTE
      {
        path: "my-profile",
        Component: MyProfile
      },
      //todo MODERATOR ALL PAGES ROUTES
      {
        path: "moderator/manage-applications",
        Component: ManageApplications
      },{
        path: "moderator/all-reviews",
        Component: AllReviews
      },
      //todo USER ALL PAGES ROUTES
      {
        path: "my-applications",
        Component: MyApplications
      },
      {
        path: "my-reviews",
        Component: MyReviews
      },
      //todo PAYMENT ROUTES
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled
      },
      //* ERROR PAGE ROUTE
      {
        path: "*",
        Component: ErrorPage404
      }
    ]
  }
])