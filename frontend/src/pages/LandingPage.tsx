import * as React from "react";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import LandingMain from "features/landing/LandingMain";
import LandingSub from "features/landing/LandingSub";

const LandingPage = () => {
  return (
    <>
      {/* <Stack justifyContent="center" alignItems="center" spacing={2}>
        <NavLink to="/dashboard">대시보드</NavLink>
      </Stack> */}
      <Stack justifyContent="center" alignItems="center">
        <LandingMain />
        <LandingSub />
      </Stack>
    </>
  );
};

export default LandingPage;
