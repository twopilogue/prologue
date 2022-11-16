import React from "react";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";

function AuthRoute({ authenticated, component: Component }: any) {
  return authenticated ? Component : <Navigate to="/" {...alert("로그인 후 이용해 주세요.")} />;
}

export default AuthRoute;
