import * as React from "react";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h1>랜딩페이지</h1>
      <br />
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <NavLink to="/create">블로그 생성</NavLink>
        <NavLink to="/dashboard">대시보드</NavLink>
      </Stack>
    </>
  );
};

export default LandingPage;
