import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isUserAuthenticated = () => {
    return !!sessionStorage.getItem("@nutriplan-token");
  };

  if (!isUserAuthenticated()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
