// import { createBrowserRouter } from "react-router";
// import MainLayout from "../Layouts/MainLayout";
// import Home from "../Pages/Home/Home";
// import ErrorPage404 from "../Pages/Error Pages/ErrorPage404";
// import Register from "../Pages/AuthenicationPages/Register";
// import Login from "../Pages/AuthenicationPages/Login";
// import AllScholarship from "../Pages/Scholarships/AllScholarship";
// import ScholarshipDetail from "../Pages/Scholarships/ScholarshipDetail";
// import DashboardLayout from "../Layouts/DashboardLayout";
// import PaymentSuccess from "../Pages/Dashboard.jsx/PaymentSuccess";
// import PaymentCancelled from "../Pages/Dashboard.jsx/PaymentCancelled";
// import MyProfile from "../Pages/Dashboard.jsx/MyProfile/MyProfile";
// import MyApplications from "../Pages/Dashboard.jsx/UserPages/MyApplications";
// import MyReviews from "../Pages/Dashboard.jsx/UserPages/MyReviews";
// import ManageApplications from "../Pages/Dashboard.jsx/ModeratorPages/ManageApplications";
// import AllReviews from "../Pages/Dashboard.jsx/ModeratorPages/AllReviews";
// import ManageUsers from "../Pages/Dashboard.jsx/AdminPages/ManageUsers";
// import ManageScholarships from "../Pages/Dashboard.jsx/AdminPages/ManageScholarships";
// import AddScholarship from "../Pages/Dashboard.jsx/AdminPages/AddScholarship";
// import Analytics from "../Pages/Dashboard.jsx/AdminPages/Analytics";

// export const router = createBrowserRouter([
//   //* HOMEPAGE ROUTES
//   {
//     path: "/",
//     Component: MainLayout,
//     children: [
//       {
//         index: true,
//         Component: Home
//       },
//       //* SCHOLARSHIPS ROUTES
//       {
//         path: "/all-scholarships",
//         Component: AllScholarship
//       },
//       {
//         path: "/all-scholarships/:id",
//         Component: ScholarshipDetail
//       },
//       //* AUTHENTICATION ROUTES
//       {
//         path: "/register",
//         Component: Register
//       },
//       {
//         path: "login",
//         Component: Login
//       },
//       //* ERROR PAGE ROUTE
//       {
//         path: "*",
//         Component: ErrorPage404
//       }
//     ]
//   },

//   //* DASHBOARD ROUTES
//   {
//     path: "dashboard",
//     Component: DashboardLayout,
//     children: [
//       //todo ALL ROLE PROFILE ROUTE
//       {
//         path: "my-profile",
//         Component: MyProfile
//       },

//       //todo ADMIN ALL PAGES ROUTES
//       {
//         path: "admin/add-scholarship",
//         Component: AddScholarship
//       },
//       {
//         path: "admin/manage-scholarships",
//         Component: ManageScholarships
//       },
//       {
//         path: "admin/manage-users",
//         Component: ManageUsers
//       },
//       {
//         path: "admin/analytics",
//         Component: Analytics
//       },

//       //todo MODERATOR ALL PAGES ROUTES
//       {
//         path: "moderator/manage-applications",
//         Component: ManageApplications
//       },
//       {
//         path: "moderator/all-reviews",
//         Component: AllReviews
//       },

//       //todo USER ALL PAGES ROUTES
//       {
//         path: "my-applications",
//         Component: MyApplications
//       },
//       {
//         path: "my-reviews",
//         Component: MyReviews
//       },

//       //todo PAYMENT ROUTES
//       {
//         path: "payment-success",
//         Component: PaymentSuccess
//       },
//       {
//         path: "payment-cancelled",
//         Component: PaymentCancelled
//       },
//       //* ERROR PAGE ROUTE
//       {
//         path: "*",
//         Component: ErrorPage404
//       }
//     ]
//   }
// ])

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
import ManageUsers from "../Pages/Dashboard.jsx/AdminPages/ManageUsers";
import ManageScholarships from "../Pages/Dashboard.jsx/AdminPages/ManageScholarships";
import AddScholarship from "../Pages/Dashboard.jsx/AdminPages/AddScholarship";
import Analytics from "../Pages/Dashboard.jsx/AdminPages/Analytics";

import RoleRoute from "./RoleRoute";

export const router = createBrowserRouter([
  //* HOMEPAGE ROUTES
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/all-scholarships", Component: AllScholarship },
      { path: "/all-scholarships/:id", Component: ScholarshipDetail },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "*", Component: ErrorPage404 },
    ],
  },

  //* DASHBOARD ROUTES
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      //* ALL ROLE PROFILE ROUTE (any logged in user)
      {
        path: "my-profile",
        Component: () => (
          <RoleRoute allowedRoles={["Admin", "Moderator", "User", "Student"]}>
            <MyProfile />
          </RoleRoute>
        ),
      },

      //* ADMIN ROUTES
      {
        path: "admin/add-scholarship",
        Component: () => (
          <RoleRoute allowedRoles={["Admin"]}>
            <AddScholarship />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-scholarships",
        Component: () => (
          <RoleRoute allowedRoles={["Admin"]}>
            <ManageScholarships />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-users",
        Component: () => (
          <RoleRoute allowedRoles={["Admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "admin/analytics",
        Component: () => (
          <RoleRoute allowedRoles={["Admin"]}>
            <Analytics />
          </RoleRoute>
        ),
      },

      //* MODERATOR ROUTES
      {
        path: "moderator/manage-applications",
        Component: () => (
          <RoleRoute allowedRoles={["Moderator"]}>
            <ManageApplications />
          </RoleRoute>
        ),
      },
      {
        path: "moderator/all-reviews",
        Component: () => (
          <RoleRoute allowedRoles={["Moderator"]}>
            <AllReviews />
          </RoleRoute>
        ),
      },

      //* USER/STUDENT ROUTES
      {
        path: "my-applications",
        Component: () => (
          <RoleRoute allowedRoles={["User", "Student"]}>
            <MyApplications />
          </RoleRoute>
        ),
      },
      {
        path: "my-reviews",
        Component: () => (
          <RoleRoute allowedRoles={["User", "Student"]}>
            <MyReviews />
          </RoleRoute>
        ),
      },

      //* PAYMENT ROUTES (any logged in user)
      {
        path: "payment-success",
        Component: () => (
          <RoleRoute allowedRoles={["Admin", "Moderator", "User", "Student"]}>
            <PaymentSuccess />
          </RoleRoute>
        ),
      },
      {
        path: "payment-cancelled",
        Component: () => (
          <RoleRoute allowedRoles={["Admin", "Moderator", "User", "Student"]}>
            <PaymentCancelled />
          </RoleRoute>
        ),
      },

      // DASHBOARD ERROR PAGE
      { path: "*", Component: ErrorPage404 },
    ],
  },
]);
