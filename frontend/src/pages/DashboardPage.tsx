import React, { useEffect } from "react";
import DashboardCalendar from "features/dashboard/DashboardCalendar/DashboardCalendar";
import DashboardInfo from "features/dashboard/DashboardInfo";
import DashboardList from "features/dashboard/DashboardList";
import DashboardMenu from "features/dashboard/DashboardMenu";
import DashboardPreview from "features/dashboard/DashboardPreview";
import { Box, Grid, Stack } from "@mui/material";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "slices/authSlice";
import { rootState } from "app/store";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login, accessToken, githubId } = useSelector((state: rootState) => state.auth);

  useEffect(() => {
    {
      login && getAuthFile();
    }
  }, []);

  // 서비스 인증 파일 존재 여부
  async function getAuthFile() {
    await Axios.get(api.auth.getAuthFile(accessToken, githubId)).then((res) => {
      if (res.data.checkAuthFile) {
        dispatch(authActions.authFile({ authFile: true }));
      } else {
        dispatch(authActions.authFile({ authFile: false }));
        navigate("/create/reset");
      }
    });
  }

  return (
    <Box sx={{ mt: 3, minHeight: "88vh" }}>
      <Grid container spacing={2} columns={11}>
        <Grid item xs={3}>
          <DashboardCalendar />
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2} height="88vh">
            <DashboardPreview />
            <DashboardList />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2} height="88vh">
            <DashboardInfo />
            <DashboardMenu />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
