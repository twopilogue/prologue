import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import LandingMain from "features/landing/LandingMain";
import LandingSub from "features/landing/LandingSub";

const LandingPage = () => {
  const navigate = useNavigate();

  const { auth } = useSelector((state: rootState) => state.auth);

  useEffect(() => {
    if (auth) navigate("/dashboard");
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center">
      <LandingMain />
      <LandingSub />
    </Stack>
  );
};

export default LandingPage;
