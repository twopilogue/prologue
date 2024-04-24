import { useEffect, useState } from "react";
import DashboardCalendar from "features/dashboard/DashboardCalendar/DashboardCalendar";
import DashboardInfo from "features/dashboard/DashboardInfo";
import DashboardList from "features/dashboard/DashboardList";
import DashboardMenu from "features/dashboard/DashboardMenu";
import DashboardPreview from "features/dashboard/DashboardPreview";
import { Box, Grid, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "slices/authSlice";

import { setAuthFile, useAuthStore } from "stores/authStore";
import { getBuildState } from "apis/api/dashboard";
import { authApi } from "apis/Api";
import { getRepoList } from "apis/api/blog";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);

  const [buildState, setBuildState] = useState<boolean>();

  const getBildState = async () => {
    const buildState = await getBuildState(accessToken, githubId);
    setBuildState(buildState === "progress");
  };

  // 서비스 인증 파일 존재 여부
  const getAuthFile = async () => {
    const res = await authApi.getAuthFile(accessToken, githubId);
    if (res.data.checkAuthFile) {
      dispatch(authActions.authFile({ authFile: true }));
      setAuthFile(true);
    } else {
      dispatch(authActions.authFile({ authFile: false }));
      setAuthFile(false);

      const checkRepository = await getRepoList(accessToken, githubId);
      if (checkRepository) navigate("create/reset");
      else navigate("/create");
    }
  };

  useEffect(() => {
    if (login) getAuthFile();
    getBildState();
  }, []);

  return (
    <Box sx={{ mt: 3, minHeight: "88vh" }}>
      <Grid container spacing={2} columns={11}>
        <Grid item xs={3}>
          <DashboardCalendar />
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2} height="88vh">
            <DashboardPreview buildState={buildState} />
            <DashboardList />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2} height="88vh">
            <DashboardInfo buildState={buildState} setBuildState={setBuildState} />
            <DashboardMenu />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
