import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingSpinner from "../Utilities/LoadingSpinner";
import Forbidden from "../Pages/ForbiddenPage/Forbidden";

const RoleRoute = ({ allowedRoles = [], children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { role, loading: roleLoading } = useUserRole(user?.email);

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Forbidden />;
  }

  return children;
};

export default RoleRoute;
