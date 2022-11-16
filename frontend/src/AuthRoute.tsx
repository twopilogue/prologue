import React from "react";
import { rootState } from "app/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function AuthRoute({ component }: { component: JSX.Element }) {
  const { login } = useSelector((state: rootState) => state.auth);
  const location = useLocation();

  if (!login) {
    return <Navigate to="/" state={{ from: location, alertOn: true }} replace />;
  }
  return component;
}

export default AuthRoute;
